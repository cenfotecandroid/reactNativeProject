import React, { Component, useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Button, Image } from "react-native";
import { firebase } from "@react-native-firebase/auth";

class Home extends Component{      
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Home' : 'Login')
        })
      }
      
    SignOut = () =>{
        firebase
            .auth()
            .signOut()
            .then(function() {
                this.props.navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error.toString(error));
            });        
    }
    render(){        
        return(
            <View>
                <Button title = "Desloguear" onPress={() => this.SignOut()}></Button>
            </View>
        )
    }
}

export default Home