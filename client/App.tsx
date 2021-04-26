import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Home } from './Components/Home';
import { Cram } from './Components/Cram';
import { Crammed } from './Components/Crammed';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './Services/ApiService';
import Topic from './Interfaces/Topic';
import HeaderBtn from './Components/HeaderBtn';

type RootParamList = {
  Home: { paramA:  string }
  Cram: { paramB: string }
  Crammed: { paramC: Topic }
}

const Root = createStackNavigator<RootParamList>();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
    <NavigationContainer>
      <Root.Navigator initialRouteName="Home" >
        <Root.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Root.Screen name="Cram" component={Cram} options={{ headerRight: () => <HeaderBtn/> }}/>
        <Root.Screen name="Crammed" component={Crammed} options={{ headerRight: () => <HeaderBtn/> }} />
      </Root.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  )
}