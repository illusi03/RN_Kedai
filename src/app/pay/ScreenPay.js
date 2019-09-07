import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, BackHandler, ScrollView } from 'react-native'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconIon from 'react-native-vector-icons/Ionicons'

import { hapusInterval } from '../../_actions/Home'
import { Styles, Color } from '../../res/Styles'
import AsyncStorage from '@react-native-community/async-storage';
import { getTransaction, editTransaction } from '../../_actions/Transaction'

class ScreenPay extends Component {
  state = {
    noMeja: 0,
    idTransaction: 0
  }
  getNoMeja = async () => {
    const idTransaction = await AsyncStorage.getItem('idTransaction')
    const noMeja = await AsyncStorage.getItem('noMeja')
    await this.setState({
      noMeja,
      idTransaction
    })
    await AsyncStorage.clear()
    this.backHandler = await BackHandler.addEventListener('hardwareBackPress', async () => {
      await BackHandler.exitApp();
      return true;
    });
  }
  componentDidMount() {
    this.getNoMeja()
  }
  componentWillUnmount() {
    this.props.dispatch(hapusInterval())
  }
  render() {
    return (
      <View style={[Styles.container, {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10
      }]}>
        <ScrollView style={{
          width: '100%'
        }}>
          <View style={[Styles.content, Styles.cardSimpleContainer, {
            backgroundColor: Color.whiteColor,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={[Styles.hurufKonten, {
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 5,
                flex: 1
              }]}>
                Payment Session</Text>
            </View>

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
                marginTop: 30,
                marginBottom: 5
              }]}>
                # {this.state.noMeja}
              </Text>
              <Text style={[Styles.hurufKonten, {
                fontSize: 17,
                fontWeight: 'bold',
                marginBottom: 5
              }]}>
                With Transaction ID : {this.state.idTransaction}
              </Text>
              <Text style={[Styles.hurufKonten, {
                fontSize: 17,
                fontWeight: 'bold',
                marginBottom: 5
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
                {this.props.Home.timerString}
              </Text>
              <TouchableOpacity style={[Styles.cardSimpleContainer,{
                backgroundColor:Color.darkPrimaryColor,
                width:100,
                height:50,
                justifyContent:'center',
                padding:10,
                marginTop:10
              }]}
              onPress={()=> BackHandler.exitApp()}
              >
                <Text style={[Styles.hurufKonten,{
                  textAlign:'center',
                  color:Color.whiteColor
                }]}> DONE </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    Home: state.Home
  }
}
export default connect(mapStateToProps)(ScreenPay)

/*
import React, { Component } from "react";
import { View, Text, BackHandler } from "react-native";
export default class componentName extends Component {
  constructor(props) {
    super(props); this.state = {};
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    BackHandler.exitApp();
    // works best when the goBack is async
    return true;
  };
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
*/