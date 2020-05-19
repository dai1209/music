import {all,put,call,takeEvery} from 'redux-saga/effects'
import {GET_SINGER_INFO} from './constants'
import {changeEnterLoading,changeArtist,changeSongs} from './actions'
import { getSingerInfoRequest } from './../../../apis';


function* fetchSingerInfo({payload}){
  try{
    yield put(changeEnterLoading(true))
    const {artist,hotSongs} = yield call(getSingerInfoRequest,payload)
    yield all([
      put(changeArtist(artist)),
      put(changeSongs(hotSongs))
    ])
  }catch(e){
    console.log(e);
  }finally{
    yield put(changeEnterLoading(false))
  }
}


export default function* saga(){
  yield takeEvery(GET_SINGER_INFO,fetchSingerInfo)
}