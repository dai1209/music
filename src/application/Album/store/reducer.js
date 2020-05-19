import * as actionTypes from './constants';

import produce from 'immer'

const initialState = {
  currentAlbum: {},
  pullUpLoading: false,
  enterLoading: false,
  startIndex: 0,
  totalCount: 0,
}


export default produce((state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case actionTypes.CHANGE_CURRENT_ALBUM:
      state.currentAlbum = payload
      break
    case actionTypes.CHANGE_PULLUP_LOADING:
      state.pullUpLoading = payload
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      state.enterLoading = payload
      break
    case actionTypes.CHANGE_START_INDEX:
      state.startIndex = payload
      state.pullUpLoading = false
      break
    default:
      return state
  }
})