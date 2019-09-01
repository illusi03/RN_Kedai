import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

import { Styles, Color } from '../../res/Styles'

class ScreenProfile extends Component {
  render() {
    return (
      <View style={[Styles.container, {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      }]}>
        <View style={[Styles.content, Styles.cardSimpleContainer, {
          backgroundColor: Color.whiteColor,
          width: '100%',
          height: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          <Text style={[Styles.hurufKonten, {
            fontSize: 20,
            fontWeight: 'bold',
          }]}>Ini adalah Halaman Profilee  !!</Text>
        </View>
      </View>
    )
  }
}
export default ScreenProfile