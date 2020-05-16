import {put,call,takeEvery} from 'redux-saga/effects'

import {GET_SONG_DETAIL} from './constants'
import {insertSong} from './actions'
import {getSongDetailRequest} from '../../../apis'

function *fetchSongDetail({payload}){
  try{
    const res = yield call(getSongDetailRequest,payload)
    const song = res.songs[0]
    yield put(insertSong(song))
  }catch(e){
    console.log(e);
    
  }
}

export default function* saga(){
  yield takeEvery(GET_SONG_DETAIL,fetchSongDetail)
}