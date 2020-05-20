import {all, put,takeEvery,call} from 'redux-saga/effects'

import {
  loginByPhoneRequest,
  sentVcodeRequest,
  loginByVcodeRequest
} from "../../../../apis";
import {
  LOGIN_BY_PHONE,
  LOGIN_BY_VCODE,
  SENT_VCODE
} from "./constants";
import {saveUserInfo,saveLoginStatus,saveSentStatus} from './actions'




function* fetchLoginByPhone({payload}){
  try{
    const res = yield call(loginByPhoneRequest,payload)
    yield put(saveUserInfo(res))
  }catch(e){
    console.log(e)
  }
}


function* fetchLoginByVcode({payload}){
  try{
    const res = yield call(loginByVcodeRequest,payload)
    if (res.code === 200){
      yield all([
        put(saveUserInfo(res)),
        put(saveLoginStatus(true))
      ]) 
    }
    
  }catch(e){
    console.log(e)
  }
}

function* fetchSentVcode({payload}){
  try{
    const res = yield call(sentVcodeRequest,payload)
    if (res.code === 200){
      yield put(saveSentStatus(true))
    }
  }catch(e){
    console.log(e);
  }
}


export default function* saga(){
  yield takeEvery(LOGIN_BY_PHONE,fetchLoginByPhone)
  yield takeEvery(LOGIN_BY_VCODE,fetchLoginByVcode)
  yield takeEvery(SENT_VCODE,fetchSentVcode)
}