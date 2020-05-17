import React, { useEffect } from 'react';
import {forceCheck} from 'react-lazyload'
import { useSelector, useDispatch } from "react-redux";
import Slider from '../../components/slider/';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll/index';
import { Content } from './style';
import { EnterLoading } from './../Singers/style';
import Loading from '../../baseUI/loading-v2/index';
import {getBannerList,getRecommendList} from './store/action'


function Recommend({children}){
  const bannerList = useSelector(({recommend})=>recommend.bannerList)
  const recommendList = useSelector(({recommend})=>recommend.recommendList)
  const songsCount = useSelector(({player})=>player.playList)
  const enterLoading = useSelector(({recommend})=>recommend.enterLoading)
  const dispatch = useDispatch()


  useEffect(() => {
    bannerList.length || dispatch(getBannerList());
    recommendList.length || dispatch(getRecommendList());
    // eslint-disable-next-line
  }, [bannerList,recommendList,dispatch]);


  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
      {enterLoading? <EnterLoading><Loading></Loading></EnterLoading> : null}
      { children }
    </Content> 
  );
}

export default React.memo(Recommend)
