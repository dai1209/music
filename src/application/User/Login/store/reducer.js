import * as actionTypes from "./constants";
import produce from "immer";

const initialState = {
  userInfo: {},
  sentStatus: false,
  loginStatus: false
}

export default produce((state = initialState, {type,payload}) => {
  switch (type) {
    case actionTypes.CHANGE_USER_INFO:
      state.userInfo = payload
      break
    case actionTypes.CHANGE_SENT_STATUS:
      state.sentStatus = payload
      break
    case actionTypes.CHANGE_LOGIN_STATUS:
      state.loginStatus = payload
      break
    default:
      return state;
  }
})
