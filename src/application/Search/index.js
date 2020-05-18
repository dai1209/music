import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LazyLoad, {forceCheck} from 'react-lazyload';
import { CSSTransition } from 'react-transition-group';

import SearchBox from './../../baseUI/search-box/index';
import Scroll from './../../baseUI/scroll/index';
import { Container, ShortcutWrapper, HotKey } from './style';
import { getHotKeyWords, changeEnterLoading, getSuggestList,getSongDetail } from './store/actions';
import { List, ListItem, EnterLoading } from './../Singers/style';
import Loading from './../../baseUI/loading/index';
import MusicalNote from '../../baseUI/music-note';
import { SongItem } from '../Album/style';
import { getName } from '../../utils';


const Search = (props) => {
  const [query, setQuery] = useState('');
  const [show, setShow] = useState(false);
  const musicNoteRef = useRef();

  const hotList = useSelector(({search})=>search.hotList)
  const enterLoading = useSelector(({search})=>search.enterLoading)
  const suggestList = useSelector(({search})=>search.suggestList)
  const songsCount = useSelector(({player})=>player.playList).length
  const songsList = useSelector(({search})=>search.songsList)
  const dispatch = useDispatch()

  useEffect(() => {
    setShow(true);
    hotList.length || dispatch(getHotKeyWords())
      // eslint-disable-next-line
  }, [setShow,hotList,dispatch]);

  const renderHotKey = () => {
    let list = hotList ? hotList.toJS(): [];
    return (
      <ul>
        {
          list.map(item => {
            return (
              <li className="item" key={item.first} onClick={() => setQuery(item.first)}>
                <span>{item.first}</span>
              </li>
            )
          })
        }
      </ul>
    )
  };
  
  // const renderHistoryList = () => {
  //   return (
  //     <ul>
  //       {
  //         [1,2,3,4,5,6,7,8,9,5,5,5,5,5].map(item => {
  //           return (
  //             <li  className="history_item">
  //               <span className="text">离圣诞节分厘卡士大夫将来肯定</span>
  //               <span className="icon">
  //                 <i className="iconfont icon_delete">&#xe600;</i>
  //               </span>
  //             </li>
  //           )
  //         })
  //       }
  //     </ul>
  //   )
  // }
  const handleQuery = (q) => {
    setQuery(q);
    if(!q) return;
    dispatch(changeEnterLoading(true))
    dispatch(getSuggestList(q))
  }

  const renderSingers = () => {
    let singers = suggestList.artists;
    if(!singers || !singers.length) return;
    return (
      <List>
        <h1 className="title">相关歌手</h1>
        {
          singers.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => props.history.push(`/singers/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="singer"/>}>
                    <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">歌手: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const renderAlbum = () => {
    let albums = suggestList.playlists;
    if(!albums || !albums.length) return;
    return (
      <List>
        <h1 className="title">相关歌单</h1>
        {
          albums.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index} onClick={() => props.history.push(`/album/${item.id}`)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                    <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">歌单: {item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };

  const selectItem = (e, id) => {
    dispatch(getSongDetail(id))
    musicNoteRef.current.startAnimation({x:e.nativeEvent.clientX, y:e.nativeEvent.clientY});
  }
  
  const searchBack = useCallback(() => {
    setShow(false);
  }, []);

  const renderSongs = () => {
    return (
      <SongItem style={{paddingLeft: "20px"}}> 
        {
          songsList.map(item => {
            return (
              <li key={item.id} onClick={(e) => selectItem(e, item.id)}>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    { getName(item.artists) } - { item.album.name }
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
    )
  };

  return (
    <CSSTransition 
      in={show} 
      timeout={300} 
      appear={true} 
      classNames="fly"  
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container play={songsCount}>
        <div className="search_box_wrapper">
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
        </div>
        <ShortcutWrapper show={!query}>
          <Scroll>
            <div>
              <HotKey>
                <h1 className="title">热门搜索</h1>
                {renderHotKey()}
              </HotKey>
              {/* <SearchHistory>
                <h1 className="title">
                  <span className="text">搜索历史</span>
                  <span className="clear">
                    <i className="iconfont">&#xe63d;</i>
                  </span>
                </h1>
                {renderHistoryList()}
              </SearchHistory> */}
            </div>
          </Scroll>
        </ShortcutWrapper>
        {/* 下面为搜索结果 */}
        <ShortcutWrapper show={query}>
          <Scroll onScorll={forceCheck}>
            <div>
              { renderSingers() }
              { renderAlbum() }
              { renderSongs() }
            </div>
          </Scroll>
        </ShortcutWrapper>
        {enterLoading? <EnterLoading><Loading></Loading></EnterLoading> : null}
        <MusicalNote ref={musicNoteRef}></MusicalNote>
      </Container>
    </CSSTransition>
  )
}
export default React.memo(Search)
