import React, {Component} from 'react'
import PropTypes from 'prop-types'
import "./C.component.css"
import safeGet from 'lodash/get'
// import B from "../B2"

class C extends Component {

  constructor(props){
    super(props)

  }

  render (){

    console.log('Render C',this.props)

    return (
      <div className='CComponent'>
        <h5>I am C Component</h5>
        <div>valueForC:{safeGet(this.props,'my.valueForC')}</div>
      </div>
    )
  }
}


C.propTypes = {

}

export default C
