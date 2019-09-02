import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Style } from 'react-native'

import { Styles, Color } from '../../res/Styles'
import { convertToRupiah } from '../../res/Constant'

export default CompOptionBot = (props) => {
  let serviceCharge = Math.trunc((props.subTotal/100)*5.5)
  let tax = Math.trunc((props.subTotal/100)*10)
  let discount = 0
  let totalGrand = (props.subTotal+serviceCharge+tax)-discount
  let objCompOption = {
    serviceCharge,
    tax,
    discount,
    totalGrand
  }
  return (
    /* List Menu (Status , Name dan Price) */
    <View style={{
      flexDirection: 'row',
      flex: 1
    }}>
      <View style={[{
        flex: 25,
        marginRight: 25
      }]}>

        <Text style={[Styles.hurufKonten, {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'right',
          marginBottom: 5
        }]}
        >Sub Total</Text>
        <Text style={[Styles.hurufKonten, {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'right',
          marginBottom: 5
        }]}
        >Discount</Text>
        <Text style={[Styles.hurufKonten, {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'right',
          marginBottom: 5
        }]}
        >Service Charge (5.5%) </Text>
        <Text style={[Styles.hurufKonten, {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'right',
          marginBottom: 10
        }]}
        >Tax (10%) </Text>
        <Text style={[Styles.hurufKonten, {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'right',
        }]}
        >TOTAL</Text>

      </View>
      <View style={[Styles.hurufKonten, {
        flex: 15
      }]}>

        <Text
          style={[Styles.hurufKonten, {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: 10,
            marginBottom: 5
          }]}
        >
          {convertToRupiah(props.subTotal)}
        </Text>
        <Text
          style={[Styles.hurufKonten, {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: 10,
            marginBottom: 5
          }]}
        >
          {convertToRupiah(discount)}
        </Text>
        <Text
          style={[Styles.hurufKonten, {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: 10,
            marginBottom: 5
          }]}
        >
          {convertToRupiah(serviceCharge)}
        </Text>
        <Text
          style={[Styles.hurufKonten, {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: 10,
            marginBottom: 5
          }]}
        >
          {convertToRupiah(tax)}
        </Text>
        <Text
          style={[Styles.hurufKonten, {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: 10,
            marginBottom: 5
          }]}
        >
          {convertToRupiah(totalGrand)}
        </Text>

      </View>
    </View>
  )
}

