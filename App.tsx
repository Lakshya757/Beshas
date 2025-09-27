import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import * as Font from 'expo-font'
import "@expo/metro-runtime";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './pages/Home';
import About from './pages/About';
import Support from './pages/Support';
import CustomDrawerContent from './components/CustomDrawerContent';

type RootStackParamsList = {
  Home: undefined;
  About: undefined;
  Support: undefined;
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Support"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#2C3540',
          width: 280,
        },
        drawerActiveTintColor: '#FCF4E3',
        drawerInactiveTintColor: 'rgba(252, 244, 227, 0.7)',
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerLabel: 'About Us',
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          drawerLabel: 'Support',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);


  // if (!fontsLoaded) {
  //   return <View><Text>Loading...</Text></View>;
  // }
  return (
    <NavigationContainer>
      <DrawerNavigator />
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