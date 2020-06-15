import {put, call, takeLatest} from 'redux-saga/effects'
import { getRankListRequest } from '../../../apis';
import {GET_RANK_LIST} from './constants'
import {changeRankList, changeLoading} from './actions'


function* fetchRankList(){
  try{
    yield put(changeLoading(true))
    const {list} = yield call(getRankListRequest)
    yield put(changeRankList(list))
    yield put(changeLoading(false))
  }catch(e){
    console.log('获取数据失败')
  } 
}


export default function *saga(){
  yield takeLatest(GET_RANK_LIST,fetchRankList)
}