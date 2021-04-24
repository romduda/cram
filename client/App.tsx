import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from './Components/Home';
import { Cram } from './Components/Cram';
import { Result } from './Components/Result';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client/react';
import { cramToApi, apolloClient } from './Services/ApiService';
import { Button } from 'react-native'
import Topic from './Interfaces/Topic';
import HeaderBtn from './Components/HeaderBtn';

type RootParamList = {
  Home: { paramA:  string }
  Cram: { paramB: string }
  Result: { paramC: Topic }
}

const Root = createStackNavigator<RootParamList>();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home" >
        <Root.Screen name="Home" component={Home}/>
        <Root.Screen name="Cram" component={Cram} options={{ headerRight: () => <HeaderBtn/> }}/>
        <Root.Screen name="Result" component={Result} options={{ headerRight: () => <HeaderBtn/> }} />
      </Root.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  )
}