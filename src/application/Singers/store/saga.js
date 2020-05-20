import {all, put,call, select, takeEvery} from 'redux-saga/effects'

import {getHotSingerListRequest,getSingerListRequest} from '../../../apis'
import {changeSingerList,changeEnterLoading,changePullDownLoading,changeListOffset,changePullUpLoading} from './actions'
import {GET_HOT_SINGER_LIST,REFRESH_MORE_HOT_SINGER_LIST,GET_SINGER_LIST,REFRESH_MORE_SINGER_LIST} from './constants'

function* fetchHotSingerList(){
  try{
    yield all([
      put(changeEnterLoading(true)),
      put(changePullDownLoading(true))
    ])
    const {artists} = yield call(getHotSingerListRequest,0)
    yield all([
      put(changeSingerList(artists)),
      put(changeListOffset(artists.length)),
    ]) 
  }catch(e){
    console.log('热门歌手数据获取失败');
  }finally{
    yield all([
      put(changeEnterLoading(false)),
      put(changePullDownLoading(false)),
    ])
  }
  
}


function* fetchMoreHotSingerList(){
  try{
    yield put(changePullUpLoading(true))
    const listOffset = yield select(({singers})=>singers.listOffset)
    const singerList = yield select(({singers})=>singers.singerList)
    const {artists} = yield put(getHotSingerListRequest(listOffset))
    const data = [...singerList,...artists]
    yield all([
      put(changeSingerList(data)),
      put(changeListOffset(data.length)),
    ])
     
  }catch(e){
    console.log('热门歌手数据获取失败');
  }finally{
    yield put(changePullUpLoading(false))
  }
}

function* fetchSingerList(){
  try{
    yield all([
      put(changeEnterLoading(true)),
      put(changePullDownLoading(true)),
    ])
    const listOffset = yield select(({singers})=>singers.listOffset)
    const category = yield select(({singers})=>singers.category)
    const alpha = yield select(({singers})=>singers.alpha)
    const {artists} = yield call(getSingerListRequest,category, alpha, listOffset)
    yield all([
      put(changeSingerList(artists)),
      put(changeListOffset(artists.length)),
    ])
  }catch(e){
    console.log('歌手数据获取失败');
  }finally{
    yield all([
      put(changeEnterLoading(false)),
      put(changePullDownLoading(false)),
    ])
  }
  
}

function* fetchMoreSingerList(){
  try{
    yield all([
      put(changeEnterLoading(true)),
      put(changePullDownLoading(true)),
    ])
    const listOffset = yield select(({singers})=>singers.listOffset)
    const category = yield select(({singers})=>singers.category)
    const alpha = yield select(({singers})=>singers.alpha)
    const singerList = yield select(({singers})=>singers.singerList)
    const {artists} = yield call(getSingerListRequest,category, alpha, listOffset)
    const data = [...singerList,...artists]
    yield all([
      put(changeSingerList(data)),
      put(changeListOffset(data.length)),
    ])
  }catch(e){
    console.log('歌手数据获取失败');
  }finally{
    yield all([
      put(changeEnterLoading(false)),
      put(changePullDownLoading(false)),
    ])
  }
}





function *saga(){
  yield takeEvery(GET_HOT_SINGER_LIST,fetchHotSingerList)
  yield takeEvery(REFRESH_MORE_HOT_SINGER_LIST,fetchMoreHotSingerList)
  yield takeEvery(GET_SINGER_LIST,fetchSingerList)
  yield takeEvery(REFRESH_MORE_SINGER_LIST,fetchMoreSingerList)
}


export default saga