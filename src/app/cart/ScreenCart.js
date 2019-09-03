import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, ActivityIndicator, Alert } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import IconFa from 'react-native-vector-icons/FontAwesome5'
import IconOctic from 'react-native-vector-icons/Octicons'

import Constanta, { convertToRupiah } from '../../res/Constant'
import { Styles, Color } from '../../res/Styles'
import { getTransaction } from '../../_actions/Transaction'
import { addOrder, editOrder, deleteOrder, setOrderStatus } from '../../_actions/Order'


//transactionOrder/:transactionId

class ScreenCart extends Component {
  state = {
    tableNumber: '',
    isAdaBarang: false,
    isLoading: true
  }
  aksiAddOrderMenus = async (menuId, transactionId) => {
    //Cari data Jika isPaid false , Input Order.
    //Cek Data Transaksi (Apakah sudah STATUS PAID / BELUM)

    try {
      let transaksiData
      let menuData
      transaksiData = await axios.get(`${Constanta.host}/transaction/${transactionId}`)
      menuData = await axios.get(`${Constanta.host}/menu/${menuId}`)

      if (!transaksiData.data.isPaid) {
        //Cek jika ada Menu yg sudah terdaftar di Order MenuId dan TransaksiId, Tambah
        //Cek Jumlah Order di setiap Transaksi
        //const jumlahSemuaMenuByTransaksi = await axios.get(`${Constanta.host}/transaction/${transactionId}`)
        const jmlMenuDataByTrans = await axios.get(`${Constanta.host}/order/transactionId/${transactionId}/menuId/${menuId}`)

        if (jmlMenuDataByTrans.data) {
          //Ambil dulu jumlah Qty nya, lalu Tambahkan + 1
          //Patch Data Where IDOrderNya
          let idOrderNya = jmlMenuDataByTrans.data.id
          let jmlDataNya = jmlMenuDataByTrans.data.qty
          jmlDataNya = jmlDataNya + 1
          const dataJadi = {
            qty: jmlDataNya
          }
          await this.props.dispatch(editOrder(idOrderNya, dataJadi))
        }
        await this.props.dispatch(getTransaction(transactionId))
      } else {
        alert('Sudah Bayar')
      }
    } catch (e) {
      console.log(e)
    }
  }
  aksiRemoveOrderMenus = async (menuId, transactionId) => {
    //Cari data Jika isPaid false , Input Order.
    //Cek Data Transaksi (Apakah sudah STATUS PAID / BELUM)

    try {
      let transaksiData
      let menuData
      transaksiData = await axios.get(`${Constanta.host}/transaction/${transactionId}`)
      menuData = await axios.get(`${Constanta.host}/menu/${menuId}`)

      // console.log(`Transaksi Data : ${JSON.stringify(transaksiData)}`)
      // console.log(`Menu Data : ${JSON.stringify(menuData)}`)
      // console.log(`jmlMenuData Data : ${JSON.stringify(jmlMenuDataByTrans)}`)



      if (!transaksiData.data.isPaid) {
        //Cek jika ada Menu yg sudah terdaftar di Order MenuId dan TransaksiId, Tambah
        //Cek Jumlah Order di setiap Transaksi
        //const jumlahSemuaMenuByTransaksi = await axios.get(`${Constanta.host}/transaction/${transactionId}`)
        const jmlMenuDataByTrans = await axios.get(`${Constanta.host}/order/transactionId/${transactionId}/menuId/${menuId}`)
        if (jmlMenuDataByTrans.data) {
          let idOrderNya = jmlMenuDataByTrans.data.id
          let jmlDataNya = jmlMenuDataByTrans.data.qty
          if (jmlDataNya > 1) {
            jmlDataNya = jmlDataNya - 1
            const dataJadi = {
              qty: jmlDataNya
            }
            await this.props.dispatch(editOrder(idOrderNya, dataJadi))
          } else {
            await this.props.dispatch(deleteOrder(idOrderNya))
          }
        }
        await this.props.dispatch(getTransaction(transactionId))
      } else {
        alert('Sudah Bayar')
      }
      if (this.props.Transaction.dataItem.orders) {
        this.props.Transaction.dataItem.orders.map(async (item, index) => {
          if (item.status == null) {
            await this.setState({
              isAdaBarang: true
            })
          } else {
            await this.setState({
              isAdaBarang: false
            })
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  aksiConfirm = async (transactionId) => {
    await this.props.dispatch(setOrderStatus(transactionId, {
      status: false
    }))
    await this.props.navigation.navigate('SWScreenViewbill')
  }
  getNomorTable = async () => {
    let noMejaNya = await AsyncStorage.getItem('idTransaction');
    await this.setState({
      tableNumber: noMejaNya
    })
    await this.props.dispatch(getTransaction(this.state.tableNumber))
    if (this.props.Transaction.dataItem.orders) {
      this.props.Transaction.dataItem.orders.map(async (item, index) => {
        if (item.status == null) {
          await this.setState({
            isAdaBarang: true
          })
        } else {
          await this.setState({
            isAdaBarang: false
          })
        }
      })
    }
    await this.setState({
      isLoading:this.props.Transaction.isLoading
    })
  }
  componentDidMount() {
    this.getNomorTable()
  }
  render() {
    return (
      <View style={[Styles.container, {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }]}>

        {/* List Menu */}
        <View style={[Styles.content, Styles.cardSimpleContainer, {
          backgroundColor: Color.whiteColor,
          width: '100%',
          marginBottom: 5,
          flex: 1
        }]}>
          <Text style={[Styles.hurufKonten, {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 5
          }]}>
            List Order
          </Text>

          {/* Divider */}
          <View
            style={{
              borderBottomColor: Color.darkPrimaryColor,
              borderBottomWidth: 2,
              width: '100%',
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center'
            }}
          />


          {this.state.isLoading ?
            <ActivityIndicator style={{
              flex: 1
            }} size={30}></ActivityIndicator>
            :
            <FlatList
              data={this.props.Transaction.dataItem.orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  item.status == null ?
                    <View style={[Styles.cardSimpleContainer, {
                      backgroundColor: Color.whiteColor,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 5,
                      margin: 5,
                      marginVertical: 20,
                      flexDirection: 'row',
                      position: 'relative',
                      height: 100,
                      flex: 1
                    }]}>
                      <TouchableOpacity
                        onPress={() => this.aksiRemoveOrderMenus(item.menu.id, this.props.Transaction.dataItem.id)}
                      >
                        <IconFa name='minus-square' color={Color.darkPrimaryColor} size={23} style={{
                          paddingRight: 10,
                          paddingLeft: 10
                        }}></IconFa>
                      </TouchableOpacity>
                      <Image source={{ uri: item.menu.image }} style={{
                        width: 100,
                        height: '100%',
                        marginRight: 20,
                        borderRadius: 10
                      }}></Image>
                      <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={[Styles.hurufKonten, {
                          fontSize: 17,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }]}>
                          {item.menu.name}</Text>
                        <Text style={[Styles.hurufKonten, {
                          fontSize: 15,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }]}>
                          {convertToRupiah(item.menu.price)} / pcs</Text>
                        <Text style={[Styles.hurufKonten, {
                          fontSize: 18,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }]}>
                          ({convertToRupiah(item.menu.price*item.qty)})</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.aksiAddOrderMenus(item.menu.id, this.props.Transaction.dataItem.id)}
                      >
                        <IconFa name='plus-square' color={Color.darkPrimaryColor} size={23} style={{
                          paddingRight: 10,
                          paddingLeft: 10
                        }}></IconFa>
                      </TouchableOpacity>
                      <View style={{
                        position: 'absolute',
                        right: -5,
                        top: -15,
                        width: 30,
                        height: 30,
                        backgroundColor: Color.whiteColor,
                        borderRadius: 50,
                        borderColor: Color.darkPrimaryColor,
                        borderWidth: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.qty}</Text>
                      </View>
                    </View>
                    : false)
              }}

              ListFooterComponent={() => (

                this.state.isAdaBarang ?
                  <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity style={[Styles.cardSimpleContainer, {
                      backgroundColor: Color.accentColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2,
                      margin: 5,
                      width: 150,
                      height: 50,
                      flexDirection: 'row'
                    }]}
                      onPress={() => {
                        Alert.alert(
                          'Confirm Order',
                          'Are you sure to order this ?',
                          [
                            {
                              text: 'No',
                              style: 'cancel',
                            },
                            {
                              text: 'Yes', onPress: () => {
                                this.aksiConfirm(this.props.Transaction.dataItem.id)
                              }
                            },
                          ],
                          { cancelable: false },
                        );
                      }}
                    >
                      <IconOctic name='checklist' color={Color.whiteColor} size={23} style={{
                        marginRight: 10
                      }}></IconOctic>
                      <Text style={[Styles.hurufKonten, {
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: Color.whiteColor
                      }]}>
                        CONFIRM
                    </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[Styles.cardSimpleContainer, {
                      backgroundColor: Color.accentColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 2,
                      margin: 5,
                      width: 150,
                      height: 50,
                      flexDirection: 'row'
                    }]}
                      onPress={() => {
                        this.props.navigation.navigate('ScreenViewbill')
                      }}
                    >
                      <IconOctic name='list-ordered' color={Color.whiteColor} size={23} style={{
                        marginRight: 10
                      }}></IconOctic>
                      <Text style={[Styles.hurufKonten, {
                        fontSize: 15,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: Color.whiteColor
                      }]}>
                        VIEW BILL
                    </Text>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1
                  }}>
                    <Image
                      source={require('../../assets/Illustrator/not-found.png')}
                      style={{ width: 400, height: 400 }}
                    ></Image>
                    <Text style={[Styles.hurufKonten, {
                      fontSize: 20,
                      fontWeight: 'bold'
                    }]}
                    >List order not found</Text>
                    <Text style={[Styles.hurufKonten, {

                    }]}
                    >Please order the menu item </Text>
                  </View>
              )}
            />
          }
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
export default connect(mapStateToProps)(ScreenCart)