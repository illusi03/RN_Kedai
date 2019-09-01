import React, { Component } from 'react'
import { View, ActivityIndicator,Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export default class StackCheck extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {
    try {
      const x = await AsyncStorage.getItem('noMeja');
      if (x != null) {
        this.props.navigation.navigate('StackPrivate')
      } else {
        this.props.navigation.navigate('StackPublic')
      }
    } catch (e) { 
      alert(e)
    }
  }
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={50} color="#0000ff" />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold'
        }}>HARAP TUNGGU...</Text>
      </View>
    )
  }
}