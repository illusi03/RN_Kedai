import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'

import { Styles, Color } from '../../res/Styles'
import { getTransaction, editTransaction } from '../../_actions/Transaction'
import CompListOrder from './CompListOrder'
import CompOptionBot from './CompOptionBot'

class ScreenViewbill extends Component {
  state = {
    subStateTotal: 0,
    isAdaBarang: true,
    isKosongPisan: true
  }
  aksiCallBill = async () => {
    // PATCH tbl transaksi berdasarkan ID
    // Data yg dipatch {Sub_total,discount,serviceCharge,tax,total,isPaid}
    // Insert tbl transaksi {no_tbl,isPaid=false}, ambil IDTransaksi simpan di Async idTransaction
    // this.props.dispatch(editTransaction(this.props.Transaction.id,))
  }
  getOrderList = async () => {
    const idTrans = await AsyncStorage.getItem('idTransaction')
    await this.props.dispatch(getTransaction(idTrans))
    let tempSubTotal = 0
    if (this.props.Transaction.dataItem.orders) {
      this.props.Transaction.dataItem.orders.map((item, index) => {
        let tmpJumlahHarga = item.price * item.qty
        tempSubTotal += tmpJumlahHarga
        if (item.status == null) {
          this.setState({
            isAdaBarang: false
          })
        }
        this.setState({
          isKosongPisan: false
        })
      })
    }
    await this.setState({
      subStateTotal: tempSubTotal
    })
  }
  componentDidMount() {
    this.getOrderList()
  }
  render() {
    return (
      <View style={[Styles.container, {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
      }]}>

        {!this.state.isKosongPisan & !this.props.Transaction.isLoading ?
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
            }]}>Billing (Kedai Dumbways)</Text>

            {/* Divider */}
            <View
              style={{
                borderBottomColor: Color.darkPrimaryColor,
                borderBottomWidth: 2,
                width: '100%',
                marginVertical: 5
              }}
            />

            {/* List Order */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5
            }}>
              <Text style={[Styles.hurufKonten, {
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }]}>Status</Text>
              <Text style={[Styles.hurufKonten, {
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }]}>Name</Text>
              <Text style={[Styles.hurufKonten, {
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }]}>Qty</Text>
              <Text style={[Styles.hurufKonten, {
                fontSize: 16,
                fontWeight: 'bold',
                flex: 1,
                textAlign: 'center'
              }]}>Sum Price</Text>
            </View>

            {this.props.Transaction.isLoading ?
              <ActivityIndicator size={30} style={{ flex: 1 }}></ActivityIndicator>
              :
              <FlatList
                data={this.props.Transaction.dataItem.orders}
                keyExtractor={(item) => item.id.toString()}
                style={{
                  width: '100%',
                  marginHorizontal: 15
                }}
                renderItem={({ item }) => {
                  return (
                    <CompListOrder
                      status={item.status}
                      qty={item.qty}
                      name={item.menu.name}
                      price={item.price}
                    />
                  )
                }}
              />
            }

            {/* Divider */}
            <View
              style={{
                borderBottomColor: Color.darkPrimaryColor,
                borderBottomWidth: 2,
                width: '100%',
                marginVertical: 5
              }}
            />

            {/* Option Bawah */}
            <View style={[Styles.cardSimpleContainer, {
              elevation: 2,
              height: 150,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 5,
            }]}>
              <CompOptionBot subTotal={this.state.subStateTotal} />
            </View>

            {/* Button Call) */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15
            }}>
              {this.state.isAdaBarang ?
                <TouchableOpacity style={[Styles.cardSimpleContainer, {
                  backgroundColor: Color.darkPrimaryColor,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 5,
                  margin: 5,
                  height: '100%',
                  flexDirection: 'row'
                }]}
                  onPress={() => this.aksiCallBill()}
                >
                  <IconMaterial name='payment' size={25} color={Color.whiteColor} style={{
                    marginHorizontal: 10
                  }}></IconMaterial>
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: Color.whiteColor,
                    marginRight: 10
                  }]}>
                    CALL BILL</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={[Styles.cardSimpleContainer, {
                  backgroundColor: Color.errorColor,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  padding: 5,
                  margin: 5,
                  height: '100%',
                  flexDirection: 'row'
                }]}
                  onPress={() => this.props.navigation.navigate('SWScreenCart')}
                >
                  <Text style={[Styles.hurufKonten, {
                    fontSize: 15,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: Color.whiteColor
                  }]}>
                    CONFIRM FIRST BEFORE CALL BILL
                </Text>
                </TouchableOpacity>
              }
            </View>
          </View>
          :
          this.props.Transaction.isLoading ?
            <View>
              <Text style={[Styles.hurufKonten, {
                fontSize: 20,
                fontWeight: 'bold',
              }]}>Billing (Kedai Dumbways)</Text>
              <ActivityIndicator size={30} style={{ flex: 1 }}></ActivityIndicator>
            </View>
            :
            //Jika Tidak ada Sama sekali Orderan
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
              }]}>Billing (Kedai Dumbways)</Text>

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
                  source={require('../../assets/Illustrator/unknown.png')}
                  style={{
                    width: 150,
                    height: 200
                  }}
                ></Image>
                <Text style={[Styles.hurufKonten, {
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: 10
                }]}>
                  Oopps.. There are no items to pay
              </Text>
                <Text style={[Styles.hurufKonten, {
                  fontSize: 17,
                  fontWeight: 'bold',
                }]}>
                  First , Order and then confirm your order
              </Text>
              </View>
            </View>

        }
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Transaction: state.Transaction,
    Order: state.Order
  }
}

export default connect(mapStateToProps)(ScreenViewbill)