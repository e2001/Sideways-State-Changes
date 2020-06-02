import React, {useState, useContext, useEffect, useDebugValue, useRef} from 'react'
import _ from "../utils/myLodash"
import {registerForStoreUpdates, unregisterForStoreUpdates} from "./sidewaysStoreUpdateService"
import {getTrace} from "../utils/getTrace"
import {throwErrorTrace} from '../utils/throwErrorTace'
import {getCommonKeys} from "../utils/getCommonKeys"
import {sidewaysStateChangesOptions} from "../config/sidewaysStateChangesOptions"


let importIDCounter = 0


const getImportDebugPath = () => {
  if (sidewaysStateChangesOptions.isGenerateDebugPath) {
    return getTrace(['getImportDebugPath', 'sidewaysConnectedComponent'])
  } else {
    return 'no-debug-path-generated'
  }
}

const storeUpdatesCallback = (storeSetter, IMPORT_ID, storeDiff) => {

  //console.log('storeUpdatesCallback ', ComposedComponent.typeName, sidewaysMappedStore)
  //we get the changed values only and merge it with sidewaysMappedStore

  console.log('set via sideways callback ', IMPORT_ID)

  //{39DE8DF6-307C-3DEB-A925-4B68AEF4801D}
  storeSetter((currentStore) => {
    return {sidewaysStore: _.merge(Object.assign({}, currentStore.sidewaysStore), storeDiff)}
  })

}

/*!
 * Create a wrapped component that is connected to updates from the store
 * @param  {Object} ComposedComponent The original Component
 * @param  {Object} paths an object with mapping between props and paths in the store
 */
//{D9702147-4104-A597-6041-B48E8A0F209E}
const sidewaysConnectedComponent = (ComposedComponent, paths) => {

  if (!ComposedComponent) {
    throwErrorTrace('SidewaysStateChanges : ComposedComponent parameter is undefined ')
  }

  const composedComponentName = typeof ComposedComponent === 'function' ? ComposedComponent.displayName || ComposedComponent.name || 'Unknown' : ComposedComponent

  const IMPORT_ID_STR = composedComponentName + '.' + (importIDCounter++)

  const IMPORT_DEBUG_PATH = getImportDebugPath()

  console.log('called sidewaysConnectedComponent ', IMPORT_ID_STR)

  const IMPORT_ID = Symbol(IMPORT_ID_STR)

  const SidewaysStateChanges = (props) => {

    //this is a functional component

    ////////////////////
    //state
    ////////////////////
    const [sidewaysStore, setSidewaysMappedStore] = useState({sidewaysStore: null})
    const [_IMPORT_ID_STR] = useState({INSTANCE_ID: IMPORT_ID_STR}) //state is for devtools
    const [_INSTANCE_ID_Symbol] = useState(Symbol(IMPORT_ID_STR))
    useState({SIDEWAYS_MAPPINGS: paths})

    useEffect(() => {

      //setup registration on initial mount
      // {74A8A234-D924-352A-E160-4FD8FEC54A0E}
      registerForStoreUpdates(IMPORT_ID, paths, storeUpdatesCallback.bind(null, setSidewaysMappedStore, IMPORT_ID), _INSTANCE_ID_Symbol)


      return () => {
        //this will occur when unmount
        //{D3C2F124-95AB-5241-5D2B-30E10F7AB5E7}
        unregisterForStoreUpdates(IMPORT_ID, paths, _INSTANCE_ID_Symbol)
      }

    }, [])

    if (sidewaysStateChangesOptions.isWarnSamePathOnPropsAndSidewaysStore) {
      //checks for common keys between props and sidewaysStore
      //happens when you supply same prop name as in SidewaysStateChanges mappings
      const commonKeys = getCommonKeys(sidewaysStore, props)
      if (commonKeys.length > 0) {
        throw new Error(`registerForSidewaysStateChanges : common Keys [ "${commonKeys.join('" | "').toString()}" ] found for import : ${IMPORT_DEBUG_PATH}`)
      }
    }


    console.log('Render functional component', IMPORT_ID_STR)

    let component = ComposedComponent

    if (!React.isValidElement(component)) {
      component = ComposedComponent && <ComposedComponent {...sidewaysStore.sidewaysStore}{...props} />
    }

    return component
  }

  return (React.memo(SidewaysStateChanges))
}

export default sidewaysConnectedComponent

