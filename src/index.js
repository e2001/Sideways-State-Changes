import './bootstrapper/bootstrapper'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import stores from './stores'
import './index.css';


stores.subscribe((appState) => {
  ReactDOM.render(<App {...appState}/>, document.getElementById('root'));
})
