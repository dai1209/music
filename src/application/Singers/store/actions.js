import {
  CHANGE_SINGER_LIST,
  CHANGE_CATOGORY,
  CHANGE_ALPHA,
  CHANGE_LIST_OFFSET,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING,
  GET_SINGER_LIST,
  GET_HOT_SINGER_LIST,
  REFRESH_MORE_SINGER_LIST,
  REFRESH_MORE_HOT_SINGER_LIST,
} from './constants';

export const changeCategory = (payload) => ({
  type: CHANGE_CATOGORY,
  payload
});

export const changeAlpha = (payload) => ({
  type: CHANGE_ALPHA,
  payload
});

export const changeSingerList = (payload) => ({
  type: CHANGE_SINGER_LIST,
  payload
});

export const changeListOffset = (payload) => ({
  type: CHANGE_LIST_OFFSET,
  payload
});

//进场loading
export const changeEnterLoading = (payload) => ({
  type: CHANGE_ENTER_LOADING,
  payload
});

//滑动最底部loading
export const changePullUpLoading = (payload) => ({
  type: CHANGE_PULLUP_LOADING,
  payload
});

//顶部下拉刷新loading
export const changePullDownLoading = (payload) => ({
  type: CHANGE_PULLDOWN_LOADING,
  payload
});

export const getSingerList = ()=>({
  type:GET_SINGER_LIST
})
export const getHotSingerList = ()=>({
  type:GET_HOT_SINGER_LIST
})

export const refreshMoreSingerList = ()=>({
  type:REFRESH_MORE_SINGER_LIST
})
export const refreshMoreHotSingerList = ()=>({
  type:REFRESH_MORE_HOT_SINGER_LIST
})
