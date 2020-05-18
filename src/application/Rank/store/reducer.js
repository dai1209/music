import produce from 'immer';
import {CHANGE_RANK_LIST, CHANGE_LOADING } from './constants'

const initialState = {
  rankList: [],
  loading: true
}

export default produce((state = initialState, {type,payload}) => {
  switch(type) {
    case CHANGE_RANK_LIST:
      state.rankList = payload
      break
    case CHANGE_LOADING:
      state.loading = payload
      break
    default:
      return
  }
})