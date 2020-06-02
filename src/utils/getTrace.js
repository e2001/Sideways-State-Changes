let stackTrace = require('stack-trace')

export const getTrace = function (filterOutNames = []) {

  const knownFuncNames = {
    'checkDeferredModules': null,
    '__webpack_require__': null,
    'fn': null,
    'Array.webpackJsonpCallback [as push]':null
  }

  let trace = stackTrace.parse(new Error())
  trace.shift() //we remove first element, which is this method
  const rv = trace.filter(item => {

    return (knownFuncNames[ item.functionName] === undefined) &&
      (filterOutNames.indexOf(item.functionName) === -1)

  }).map(item => item.functionName).join('  |  ')

  return rv
}
