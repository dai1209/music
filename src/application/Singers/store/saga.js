import {put,call, select, takeEvery} from 'redux-saga/effects'

import {getHotSingerListRequest,getSingerListRequest} from '../../../apis'
import {changeSingerList,changeEnterLoading,changePullDownLoading,changeListOffset,changePullUpLoading} from './actions'
import {GET_HOT_SINGER_LIST,REFRESH_MORE_HOT_SINGER_LIST,GET_SINGER_LIST,REFRESH_MORE_SINGER_LIST} from './constants'

function* fetchHotSingerList(){
  try{
    const {artists} = yield call(getHotSingerListRequest,0)
    yield put(changeSingerList(artists));
    yield put(changeEnterLoading(false));
    yield put(changePullDownLoading(false));
    yield put(changeListOffset(artists.length));
  }catch(e){
    console.log('热门歌手数据获取失败');
  }
  
}


function* fetchMoreHotSingerList(){
  try{
    const listOffset = yield select(({singers})=>singers.listOffset)
    const singerList = yield select(({singers})=>singers.singerList)
    const {artists} = yield put(getHotSingerListRequest(listOffset))
    const data = [...singerList,...artists]
    yield put(changeSingerList(data));
    yield put(changePullUpLoading(false));
    yield put(changeListOffset(data.length));
  }catch(e){
    console.log('热门歌手数据获取失败');
  }
}

function* fetchSingerList(){
  try{
    const listOffset = yield select(({singers})=>singers.listOffset)
    const category = yield select(({singers})=>singers.category)
    const alpha = yield select(({singers})=>singers.alpha)
    const {artists} = yield call(getSingerListRequest,category, alpha, listOffset)
    yield put(changeSingerList(artists));
    yield put(changeEnterLoading(false));
    yield put(changePullDownLoading(false));
    yield put(changeListOffset(artists.length));
  }catch(e){
    console.log('歌手数据获取失败');
  }
  
}

function* fetchMoreSingerList(){
  try{
    const listOffset = yield select(({singers})=>singers.listOffset)
    const category = yield select(({singers})=>singers.category)
    const alpha = yield select(({singers})=>singers.alpha)
    const singerList = yield select(({singers})=>singers.singerList)
    const {artists} = yield call(getSingerListRequest,category, alpha, listOffset)
    const data = [...singerList,...artists]
    yield put(changeSingerList(data));
    yield put(changeEnterLoading(false));
    yield put(changePullDownLoading(false));
    yield put(changeListOffset(data.length));
  }catch(e){
    console.log('歌手数据获取失败');
  }
}





function *saga(){
  yield takeEvery(GET_HOT_SINGER_LIST,fetchHotSingerList)
  yield takeEvery(REFRESH_MORE_HOT_SINGER_LIST,fetchMoreHotSingerList)
  yield takeEvery(GET_SINGER_LIST,fetchSingerList)
  yield takeEvery(REFRESH_MORE_SINGER_LIST,fetchMoreSingerList)
}


export default saga