import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from './Components/Home';
import { Cram } from './Components/Cram';
// import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client/react';
import { cramToApi, apolloClient } from './Services/ApiService';

type RootParamList = {
  Home: { paramA:  string }
  Cram: { paramB: string }
}

const Root = createStackNavigator<RootParamList>();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home" >
        <Root.Screen name="Home" component={Home} />
        <Root.Screen name="Cram" component={Cram} />
      </Root.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  )
}