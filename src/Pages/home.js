import React, { Component } from "react";
import { 
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

const buttonColor = "#008577";

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

    //Top Bar Style inside component
    
static navigationOptions = ({ navigation }) => {    
    return {
        headerTitle: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.openDrawer()} >
         <Image source={logo} style={{width: 30, height: 30}}></Image>
       </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#E26550',
        },
        headerRight: () => (
          <Button style={styles.basicButton} color={buttonColor} title = "Cerrar Sesion" onPress={() => navigation.navigate('Auth')}></Button>
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
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    width: 179,
    height: 89,
    marginLeft: 8,
    marginBottom: 8,
  },
  itemText1: {
    textAlign: 'auto',
    color: 'black',
    padding: 0,
    fontSize: 17,
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