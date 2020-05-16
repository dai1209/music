import request from './config'

export const getBannerRequest = () => {
  return request("/banner");
};

export const getRecommendListRequest = () => {
  return request("/personalized");
};

export const getHotSingerListRequest = count => {
  console.log('12');
  
  return request(`/top/artists`,{offset:count});
};

export const getSingerListRequest = (category, alpha, count) => {
  return request(
    `/artist/list`,
    {
      cat:category,
      initial:alpha.toLowerCase(),
      offset:count
    }
  );
};

export const getRankListRequest = () => {
  return request(`/toplist/detail`);
};

export const getAlbumDetailRequest = id => {
  return request(`/playlist/detail`,{id:id});
};

export const getSingerInfoRequest = id => {
  return request(`/artists`,{id:id});
};

export const getHotKeyWordsRequest = () => {
  return request(`/search/hot`);
};

export const getSuggestListRequest = query => {
  return request(`/search/suggest`,{keywords:query});
};

export const getResultSongsListRequest = query => {
  return request(`/search`,{keywords:query});
};

export const getSongDetailRequest = id => {
  return request(`/song/detail`,{id});
};

export const getLyricRequest = id => {
  return request(`/lyric`,{id});
};

export const loginByPhoneRequest = (phone, password) => {
  return request(
    `/login/cellphone`,
    {phone,password}
  );
};

export const sentVcodeRequest = phone => {
  return request(`/captcha/sent`,{phone});
};

export const loginByVcodeRequest = (phone, vcode) => {
  return request(`/captcha/verify`,{phone,captcha:vcode});
};