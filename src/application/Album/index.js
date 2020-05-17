import React, { memo, useState, useEffect,useRef,useCallback } from "react";
import {useParams} from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./style";
import { EnterLoading } from './../Singers/style';
import Loading from './../../baseUI/loading/index';
import  Header  from './../../baseUI/header/index';
import AlbumDetail from '../../components/album-detail/index';
import { HEADER_HEIGHT } from './../../apis/config';
import MusicNote from '../../baseUI/music-note/index';
import { isEmptyObject } from '../../utils';
import Scroll from '../../baseUI/scroll/index';
import style from "../../assets/global-style";
import {changeEnterLoading,getAlbumList,changePullUpLoading} from './store/actions'


export default memo((props)=>{
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false);
  const musicNoteRef = useRef();
  const headerEl = useRef();
  const dispatch = useDispatch()
  const {id} = useParams()
  const currentAlbum = useSelector(({album})=>album.currentAlbum)
  const pullUpLoading = useSelector(({album})=>album.pullUpLoading)
  const enterLoading = useSelector(({album})=>album.enterLoading)
  const playList = useSelector(({player})=>player.playList)

  const songsCount = playList.length
 
  useEffect(()=>{
    dispatch(changeEnterLoading(true))
    dispatch(getAlbumList(id))
  },[dispatch,id])

  const handleScroll = useCallback((pos) => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y/minScrollY);
    let headerDom = headerEl.current;
    if(pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent-1)/2);
      setTitle(currentAlbum&&currentAlbum.name);
      setIsMarquee(true);
    } else{
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  }, [currentAlbum]);

  const handlePullUp = () => {
    dispatch(changePullUpLoading(true))
    dispatch(changePullUpLoading(false))
  };
  
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const musicAnimation = (x , y) => {
    musicNoteRef.current.startAnimation({x, y});
  }
  
  return (
    <CSSTransition 
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container play={songsCount}>
        <Header ref={headerEl} title={title} handleClick={handleBack} isMarquee={isMarquee}></Header>
        {
          !isEmptyObject(currentAlbum) ? (
            <Scroll 
              onScroll={handleScroll} 
              pullUp={handlePullUp} 
              pullUpLoading={pullUpLoading}
              bounceTop={false}
            >
              <AlbumDetail currentAlbum={currentAlbum} pullUpLoading={pullUpLoading} musicAnimation={musicAnimation}></AlbumDetail>
            </Scroll>
          ) : null
        }
        { enterLoading ?  <EnterLoading><Loading></Loading></EnterLoading> : null}
        <MusicNote ref={musicNoteRef}></MusicNote>
      </Container>
    </CSSTransition>
);
})