import {Observable} from '@reactivex/rxjs'

import firstStore from './firstStore'


export default Observable.combineLatest(
  firstStore,
  (firstStore) => {
    return Object.assign({}, firstStore)
  }
)
