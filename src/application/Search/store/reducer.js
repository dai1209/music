import produce from 'immer';
import * as actionTypes from './constants';


const initialState = {
  hotList: [],
  suggestList: [],
  songsList: [],
  enterLoading: false
}

export default produce((state = initialState, {type,payload}) => {
  switch(type) {
    case actionTypes.SET_HOT_KEYWRODS:
      state.hotList = payload
      break
    case actionTypes.SET_SUGGEST_LIST:
      state.suggestList = payload
      break
    case actionTypes.SET_RESULT_SONGS_LIST:
      state.songsList = payload
      break
    case actionTypes.SET_ENTER_LOADING:
      state.enterLoading = payload
      break
    default:
      return
  }
})