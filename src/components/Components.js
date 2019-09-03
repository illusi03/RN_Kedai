import React, { Component } from 'react'
import { View, TextInput, Button, Text } from 'react-native'

import { Styles, Color } from '../res/Styles'

export const CosEdit = (props) => {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }}>
      {props.label ?
        <Text style={[Styles.hurufKonten, { fontWeight: 'bold', marginRight: 5 }]}>{props.label}</Text>
        : false}
      <TextInput style={[{
        backgroundColor: Color.accentColor,
        color: Color.whiteColor,
        fontSize: 16,
        width: '100%',
        shadowColor: '#000000',
        shadowOffset: {
          height: 3,
          width: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderRadius: 3,
        elevation: 4
      }]}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
      >
      </TextInput>
    </View>
  )
}

export const CosButton = (props) => {
  return (
    <View>
      <Button style={{
        backgroundColor: Color.accentColor,
        color: Color.whiteColor,
        width: '100%',
        height: '100%',
        fontSize: 16
      }}
        onPress={props.onPress}
        title={props.label ? props.label : 'Button'}
      ></Button>
    </View>
  )
}