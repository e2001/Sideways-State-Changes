import {isFunction} from 'lodash'
import {pathOr, assocPath, identity, pick} from 'ramda'
import stores from "../stores"
import {customizedObjectDiff} from "../utils/customizedObjectDiff"
import isEmpty from "../utils/isEmpty"
import {throwErrorTrace} from "../utils/throwErrorTace"


const DEFAULT_VALUE = Symbol()

let previousAppStore = null

const watchingComponentsDic = {}


export const sendUpdateTo = (diff, importId, instanceId) => {

  let outGoingPortionedStore = {}
  const valueDic = {}
  const targetedWatchingComponent = watchingComponentsDic[importId]


  if (targetedWatchingComponent.hasMembers() && diff) {

    Object.entries(targetedWatchingComponent.pathMappings)
      .forEach(([desPath, sourcePath]) => {

        //for each path this import-component specified

        if (!valueDic[sourcePath]) {
          //value dic dose not have this data
          let sourcePathsArr = sourcePath.split('.')
          let lastPath = sourcePathsArr.pop()
          let parentObj = pathOr(DEFAULT_VALUE, sourcePathsArr, diff)

          if (parentObj !== DEFAULT_VALUE && Object.hasOwnProperty.call(parentObj, lastPath)) {

            //we found a path to the parent and it has such prop
            valueDic[sourcePath] = {value: parentObj[lastPath]}
          }

        }

        //for each sourcePath value dic holds {value:'someValue'}
        if (valueDic[sourcePath]) {
          //we have a value for this sourcePath
          //add it to outGoingPortionedStore
          let desPathArr = desPath.split('.')
          outGoingPortionedStore = assocPath(desPathArr, valueDic[sourcePath].value, outGoingPortionedStore)
        }
      })

    if (!isEmpty(outGoingPortionedStore)) {
      //{B6A87A06-CB0D-F14C-72AD-C7E5EAD69E7E}

      Object.getOwnPropertySymbols(targetedWatchingComponent.cbDic)
        .forEach(cbInstanceId => {
          if (!instanceId || cbInstanceId === instanceId) {
            //{5EFE8587-732B-78E8-C24A-1ED595BAF35F}
            targetedWatchingComponent.cbDic[cbInstanceId](outGoingPortionedStore)
          }
        })
    }

  }
}


export const registerForStoreUpdates = (importId, pathMappings, cb, instanceId) => {

  if (!isFunction(cb)) {
    throwErrorTrace('registerForStoreUpdates : callback parameter is not a function')
  }

  if (!watchingComponentsDic[importId]) {
    watchingComponentsDic[importId] = {
      importId: importId, pathMappings, cbDic: {}, hasMembers: function () {
        return Object.getOwnPropertySymbols(this.cbDic).length > 0
      }
    }
  }

  watchingComponentsDic[importId].cbDic[instanceId] = cb

  //console.log('registerForStoreUpdates', importId, 'watchingComponentsDic ', watchingComponentsDic)

  sendUpdateTo(previousAppStore, importId, instanceId)

}

export const unregisterForStoreUpdates = (importId, paths, instanceId) => {
  delete watchingComponentsDic[importId].cbDic[instanceId]

}

export const startSidewaysStoreUpdateService = () => {

  //{B2961D70-EC18-9F47-7A38-4D1AE81780F1}
  stores.subscribe((currentAppStore) => {

    //{6EA074AD-BCFB-26A6-D31B-E841871259B7}
    const diff = customizedObjectDiff(previousAppStore, currentAppStore)

    //we get notified if app state changes
    console.log('SidewaysStoreUpdate diff : ', diff)

    if (Object.keys(diff).length > 0) {
      Object.getOwnPropertySymbols(watchingComponentsDic)
        .forEach((importedComponentId) => {
          sendUpdateTo(diff, importedComponentId)
        })
    }

    previousAppStore = currentAppStore

  })
}




