import { Observable } from '@reactivex/rxjs'

export default (Observable.combineLatestObj = obsObj => {
  const keys = Object.keys(obsObj)

  const observables = keys.map(key => {
    const obsToReturn = obsObj[key]

    const delayError = Observable.interval(3000)
      .first()
      // currentData comes from live udpates so ignore an non emissions from it
      .do(
        () =>
          process.env.NODE_ENV !== 'production' &&
          key !== 'currentData' &&
          console.error(`${key} didn't emit a value in 3 seconds`)
      )
      .switchMap(() => obsToReturn)

    return Observable.race(obsToReturn, delayError)
  })

  return Observable.combineLatest(observables, (...args) => {
    return args.reduce((output, current, i) => {
      return Object.assign(output, { [keys[i]]: current })
    }, {})
  })
})
