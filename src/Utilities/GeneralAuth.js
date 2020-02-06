import React, { Component } from "react";
import { firebase } from "@react-native-firebase/auth";
import { View } from "react-native";

class GeneralAuth extends Component{
    componentDidMount() {
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
              <View></View>
          );
      }
}

export default GeneralAuth;