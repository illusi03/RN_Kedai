import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { Styles, Color } from '../../res/Styles'

class ScreenHome extends Component {
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
          }]}>INI HALAMAN DEPAN PUBLIC</Text>
        </View>
      </View>
    )
  }
}
export default ScreenHome