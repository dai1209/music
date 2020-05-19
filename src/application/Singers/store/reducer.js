import produce from 'immer';
import * as actionTypes from './constants';


const initialState = {
  category: "",
  alpha: "",
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  listOffset: 0, // 请求列表的偏移不是page，是个数
}

export default produce((state = initialState, {type,payload}) => {
  switch(type) {
    case actionTypes.CHANGE_ALPHA:
      state.alpha = payload
      break
    case actionTypes.CHANGE_CATOGORY:
      state.category = payload
      break
    case actionTypes.CHANGE_SINGER_LIST:
      state.singerList = payload
      break
    case actionTypes.CHANGE_LIST_OFFSET:
      state.listOffset = payload
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = payload
      break
    case actionTypes.CHANGE_PULLUP_LOADING:
      state.pullUpLoading = payload
      break
    case actionTypes.CHANGE_PULLDOWN_LOADING:
      state.pullDownLoading = payload
      break
    default:
      return state
  }
})