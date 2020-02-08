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
import ImagePicker from 'react-native-image-picker';

class Bill extends Component{

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
            <Button
              onPress={() => this.showTakePhoto()}
              title="Take Photo"
            />
            <Button
              onPress={() => this.uploadPhoto()}
              title="Upload Photo"
            />
            </View>
        </View>
       );
      }
    }

uploadPhoto=()=>{
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response.data));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

showTakePhoto = () =>{
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
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
  },
  uploadAvatar: {
    width: 50,
    height: 50,
    alignSelf: 'stretch'
  }
});

function mapStateToProps(state){
    return{
        users: state.user.userList
    };
}

function mapDispatchToProps(dispatch){
    return{
        getUsers: () => dispatch(actions.getUsers()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Bill);