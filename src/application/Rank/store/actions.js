import {CHANGE_RANK_LIST, CHANGE_LOADING, GET_RANK_LIST } from './constants'

export const changeRankList = (payload) => ({
  type: CHANGE_RANK_LIST,
  payload
})

export const getRankList = () => ({
  type: GET_RANK_LIST
  // return dispatch => {
  //   getRankListRequest().then(data => {
  //     let list = data && data.list;
  //     dispatch(changeRankList(list));
  //     dispatch(changeLoading(false));
  //   })
  // }
})

export const changeLoading = (payload) => ({
  type: CHANGE_LOADING,
  payload
})
