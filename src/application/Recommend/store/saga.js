import {put,call,takeLatest} from 'redux-saga/effects'

import { GET_BANNER_LIST, GET_RECOMMEND_LIST}from './constants'

import {changeBannerList,changeRecommendList,changeEnterLoading} from './actions'

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
    yield put(changeEnterLoading(true))
    const {result} = yield call(getRecommendListRequest)
    yield put(changeRecommendList(result))
  }catch(e){
    console.log(e)
  }finally{
    yield put(changeEnterLoading(false))
  }
  
}

export default function* saga(){
  yield takeLatest(GET_BANNER_LIST,fetchBannerList)
  yield takeLatest(GET_RECOMMEND_LIST,fetchRecommendList)
}