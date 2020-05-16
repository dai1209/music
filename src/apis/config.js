import qs from 'qs'

const baseUrl = "http://localhost:5000"
async function request(url,options){
  url = baseUrl +url
  const str = options ? `?${qs.stringify(options)}` : ''
  const data = await fetch(url+str)
  const res = await data.json()
  return res 
}

// Request.get Request.post

export const HEADER_HEIGHT = 45;

export default request
