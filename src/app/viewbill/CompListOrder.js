import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import { Styles, Color } from '../../res/Styles'
import { convertToRupiah } from '../../res/Constant'


const CompListOrder = (props) => {
  return (
    /* List Menu (Status , Name dan Price) */
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10
    }}>
      <Text style={[Styles.hurufKonten, {
        fontSize: 14,
        fontWeight: '300',
        flex: 1,
      }]}>
        {props.status ? props.status : 'Not Confirm'}
      </Text>
      <Text style={[Styles.hurufKonten, {
        fontSize: 14,
        fontWeight: '300',
        flex: 1
      }]}>{props.name}</Text>
      <Text style={[Styles.hurufKonten, {
        fontSize: 14,
        fontWeight: '300',
        flex: 1,
        textAlign: 'center'
      }]}>{props.qty}</Text>
      <Text style={[Styles.hurufKonten, {
        fontSize: 14,
        fontWeight: '300',
        flex: 1
      }]}>{convertToRupiah(props.price*props.qty)}</Text>
    </View>
  )
}
export default CompListOrder