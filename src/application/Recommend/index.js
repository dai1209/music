import React, { useEffect } from 'react';
import {forceCheck} from 'react-lazyload'
import { useSelector, useDispatch } from "react-redux";
import Slider from '../../components/slider/';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import { renderRoutes } from '../../utils';
import { EnterLoading } from './../Singers/style';
import Loading from '../../baseUI/loading-v2/index';
import {getBannerList,getRecommendList} from './store/action'


function Recommend({route}){
  const bannerList = useSelector(({recommend})=>recommend.bannerList)
  const recommendList = useSelector(({recommend})=>recommend.recommendList)
  const songsCount = useSelector(({player})=>player.playList)
  const enterLoading = useSelector(({recommend})=>recommend.enterLoading)
  const dispatch = useDispatch()
  // const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if(!bannerList.length){
      dispatch(getBannerList());
    }
    if(!recommendList.length){
      dispatch(getRecommendList());
    }
    // eslint-disable-next-line
  }, []);


  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {enterLoading? <EnterLoading><Loading></Loading></EnterLoading> : null}
      { renderRoutes(route) }
    </Content> 
  );
}

export default React.memo(Recommend)
