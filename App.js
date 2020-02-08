import React, { Component } from 'react';
import Login from "./src/Pages/login";
import { View, StyleSheet, SafeAreaView,ScrollView,Dimensions } from "react-native";

//Navigation
import {createAppContainer, DrawerItems} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

//Pages
import LoginScreen from './src/Pages/login';
import RegisterScreen from './src/Pages/register';
import HomeScreen from './src/Pages/home';
import BillScreen from './src/Pages/bill';

//General
import GeneralAuth from './src/Utilities/GeneralAuth';

const LoginStack = createStackNavigator(
  { 
    Login: LoginScreen,
    Register: RegisterScreen ,
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
    initialRouteName: 'Home',
  }
);

const AuthStack = createStackNavigator(
  { 
    Auth:GeneralAuth,
  },
  { 
    initialRouteName: 'Auth'
  }
);

const AddBill = createStackNavigator(
  { 
    Bill:BillScreen,
  },
  { 
    initialRouteName: 'Bill'
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Login: LoginStack,
    Home: AppStack,
    'Agregar Factura': AddBill,
    'Cerrar Sesion': AuthStack,
  },
  {
    drawerWidth: '40%',
    drawerBackgroundColor: '#E26550',
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({

})