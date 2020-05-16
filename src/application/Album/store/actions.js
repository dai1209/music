import { 
  CHANGE_CURRENT_ALBUM, 
  CHANGE_TOTAL_COUNT, 
  CHANGE_PULLUP_LOADING, 
  CHANGE_START_INDEX, 
  CHANGE_ENTER_LOADING,
  GET_ALBUM_LIST 
} from './constants';


export const changeCurrentAlbum = (data) => ({
  type: CHANGE_CURRENT_ALBUM,
  payload: data
});

export const changePullUpLoading = (data) => ({
  type: CHANGE_PULLUP_LOADING,
  payload: data
});
export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  payload: data
});

export const changeTotalCount = (data) => ({
  type: CHANGE_TOTAL_COUNT,
  payload: data
});

export const changeStartIndex = (data) => ({
  type: CHANGE_START_INDEX,
  payload: data
});

export const getAlbumList = (id) => ({
  type: GET_ALBUM_LIST,
  payload:id
});
