import React from "react";
import {useHistory,NavLink} from 'react-router-dom'
import { Top, Tab, TabItem } from "./HomeLayout.style";
import Player from "../application/Player";

function Home({children}) {
  
  const history = useHistory()
  return (
    <div>
      <Top>
        <span
          className="iconfont menu"
          onClick={() => alert("用户中心正在开发中，敬请期待:)")}
        >
          &#xe65c;
        </span>
        <span className="title">云音乐</span>
        <span
          className="iconfont search"
          onClick={() => history.push("/search")}
        >
          &#xe62b;
        </span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {children}
      <Player></Player>
    </div>
  );
}

export default React.memo(Home);
