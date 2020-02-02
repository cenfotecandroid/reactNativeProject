import React, { Component } from 'react';
import Login from "./src/Pages/login";
import { View,StyleSheet, SafeAreaView,ScrollView,Dimensions } from "react-native";

//Navigation
import {createAppContainer, DrawerItems} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

//Pages
import LoginScreen from './src/Pages/login';
import RegisterScreen from './src/Pages/register';
import HomeScreen from './src/Pages/home';

const LoginStack = createStackNavigator(
  { 
    Login: LoginScreen, 
    Register: RegisterScreen 
  },
  { 
    initialRouteName: 'Login'
  }
);

const AppStack = createStackNavigator(
  { 
    Home: HomeScreen, 
  },
  { 
    initialRouteName: 'Home'
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Login: LoginStack,
    Home: AppStack,
  },
  {
    initialRouteName: "Login"
  }
);
  
export default createAppContainer(AppNavigator);