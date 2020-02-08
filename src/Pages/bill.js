import React, { Component,useState, useEffect } from "react";
import { 
  Text, 
  View, 
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Link,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as actions from '../actions/action-type';
import {connect} from 'react-redux';
import { firebase } from "@react-native-firebase/auth";
import { firestore } from '@react-native-firebase/firestore';
import LogoTitle from './logo';
import logo from '../Images/back-arrow.png';

class Bill extends Component{

  constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('facturas');
        this.state = {
          loading: true,
          factura: {}
        };
    }

  componentDidMount(){
      this.setState({ loading: false });
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'Login')
      })
    }
    render(){
      const {loading} = this.state;

      if (loading) {
        return(
        <View style={styles.container}>
          <ActivityIndicator size="small" />
        </View>);
      }else{

       return(
        <View style={styles.container}>
            <View style={styles.item}>
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                placeholder = "Monto Pagado" 
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                placeholder = "Nombre del Negocio" 
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => onChangeText(text)}
                placeholder="Ingrese la fecha"
            />
            </View>
        </View>
       );
      }
    }

    //Top Bar Style inside component
    
static navigationOptions = ({ navigation }) => {    
    return {
        headerTitle: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Home")} >
         <Image source={logo} style={{width: 30, height: 30}}></Image>
       </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#E26550',
        },
        headerRight: () => (
          <Text style={styles.basicLink} onPress={() => navigation.navigate('Login')}>Cerrar Sesion</Text>
        ),
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    };
    }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent:'center',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    width: 179,
    height: 89,
    marginLeft: 8,
    marginBottom: 8,
  },
  textInput: {
    display: 'flex',
    flexDirection: 'column',
    height: 40, 
    borderColor: 'gray',
    marginBottom: 12,
    borderWidth: 1,
  },
  itemText1: {
    display: 'flex',
    textAlign: 'left',
    color: 'black',
    padding: 0,
    fontSize: 17,
    fontFamily: 'roboto-bold',
  },
  basicfloating: {
    backgroundColor: '#008577',
    color: '#008577',
  },
  basicLink: {
    color: "#008577",
    marginRight: 13
  },
  basicImage: {
    width: '50%',
    height: '50%',
    alignSelf: 'stretch'
  }
});


export default Bill;