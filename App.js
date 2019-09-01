import React, { Component } from 'react';
import { Provider } from 'react-redux'

import Store from './src/_redux/Store.js'
import SwitchMain from './src/routers/SwitchMain'

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <SwitchMain />
      </Provider>
    )
  }
}