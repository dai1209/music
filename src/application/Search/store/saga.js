import {
  all,
  put,
  call,
  takeEvery
} from 'redux-saga/effects'

import {
  GET_HOT_KEYWORDS,
  GET_SUGGEST_LIST
} from './constants'
import {
  changeHotKeyWords,
  changeSuggestList,
  changeResultSongs,
  changeEnterLoading,
} from './actions'

import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest
} from './../../../apis';


function* fetchHotKeyWords(){
  try{
    const {result} =yield call(getHotKeyWordsRequest)
    yield put(changeHotKeyWords(result.hots))
  }catch(e){
    console.log(e)
  }
}

function* fetchSuggestList({payload}){
  try{
    yield put(changeEnterLoading(true))
    const [{result:res},{result:data}] = yield all([
      call(getSuggestListRequest,payload),
      call(getResultSongsListRequest,payload)
    ])
    yield all([
      put(changeSuggestList(res)),
      put(changeResultSongs(data.songs)),
    ])
  }catch(e){
    console.log(e)
  }finally{
    yield put(changeEnterLoading(false))
  }
}


export default function* saga(){
  yield takeEvery(GET_HOT_KEYWORDS,fetchHotKeyWords)
  yield takeEvery(GET_SUGGEST_LIST,fetchSuggestList)
}