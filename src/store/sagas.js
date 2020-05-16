import {saga as albumSaga} from '../application/Album/store' 

import {saga as recommendSaga} from '../application/Recommend/store'

import {saga as playerSaga} from '../application/Player/store'

import {saga as singersSaga} from '../application/Singers/store'

const rootSaga = [
  albumSaga,
  recommendSaga,
  playerSaga,
  singersSaga
]
export default rootSaga