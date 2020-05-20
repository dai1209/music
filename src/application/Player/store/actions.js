import { 
  SET_CURRENT_SONG, 
  SET_FULL_SCREEN, 
  SET_PLAYING_STATE, 
  SET_SEQUECE_PLAYLIST, 
  SET_PLAYLIST, 
  SET_PLAY_MODE, 
  SET_CURRENT_INDEX, 
  SET_SHOW_PLAYLIST, 
  DELETE_SONG, 
  INSERT_SONG, 
  CHANGE_SPEED,
  GET_SONG_DETAIL 
} from './constants';


export const changeCurrentSong = payload => ({
  type: SET_CURRENT_SONG,
  payload
});

export const changeFullScreen =  payload => ({
  type: SET_FULL_SCREEN,
  payload
});

export const changePlayingState = payload => ({
  type: SET_PLAYING_STATE,
  payload
});

export const changeSequecePlayList = payload => ({
  type: SET_SEQUECE_PLAYLIST,
  payload
});

export const changePlayList  = payload => ({
  type: SET_PLAYLIST,
  payload
});

export const changePlayMode = payload => ({
  type: SET_PLAY_MODE,
  payload
});

export const changeSpeed = payload => ({
  type: CHANGE_SPEED,
  payload
});

export const changeCurrentIndex = payload => ({
  type: SET_CURRENT_INDEX,
  payload
});

export const changeShowPlayList = payload => ({
  type: SET_SHOW_PLAYLIST,
  payload
});

export const insertSong = payload => ({
  type: INSERT_SONG,
  payload
});

export const deleteSong = payload => ({
  type: DELETE_SONG,
  payload
});


export const getSongDetail = payload => ({
  type: GET_SONG_DETAIL,
  payload
})
