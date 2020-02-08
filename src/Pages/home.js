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
} from "react-native";
import * as actions from '../actions/action-type';
import {connect} from 'react-redux';
import { firebase } from "@react-native-firebase/auth";
import { firestore } from '@react-native-firebase/firestore';
import LogoTitle from './logo';
import logo from '../Images/ham-icon.png';

class Home extends Component{

  constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('facturas');
        this.unsubscribe = null;
        this.state = {
          loading: true,
          facturas: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const facturas = [];
        querySnapshot.forEach((doc) => {
          const { store, monto, imageName,fechaVencimiento } = doc.data();
          facturas.push({
            key: doc.id,
            doc,
            store, // DocumentSnapshot
            monto,
            imageName,
            fechaVencimiento,
          });
        });
        console.log(facturas);
        this.setState({
          facturas
      });
    }


  componentDidMount(){
      this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
          <ScrollView>
                {
                this.state.facturas.map(
                item => (
                <TouchableOpacity
                    key={item.key}
                    onPress={() => console.warn('Pressed')
                    }
                    >
                    <View style={styles.item}>
                    <Image 
                        source={require('../Images/icon-bill.jpg')}
                        style={styles.basicImage}
                    />
                    <Text style={styles.itemText1}>{item.store}</Text>
                    <Text style={styles.itemText1}>{item.monto}</Text>
                    </View>
                </TouchableOpacity>
                ))
                }
          </ScrollView>
          <TouchableOpacity
              style={
                  styles.floatingButton
                }
            >
            <Button color='#008577' title="Agregar facturas" onPress={() => this.props.navigation.navigate('Bill')}></Button>
          </TouchableOpacity>
        </View>
       );
      }
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'space-between',
    flexWrap: 'wrap',
  },
  containerFloating: {
    backgroundColor: '#fff',
    display: 'flex',
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    display: 'flex',
    textAlign: 'center',
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
  floatingButton: {
    color: "#fff",
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    alignContent: 'center',
    position: 'absolute',                                          
    bottom: 0,                                                    
    right: 20,
    left: 20,
    height:70,
    backgroundColor:'#fff',
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);