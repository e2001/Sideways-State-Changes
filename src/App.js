import React, {Component} from 'react'
import A from './components/A'


class App extends Component {

  render() {
    //console.log('App Render',this.props)

    return (
      <div className="App">
        <h5>App Component</h5>
        <A/>
      </div>
    )
  }
}

export default App
