import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import IconFa from 'react-native-vector-icons/FontAwesome5'
import IconAnt from 'react-native-vector-icons/AntDesign'

import { Styles, Color } from '../res/Styles'
import ScreenHome from '../app/home_private/ScreenHome'
import ScreenViewbill from '../app/viewbill/ScreenViewbill'
import ScreenCart from '../app/cart/ScreenCart'
import ScreenPay from '../app/pay/ScreenPay'

const SwitchBill = createSwitchNavigator({
  SWScreenCart:ScreenCart,
  SWScreenViewbill:ScreenViewbill,
  SWScreenPay:ScreenPay
},{
  initialRouteName:'SWScreenCart'
})

export default StackPrivate = createStackNavigator(
  {
    ScreenHome,
    ScreenViewbill,
    SwitchBill
  }, {
    initialRouteName: "ScreenHome",
    headerMode: 'none'
  }
);
