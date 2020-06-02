import {getTrace} from "./getTrace"

export const throwErrorTrace = (...args) => {
  const trace = getTrace(['throwErrorTrace'])
  const msg = [...args]
  throw new Error(JSON.stringify(msg) + '[Trace: ' + trace.toString() + ']')
}
