import { 
  CHANGE_CURRENT_ALBUM, 
  CHANGE_TOTAL_COUNT, 
  CHANGE_PULLUP_LOADING, 
  CHANGE_START_INDEX, 
  CHANGE_ENTER_LOADING,
  GET_ALBUM_LIST 
} from './constants';


export const changeCurrentAlbum = payload => ({
  type: CHANGE_CURRENT_ALBUM,
  payload
});

export const changePullUpLoading = payload => ({
  type: CHANGE_PULLUP_LOADING,
  payload
});
export const changeEnterLoading = payload => ({
  type: CHANGE_ENTER_LOADING,
  payload
});

export const changeTotalCount = payload => ({
  type: CHANGE_TOTAL_COUNT,
  payload
});

export const changeStartIndex = payload => ({
  type: CHANGE_START_INDEX,
  payload
});

export const getAlbumList = payload => ({
  type: GET_ALBUM_LIST,
  payload
});
