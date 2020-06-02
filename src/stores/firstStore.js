import {Observable} from '@reactivex/rxjs'

import mapToKey from "../utils/mapToKey"

const valueForA = Observable.interval(12000).map(i => i+1)
  .startWith(0)

const valueForC = Observable.interval(7000).map(i => i+1)
  .startWith(0)

const valueForB = Observable.interval(5000).map(i => {
  return i+1
}).startWith(0)

const otherValueForB = Observable.interval(10000).map(i => {
  return  i+1
}).startWith(0)



export default Observable.combineLatestObj(
  {
    valueForC,
    valueForA,
    valueForB,
    otherValueForB,
  }).map(mapToKey('firstStore'))


