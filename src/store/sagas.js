import {saga as albumSaga} from '../application/Album/store' 

import {saga as recommendSaga} from '../application/Recommend/store'

import {saga as playerSaga} from '../application/Player/store'

import {saga as singersSaga} from '../application/Singers/store'

import {saga as rankSaga} from '../application/Rank/store'

const rootSaga = [
  albumSaga,
  recommendSaga,
  playerSaga,
  singersSaga,
  rankSaga
]
export default rootSaga