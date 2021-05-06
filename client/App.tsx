import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home } from "./Components/Home";
import { Cram } from "./Components/Cram";
import { Crammed } from "./Components/Crammed";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./Services/ApiService";
import Topic from "./Interfaces/Topic";
import HeaderBtn from "./Components/HeaderBtn";


type RootParamList = {
  Home: { paramA: string };
  Cram: { paramB: string };
  Crammed: { paramC: Topic };
};

const Root = createStackNavigator<RootParamList>();


export function AppWrapper () {
  return (
    <NavigationContainer>
        <Root.Navigator initialRouteName="Home">
          <Root.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Root.Screen
            name="Cram"
            component={Cram}
            options={{
              headerTintColor: "white",
              headerBackTitleStyle: {
                fontFamily: "Optima-Bold",
                color: "white",
              },
              headerStyle: { backgroundColor: "#1F1F1F" },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
                fontFamily: "Optima-Bold",
                fontSize: 22,
              },
              headerRight: () => <HeaderBtn />,
            }}
          />
          <Root.Screen
            name="Crammed"
            component={Crammed}
            options={{
              headerTintColor: "white",
              headerBackTitleStyle: {
                fontFamily: "Optima-Bold",
                color: "white",
              },
              headerStyle: { backgroundColor: "#1F1F1F" },
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
                fontFamily: "Optima-Bold",
                fontSize: 22,
              },
              headerBackTitle: "Back",
              headerTitle: "",
              headerRight: () => <HeaderBtn />,
            }}
          />
        </Root.Navigator>
      </NavigationContainer>
  );
};

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AppWrapper />
    </ApolloProvider>
  );
}
