import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';


import { Styles, Color } from '../../res/Styles'
import { getTransaction } from '../../_actions/Transaction'
import CompListOrder from './CompListOrder'
import CompOptionBot from './CompOptionBot'

class ScreenViewbill extends Component {
  state = {
    subStateTotal: 0
  }
  aksiCallBill = async () => {

  }
  getOrderList = async () => {
    const idTrans = await AsyncStorage.getItem('idTransaction')
    await this.props.dispatch(getTransaction(idTrans))
    let tempSubTotal = 0
    if (this.props.Transaction.dataItem.orders) {
      this.props.Transaction.dataItem.orders.map((item, index) => {
        let tmpJumlahHarga = item.price*item.qty
        tempSubTotal += tmpJumlahHarga
      })
    }
    await this.setState({
      subStateTotal:tempSubTotal
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

            <TouchableOpacity style={[Styles.cardSimpleContainer, {
              backgroundColor: Color.accentColor,
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 5,
              margin: 5,
              height: '100%',
              flexDirection: 'row'
            }]}
              onPress={() => this.aksiCallBill()}
            >
              <Text style={[Styles.hurufKonten, {
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center'
              }]}>
                CALL BILL</Text>
            </TouchableOpacity>
          </View>


        </View>
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