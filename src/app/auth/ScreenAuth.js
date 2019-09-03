import React, { Component } from 'react'
import { View, Text, Button, Image,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'

import { Styles, Color } from '../../res/Styles'
import { CosEdit, CosButton } from '../../components/Components'
import { addTransaction } from '../../_actions/Transaction'

class ScreenLogin extends Component {
  state = {
    textTblNumber: '',
    isLoading: false
  }
  aksiChangeText = (text) => {
    this.setState({
      textTblNumber: text
    })
  }
  aksiSubmit = async () => {
    await this.setState({
      isLoading:true
    })
    if (this.state.textTblNumber != '') {
      await AsyncStorage.setItem('noMeja', `${this.state.textTblNumber}`)
      //Tambah Data table transaction (Just a tableNumber)
      await this.props.dispatch(addTransaction({
        tableNumber: this.state.textTblNumber,
        isPaid: false
      }))
      await this.setState({
        isLoading: this.props.Transaction.isLoading
      })
      await AsyncStorage.setItem('idTransaction', `${this.props.Transaction.dataItem.data.id}`)
      await this.props.navigation.navigate('StackPrivate')
    } else {
      alert('Masukan Nomor Meja Terlebih Dahulu')
      await this.setState({
        isLoading: false
      })
    }
  }
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
          height: 250,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }]}>
          <View style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderColor: Color.darkPrimaryColor,
            top: -50,
          }}>
            <Image source={require('../../assets/Icon/logo_login.png')} style={{ width: '100%', height: '100%' }}></Image>
          </View>
          <Text style={[Styles.hurufKonten, {
            fontSize: 18,
            fontWeight: 'bold',
          }]}>Please enter table number </Text>
          <View style={{ width: '50%', marginTop: 10 }}>
            <CosEdit
              label='Table Num'
              placeholder='Enter table '
              keyboardType='numeric'
              onChangeText={this.aksiChangeText}
            />
          </View>
          <View style={{ width: '80%', marginTop: 10, flexDirection: 'row' }}>
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              {this.state.isLoading ?
                <ActivityIndicator
                  size={18}
                ></ActivityIndicator>
                :
                <CosButton label='Submit' onPress={this.aksiSubmit} />
              }
            </View>
          </View>

        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Transaction: state.Transaction
  }
}

export default connect(mapStateToProps)(ScreenLogin)