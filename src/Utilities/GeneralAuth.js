import React, { Component } from "react";
import { firebase } from "@react-native-firebase/auth";
import { View } from "react-native";
import { NavigationActions } from 'react-navigation'

class GeneralAuth extends Component{
    componentDidMount() {
        const navigator = this.props.navigation;
            firebase
            .auth()
            .signOut()
            .then(function() {
                navigator.dispatch(NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })]
                }))
            })
            .catch((error) => {
                console.log(error.toString(error));
            });  
        //}
      }
      render(){
          return(
              <View></View>
          );
      }
}

export default GeneralAuth;