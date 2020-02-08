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
import LogoTitle from './logo';
import logo from '../Images/back-arrow.png';
import ImagePicker from 'react-native-image-picker';
import { firebase } from "@react-native-firebase/auth";

class BillInfo extends Component{

  constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('facturas');
        this.state = {
          loading: true,
          factura: {},
          filePath: "",
          fileData: {},
          fileUri: ""
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
      const monto = this.props.navigation.getParam('monto','N/A');
        const fechaCompra = this.props.navigation.getParam('fechaCompra','N/A').toString();
        const negocio = this.props.navigation.getParam('negocio','N/A');

      if (loading) {
        return(
        <View style={styles.container}>
          <ActivityIndicator size="small" />
        </View>);
      }else{

       return(
        <View style={styles.container}>
            <View style={styles.item}>
            <Text style={styles.textInput}>Monto de la compra: {monto}</Text>
            <Text style={styles.textInput}>Fecha en que se compro: {fechaCompra}</Text>
            <Text style={styles.textInput}>Negocio responsable de garantia: {negocio}</Text>
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
    alignItems: 'flex-start',
    alignContent:'flex-start',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 8,
    marginBottom: 8,
  },
  textInput: {
    display: 'flex',
    flexDirection: 'column',
    height: 40, 
    fontSize: 17,
    flexWrap: 'wrap',
    fontFamily: 'roboto-bold',
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
  },
  uploadAvatar: {
    width: 50,
    height: 50,
    alignSelf: 'stretch'
  }
});


export default BillInfo;