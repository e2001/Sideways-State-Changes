import keyMirror from 'key-mirror'
import sidewaysConnectedComponent from "../../sidewaysStateChange/sidewaysConnectedComponent"
import A from './A.component.js'


export default sidewaysConnectedComponent(A, {
   'valueForAx':'firstStore.valueForA'
})
