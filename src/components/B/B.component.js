import React, {Component} from 'react'
import PropTypes from 'prop-types'
import "./B.component.css"
import C from "../C"
import safeGet from 'lodash/get'

class B extends Component {

  render() {

    console.log('Render B', this.props)

    return (
      <div className='BComponent'>
        <h5>I am B Component</h5>
        <div>valueForBx:{this.props.valueForBx}</div>
        <C/>
      </div>
    )
  }
}


B.propTypes = {}

export default B
