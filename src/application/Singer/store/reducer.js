import * as actionTypes from './constants';
import produce from 'immer';

const initialState = {
  artist: {},
  songsOfArtist: [],
  loading: true
}

export default produce((state = initialState, {type,payload}) => {
  switch(type) {
    case actionTypes.CHANGE_ARTIST:
      state.artist = payload
      break
    case actionTypes.CHANGE_SONGS_OF_ARTIST:
      state.songsOfArtist = payload
      break
    case actionTypes.CHANGE_ENTER_LOADING:
      state.loading = payload
      break
    default:
      return state
  }
})