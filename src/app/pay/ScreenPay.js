import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

import { Styles, Color } from '../../res/Styles'
import AsyncStorage from '@react-native-community/async-storage';
import { getTransaction, editTransaction } from '../../_actions/Transaction'

class ScreenPay extends Component {
  state = {
    noMeja : 0
  }
  aksiCallBill = async () => {
    // PATCH tbl transaksi berdasarkan ID
    // Data yg dipatch {Sub_total,discount,serviceCharge,tax,total,isPaid}
    // Insert tbl transaksi {no_tbl,isPaid=false}, ambil IDTransaksi simpan di Async idTransaction
    // this.props.dispatch(editTransaction(this.props.Transaction.id,))
  }
  getNoMeja = async () => {
    const noMeja = await AsyncStorage.getItem('noMeja')
    await this.setState({
      noMeja
    })
  }
  componentDidMount(){
    this.getNoMeja()
  }
  render() {
    return (
      <View style={[Styles.container, {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
      }]}>
        <View style={[Styles.content, Styles.cardSimpleContainer, {
          backgroundColor: Color.whiteColor,
          width: '100%',
          height: '100%',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }]}>
          <Text style={[Styles.hurufKonten, {
            fontSize: 20,
            fontWeight: 'bold',
          }]}>Payment Session</Text>

          {/* Divider */}
          <View
            style={{
              borderBottomColor: Color.darkPrimaryColor,
              borderBottomWidth: 2,
              width: '100%',
              marginVertical: 5
            }}
          />
          <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Image
              source={require('../../assets/Illustrator/receptionist.png')}
              style={{
                width: 250,
                height: 250
              }}
            ></Image>
            <Text style={[Styles.hurufKonten, {
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10
            }]}>
              PLEASE BRING THE IPAD TO THE CASHIER
              </Text>
            <Text style={[Styles.hurufKonten, {
              fontSize: 17,
              fontWeight: 'bold',
            }]}>
              TO PROCEED WITH THE PAYMENT
              </Text>

            <Text style={[Styles.hurufKonten, {
              fontSize: 30,
              fontWeight: 'bold',
              marginTop:30,
              marginBottom:5
            }]}>
              # {this.state.noMeja}
              </Text>
            <Text style={[Styles.hurufKonten, {
              fontSize: 17,
              fontWeight: 'bold',
              marginBottom:25
            }]}>
              Thank you
              </Text>
            <Text style={[Styles.hurufKonten, {
              fontSize: 16,
              fontWeight: 'bold',
            }]}>
              Time Spent
              </Text>
            <Text style={[Styles.hurufKonten, {
              fontSize: 15,
              fontWeight: 'bold',
            }]}>
              0:59:0
              </Text>
          </View>
        </View>


      </View>
    )
  }
}

export default ScreenPay