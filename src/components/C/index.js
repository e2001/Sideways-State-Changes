import sidewaysConnectedComponent from "../../sidewaysStateChange/sidewaysConnectedComponent"
import C from './C.component.js'

export default sidewaysConnectedComponent(C,
  {'my.valueForC': 'firstStore.valueForC'}
)
