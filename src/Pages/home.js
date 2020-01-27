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
import * as actions from '../actions/action-types';
import {connect} from 'react-redux';
//import firebase from 'react-native-firebase';

/*
const ReactNativeProject = firebase.initializeApp('REACTNATIVEPROJECT');

ReactNativeProject.onReady().then((app) => {
   // --- ready ---
   // use `app` arg, kittensApp var or `app('kittens')` to access modules
   // and their methods. e.g:
   firebase.app('REACTNATIVEPROJECT').auth().signInAnonymously().then((user) => {
       console.log('REACTNATIVEPROJECT user ->', user.toJSON());
   });
});


this.props.navigation.navigate("UserDetail",{
                    userId: item.id,
                    userName: item.name,
                    userLastName: item.username,
                    })
*/
class Home extends Component{

    componentDidMount(){
        this.props.getUsers();
    }
    

    render(){
       return(
            <View style={styles.container}>
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
                        source={require('../Images/icon-bill.png')}
                        style={styles.basicImage}
                    />
                        <Text style={styles.itemText1}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                ))
                }
            </View>
       );
    }

    //Top Bar Style inside component
static navigationOptions = ({ navigation }) => {
    return {
        title: 'Home',
        headerStyle: {
        backgroundColor: '#bf360c',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
    };
    }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#4f83cc',
    width: 179,
    height: 89,
    marginLeft: 8,
    marginBottom: 8,
  },
  itemText1: {
    textAlign: 'auto',
    color: 'white',
    padding: 20,
    fontSize: 13,
    fontFamily: 'roboto',
  },
  basicImage: {
    width: '10%',
    height: '10%',
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