import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from './Screens/Home';
import { Screen2 } from './Screens/screen2';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

type RootParamList = {
  Home: { paramA:  string }
  Screen2: { paramB: string }
}

const Root = createStackNavigator<RootParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home" >
        <Root.Screen name="Home" component={Home} />
        <Root.Screen name="Screen2" component={Screen2} />
      </Root.Navigator>
    </NavigationContainer>
  )
}