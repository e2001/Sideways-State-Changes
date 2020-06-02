import * as internalDispatcher from './dispatch'
import dispatcher from './dispatcher'

export * from './dispatcher'
export default dispatcher
export const dispatch = internalDispatcher

