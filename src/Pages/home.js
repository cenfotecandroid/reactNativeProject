import React, { Component } from "react";
import { 
  ActivityIndicator, 
  Text, 
  View, 
  Image,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import * as actions from '../actions/action-type';
import {connect} from 'react-redux';
import { firebase } from "@react-native-firebase/auth";
import LogoTitle from './logo';
import logo from '../Images/ham-icon.png';

class Home extends Component{
  
    componentDidMount() {
      this.props.getUsers();
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'Home' : 'Login')
      })
    }
    render(){
       return(
            <View style={styles.container}>
              <View>
                {
                this.props.users.map(
                item => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => console.warn('Pressed')
                    }
                    >
                    <View style={styles.item}>
                    <Image 
                        source={require('../Images/icon-bill.jpg')}
                        style={styles.basicImage}
                    />
                        <Text style={styles.itemText1}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                ))
                }
                </View>
                <View>
                  
                </View>
            </View>
            
       );
    }

  
SignOut = () => {
      console.warn('cerrar session');
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

    //Top Bar Style inside component
    
static navigationOptions = ({ navigation }) => {
  
    return {
        headerTitle: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.openDrawer()} >
         <Image source={logo} style={{width: 30, height: 30}}></Image>
       </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#bf360c',
        },
        headerRight: () => (
          <Button style={styles.basicButton} title = "Cerrar Sesion" onPress={() => this.SignOut()}></Button>
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
    backgroundColor: '#fff',
    display: 'flex',
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    width: 179,
    height: 89,
    marginLeft: 8,
    marginBottom: 8,
  },
  itemText1: {
    textAlign: 'auto',
    color: 'black',
    padding: 20,
    fontSize: 13,
    fontFamily: 'roboto',
  },
  basicButton: {
    width: '10%',
    height: '10%',
    alignSelf: 'stretch'
  },
  basicImage: {
    width: '50%',
    height: '50%',
    alignSelf: 'stretch'
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);