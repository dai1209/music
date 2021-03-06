import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from "react-redux";
import { GlobalStyle } from "./style";
import { IconStyle } from "./assets/iconfont/iconfont";
import store from "./store/index";
import AppRouter from "./routes/index.js";
import * as serviceWorker from './serviceWorker'


import "./fix.css";


function App() {
  return (
    <Provider store={store}>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <AppRouter />
    </Provider>
  );
}



ReactDom.render(<App />,document.getElementById('root'))

if ('production' === process.env.NODE_ENV){
  serviceWorker.register()
}else{
  serviceWorker.unregister()
}