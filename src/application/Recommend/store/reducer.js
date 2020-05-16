import * as actionTypes from './constants';

import produce from 'immer'


const initialState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true
}

export default produce((state = initialState, {type,payload}) => {
  switch(type) {
    case actionTypes.CHANGE_BANNER:
      state.bannerList = payload;
      break
    case actionTypes.CHANGE_RECOMMEND_LIST:
      state.recommendList = payload
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = payload
      break
    default:
      return state;
  }
})