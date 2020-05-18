import React, { memo,useEffect, useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getRankList } from './store/index'
import Loading from '../../baseUI/loading';
import {
  List, 
  ListItem,
  SongList,
  Container
} from './style';
import Scroll from '../../baseUI/scroll/index';
import { EnterLoading } from './../Singers/style';
import { filterIndex } from '../../api/utils';

const RenderSongList = memo(({list}) => {
  return list.length ? (
    <SongList>
      {
        list.map((item, index) => {
          return <li key={index}>{index+1}. {item.first} - {item.second}</li>
        })
      }
    </SongList>
  ) : null;
})

const RankList = memo(({list, global, enterDetail}) => {
  return (
    <List globalRank={global}>
     {
      list.map((item, index) => {
        return (
          <ListItem key={`${item.coverImgId}${index}`} tracks={item.tracks} onClick={() => enterDetail(item)}>
            <div className="img_wrapper">
              <img src={item.coverImgUrl} alt=""/>
              <div className="decorate"></div>
              <span className="update_frequecy">{item.updateFrequency}</span>
            </div>
            <RenderSongList list = {item.tracks}  />
          </ListItem>
        )
     })
    } 
    </List>
  )
})

function Rank({history,children}) {
  const rankList = useSelector(({rank})=>rank.rankList)
  const loading = useSelector(({rank})=>rank.loading)
  const songsCount = useSelector(({player})=>player.songsCount)
  const dispatch = useDispatch()


  useEffect(() => {
    if(!rankList.length){
      dispatch(getRankList());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const enterDetail = useCallback((detail) => {
    history.push(`/rank/${detail.id}`)
  },[history])

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);
  const displayStyle = loading ? {"display":"none"}:  {"display": ""};
  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          <RankList list = {officialList} enterDetail={enterDetail} />
          <h1 className="global" style={displayStyle}>全球榜</h1>
          <RankList list = {globalList} global = {true} enterDetail={enterDetail} />
          { loading ? <EnterLoading><Loading></Loading></EnterLoading> : null }
        </div>
      </Scroll> 
      {children}
    </Container>
    );
}

export default memo(Rank)