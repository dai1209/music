import {put,call,takeEvery} from 'redux-saga/effects'

import {getAlbumDetailRequest} from '../../../apis'

import {changeCurrentAlbum,changeEnterLoading,changeStartIndex,changeTotalCount} from './actions'


import {GET_ALBUM_LIST} from './constants'

function *fetchAlbumList({payload}){
  try{
    const res = yield call(getAlbumDetailRequest,payload)
  const data = res.playlist
  yield put(changeCurrentAlbum(data))
  yield put(changeEnterLoading(false))
  yield put(changeStartIndex(0))
  yield put(changeTotalCount(data.tracks.length))
  }catch(e){
    console.log(e);
    
  }
  
}


function *saga(){
  yield takeEvery(GET_ALBUM_LIST,fetchAlbumList)
}


export default saga