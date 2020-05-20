import * as actionTypes from './constants';


export const changeBannerList = payload => ({
  type: actionTypes.CHANGE_BANNER,
  payload
});

export const changeRecommendList = payload => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  payload
});

export const changeEnterLoading = payload => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload
});

export const getBannerList = () => ({
  type: actionTypes.GET_BANNER_LIST,
})

export const getRecommendList = () => ({
  type: actionTypes.GET_RECOMMEND_LIST
})
