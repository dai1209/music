import  produce  from 'immer';
import * as actionTypes from './constants';

import { playMode } from './../../../utils';
import { findIndex } from '../../../utils';

const initialState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {},
  speed: 1
}

const handleInsertSong = (state, song) => {
  
  //看看有没有同款
  let fpIndex = findIndex(song, state.playList);
  // 如果是当前歌曲直接不处理
  if(fpIndex === state.currentIndex && state.currentIndex !== -1) return state;
  state.currentIndex++;
  // 把歌放进去,放到当前播放曲目的下一个位置
  state.playList.splice(state.currentIndex, 0, song);
  // 如果列表中已经存在要添加的歌
  if(fpIndex > -1) {
    if(state.currentIndex > fpIndex) {
      state.playList.splice(fpIndex, 1);
      state.currentIndex--;
    } else {
      state.playList.splice(fpIndex+1, 1);
    }
  }

  let sequenceIndex = findIndex(state.playList[state.currentIndex], state.sequencePlayList) + 1;
  let fsIndex = findIndex(song, state.sequencePlayList);
  state.sequenceList.splice(sequenceIndex, 0, song);
  if(fsIndex > -1) {
    if(sequenceIndex > fsIndex) {
      state.sequencePlayList.splice(fsIndex, 1);
      sequenceIndex--;
    } else {
      state.sequencePlayList.splice(fsIndex + 1, 1);
    }
  }
}


export default produce((state = initialState, {type,payload}) => {
  switch(type) {
    case actionTypes.SET_CURRENT_SONG:
      state.currentSong = payload
      break
    case actionTypes.SET_FULL_SCREEN:
      state.fullScreen = payload
      break
    case actionTypes.SET_PLAYING_STATE:
      state.playing = payload
      break
    case actionTypes.SET_SEQUECE_PLAYLIST:
      state.sequencePlayList = payload
      break
    case actionTypes.SET_PLAYLIST:
      state.playList = payload
      break
    case actionTypes.SET_PLAY_MODE:
      state.mode = payload
      break
    case actionTypes.SET_CURRENT_INDEX:
      state.currentIndex = payload
      break
    case actionTypes.SET_SHOW_PLAYLIST:
      state.showPlayList = payload
      break
    case actionTypes.INSERT_SONG:
      handleInsertSong(state,payload)
      break
    case actionTypes.DELETE_SONG:
      const Index = findIndex(payload, state.playList);
      state.playList.splice(Index, 1);
      if(Index < state.currentIndex) state.currentIndex--;
      const fsIndex = findIndex(payload, state.sequencePlayList);
      state.sequencePlayList.splice(fsIndex, 1);
      break
    case actionTypes.CHANGE_SPEED:
      state.speed = payload
      break
    default:
      return state;
  }
})