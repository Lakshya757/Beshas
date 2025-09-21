import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import "@expo/metro-runtime";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Home from './pages/Home';
import About from './pages/About';
import Support from './pages/Support';


type RootStackParamsList={
  Home:undefined;
  About:undefined;
}

const Stack:any=createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'About'}
        screenOptions={{
          // animation: "fade",
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Support"
          component={Support}
          options={{ headerShown: false }}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
