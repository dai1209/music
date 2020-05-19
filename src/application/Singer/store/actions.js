
import { CHANGE_SONGS_OF_ARTIST, CHANGE_ARTIST, CHANGE_ENTER_LOADING,GET_SINGER_INFO } from './constants';

export const changeArtist = (payload) => ({
  type: CHANGE_ARTIST,
  payload
});

export const changeSongs = (payload) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  payload
})
export const changeEnterLoading = (payload) => ({
  type: CHANGE_ENTER_LOADING,
  payload
})

export const getSingerInfo = (payload) => ({
  type: GET_SINGER_INFO,
  payload
})
