import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from "react-navigation"
import IconFa from 'react-native-vector-icons/FontAwesome5'

import { Styles, Color } from '../res/Styles'
import ScreenHome from '../app/home/ScreenHome'
import ScreenAuth from '../app/auth/ScreenAuth'

export default StackPublic = createStackNavigator(
  {
    ScreenAuth:ScreenAuth
  }, {
    initialRouteName: "ScreenAuth",
    headerMode: 'none'
  }
);
