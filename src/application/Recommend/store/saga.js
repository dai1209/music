import {put,call,takeEvery} from 'redux-saga/effects'

import { GET_BANNER_LIST, GET_RECOMMEND_LIST}from './constants'

import {changeBannerList,changeRecommendList,changeEnterLoading} from './action'

import {getBannerRequest,getRecommendListRequest} from '../../../apis'


function* fetchBannerList(){
  try{
    const {banners} = yield call(getBannerRequest)
    yield put(changeBannerList(banners))
  }catch(e){
    console.log(e)
  }
  
}
function* fetchRecommendList(){
  try{
    const {result} = yield call(getRecommendListRequest)

    yield put(changeRecommendList(result))
    yield put(changeEnterLoading(false))
  }catch(e){
    console.log(e)
  }
  
}

export default function* saga(){
  yield takeEvery(GET_BANNER_LIST,fetchBannerList)
  yield takeEvery(GET_RECOMMEND_LIST,fetchRecommendList)
}