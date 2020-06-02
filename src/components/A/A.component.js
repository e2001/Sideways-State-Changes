import React, {Component} from 'react'
import safeGet from 'lodash/get'
import B from "./../B"
import B2 from "../B2"
import "./A.component.css"

class A extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasB1: true,
      hasB2: true
    }
  }


  render() {
    console.log('Render A', this.props)

    return (
      <div className='AComponent'>
        <h5>I am A Component</h5>
        <div>value for A : {this.props.valueForAx}</div>

        {this.state.hasB1 && <B/>}

        {this.state.hasB2 && <B2/>}

        <button onClick={() => {
          this.setState({hasB1: !this.state.hasB1})
        }}>{!this.state.hasB1?'Show B1':'Hide B1'}
        </button>
        <button onClick={() => {
          this.setState({hasB2: !this.state.hasB2})
        }}>{!this.state.hasB2?'Show B2':'Hide B2'}
        </button>

      </div>
    )
  }
}


A.propTypes = {}

export default A
