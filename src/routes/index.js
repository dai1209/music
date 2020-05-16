import React,{lazy} from 'react'
import { HashRouter as Router } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import BlankLayout from "../layouts/BlankLayout";
import {renderRoutes} from '../utils'

const config = [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            redirect:'/recommend'
          },
          {
            path: "/recommend",
            component: lazy(() => import("../application/Recommend/")),
            routes: [
              {
                path: "/recommend/:id",
                component: lazy(() => import("../application/Album/"))
              }
            ]
          },
          {
            path: "/singers",
            component: lazy(() => import("../application/Singers/")),
            key: "singers",
            routes: [
              {
                path: "/singers/:id",
                component: lazy(() => import("../application/Singers/"))
              }
            ]
          },
          {
            path: "/rank/",
            // component: lazy(() => import("../application/Rank/")),
            key: "rank",
            routes: [
              {
                path: "/rank/:id",
                component: lazy(() => import("../application/Album/"))
              }
            ]
          },
          {
            path: "/album/:id",
            exact: true,
            key: "album",
            component: lazy(() => import("../application/Album/"))
          },
          {
            path: "/search",
            exact: true,
            key: "search",
            // component: lazy(() => import("./../application/Search/"))
          }
        ]
      }
    ]
  }
];


const AppRouter = ()=><Router>{renderRoutes(config)}</Router>
export default AppRouter