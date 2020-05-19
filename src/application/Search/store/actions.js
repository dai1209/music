
import { 
  SET_HOT_KEYWRODS, 
  SET_SUGGEST_LIST, 
  SET_RESULT_SONGS_LIST, 
  SET_ENTER_LOADING,
  GET_HOT_KEYWORDS,
  GET_SUGGEST_LIST
} from './constants';


export const changeHotKeyWords = (payload) => ({
  type: SET_HOT_KEYWRODS,
  payload
});

export const changeSuggestList = (payload) => ({
  type: SET_SUGGEST_LIST,
  payload
});

export const changeResultSongs = (payload) => ({
  type: SET_RESULT_SONGS_LIST,
  payload
});

export const changeEnterLoading = (payload) => ({
  type: SET_ENTER_LOADING,
  payload
});

export const getHotKeyWords = () => ({
  type: GET_HOT_KEYWORDS
})

export const getSuggestList = (payload) => ({
  type: GET_SUGGEST_LIST,
  payload
})

