import * as actionTypes from './constants';


export const changeBannerList = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  payload: data
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  payload: data
});

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload: data
});

export const getBannerList = () => ({
  type: actionTypes.GET_BANNER_LIST,
})



// {
//   // return (dispatch) => {
//   //   getBannerRequest().then(data => {
//   //     const action = changeBannerList(data.banners);
//   //     dispatch(action);
//   //   }).catch(() => {
//   //     console.log("轮播图数据传输错误");
//   //   }) 
//   // }
// };

export const getRecommendList = () => ({
  type: actionTypes.GET_RECOMMEND_LIST
})
//  {
//   return (dispatch) => {
//     getRecommendListRequest().then(data => {
//       dispatch(changeRecommendList(data.result));
//       dispatch(changeEnterLoading(false));
//     }).catch(() => {
//       console.log("推荐歌单数据传输错误");
//     });
//   }
// };