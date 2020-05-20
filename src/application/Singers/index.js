import React, { useRef, useEffect, useCallback } from 'react';
import Horizen from '../../baseUI/horizen-item/index';
import { categoryTypes, alphaTypes } from '../../utils';
import { 
  NavContainer,
  ListContainer,
  List,
  ListItem,
  EnterLoading
} from "./style";
import { useDispatch, useSelector } from 'react-redux';
import { getSingerList, changeCategory, changeAlpha, getHotSingerList, changeListOffset, refreshMoreSingerList, refreshMoreHotSingerList } from './store/actions';
import Scroll from "../../baseUI/scroll/index";
import  LazyLoad, {forceCheck} from 'react-lazyload';
import Loading from '../../baseUI/loading/index';

function Singers(props){
  const scrollRef = useRef(null)

 
  const alpha = useSelector(({singers})=>singers.alpha)
  const category = useSelector(({singers})=>singers.category)
  const singerList = useSelector(({singers})=>singers.singerList)
  const enterLoading = useSelector(({singers})=>singers.enterLoading)
  const pullUpLoading = useSelector(({singers})=>singers.pullUpLoading)
  const pullDownLoading = useSelector(({singers})=>singers.pullDownLoading)
  const pageCount = useSelector(({singers})=>singers.pageCount)
  const songsCount = useSelector(({player})=>player.playList).length

  const dispatch = useDispatch()

  const updateCategory = useCallback((newVal) => {
    dispatch(changeCategory(newVal));
    dispatch(changeListOffset(0));
    dispatch(getSingerList());
  },[dispatch])

  const updateAlpha = useCallback((newVal)=>{
    dispatch(changeAlpha(newVal));
    dispatch(changeListOffset(0));
    dispatch(getSingerList());
  },[dispatch])

  const pullUpRefresh = useCallback((hot, count) => {
    if(hot){
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList());
    }
  },[dispatch])

  const pullDownRefresh = useCallback((category, alpha) =>{
    dispatch(changeListOffset(0));
    if(category === '' && alpha === ''){
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList());
    }
  },[dispatch])

  useEffect(() => {
    if(!singerList.length && !category && !alpha) {
      dispatch(getHotSingerList())
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const enterDetail = (id)  => {
    props.history.push(`/singers/${id}`);
  };

  const handlePullUp = () => {
    pullUpRefresh(category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefresh(category, pageCount);
  };

  const handleUpdateCategory = (newVal) => {
    if(category === newVal) return;
    updateCategory(newVal);
    scrollRef.current.refresh();
  };

  const handleUpdateAlpha = (newVal) => {
    if(alpha === newVal) return;
    updateAlpha(newVal);
    scrollRef.current.refresh();
  };


  return (
    <div>
      {/* 对于better-scroll来讲，其作用的元素外面必须要有一个尺寸确定的容器包裹，因此设置xxxContainer */}
      <NavContainer>
        <Horizen title={"分类(默认热门):"} list={ categoryTypes } handleClick={(v) => handleUpdateCategory(v)} oldVal={category}></Horizen>
        <Horizen title={"首字母:"} list={ alphaTypes } handleClick={(v) => handleUpdateAlpha(v)} oldVal={alpha}></Horizen>
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll 
          onScroll = {forceCheck} 
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          ref={ scrollRef }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
        >
          <List>
            {
              singerList.map((item, index) => {
                return (
                  <ListItem key={item.accountId+""+index} onClick={() => enterDetail(item.id)}>
                    <div className="img_wrapper">
                      <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                        <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                      </LazyLoad>
                    </div>
                    <span className="name">{item.name}</span>
                  </ListItem>
                )
              })
            }
          </List>
        </Scroll>
      </ListContainer>
      {/* 入场加载动画 */}
      { enterLoading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
      { props.children }
    </div>
  )
}


export default Singers