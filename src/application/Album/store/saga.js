import {all, put,call,takeLatest} from 'redux-saga/effects'

import {getAlbumDetailRequest} from '../../../apis'

import {changeCurrentAlbum,changeEnterLoading,changeStartIndex,changeTotalCount} from './actions'


import {GET_ALBUM_LIST} from './constants'

function *fetchAlbumList({payload}){
  try{
    yield put(changeEnterLoading(true))
    const res = yield call(getAlbumDetailRequest,payload)
    const data = res.playlist
    yield all([
      put(changeCurrentAlbum(data)),
      put(changeStartIndex(0)),
      put(changeTotalCount(data.tracks.length)),
    ]) 
  }catch(e){
    console.log(e);
    
  }finally{
    yield put(changeEnterLoading(false))
  }
  
}


function *saga(){
  yield takeLatest(GET_ALBUM_LIST,fetchAlbumList)
}


export default saga