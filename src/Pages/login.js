import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, Button, Image } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import Spinner from 'react-native-loading-spinner-overlay';

const buttonColor = "#008577";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            passw: '',
            loading: false
        };
    }
    
    componentDidMount() {
        //Usuario Logueado
        firebase.auth().onAuthStateChanged(user => {
          if(user){
            this.props.navigation.navigate('Home');
          }    
        })
      }

    SignIn = (user, passw) => {
        if(user == '' || passw == ''){
            alert('Debe ingresar usuario y/o contraseña');
        } 
        else {
            //Loading Action
            this.setState({ loading: true });

            try {
                firebase
                    .auth()
                    // Generate a Firebase credential
                    .signInWithEmailAndPassword(user, passw)
                    .then(user => { 
                            //console.log(user);
                            this.props.navigation.navigate('Home');
                            
                            //After login reset state
                            this.setState({
                                user: '',
                                passw: '',
                                loading: false
                            });
                    })
                    .catch(error => {   
                        switch(error.code) {
                            case 'auth/invalid-email':
                                alert('Formato de correo inválido')
                                break;
                            case 'auth/user-not-found':
                                alert('Credenciales inválidas')
                                break;
                            case 'auth/wrong-password':
                                alert('Credenciales inválidas')
                                break;
                        }
                        this.setState({ loading: false });
                    })
            } catch (error) {
                console.log(error.toString(error));
                this.setState({ loading: false });
            }
        }
    };    

    render(){
        return(                
            <View style={styles.basicView}>
                <Spinner
                    visible={this.state.loading}
                    textContent={'Cargando...'}
                    textStyle={styles.loading}
                    overlayColor = "rgba(0, 0, 0, 0.8)"
                />
                <Image source={require('../Images/billWallet.png')} style={styles.basicImage}></Image>
                <Text style={styles.basicText}>E-mail</Text>
                <TextInput style={styles.basicInput} 
                    onChangeText ={(user) => this.setState({user})}
                    value={this.state.user}
                    placeholder="Ingrese aquí su e-mail"
                ></TextInput>
                <Text style={styles.basicText}>Contraseña</Text>
                <TextInput style={styles.basicInput}
                    onChangeText ={(passw) => this.setState({passw})}
                    value={this.state.passw}
                    secureTextEntry={true}
                    placeholder="Ingrese aquí su contraseña"
                ></TextInput>
                <View style={styles.basicButton}>
                    <Button title="Ingresar" color={buttonColor} onPress={() => this.SignIn(this.state.user, this.state.passw)}></Button>
                </View>
                <View style={styles.basicButton}>
                    <Button title="Registrarse" color={buttonColor} onPress={() => this.props.navigation.navigate('Register')}></Button>
                </View>
            </View>
    )} 
}

const styles = StyleSheet.create({
    basicView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        color: 'white',
        marginBottom: '10%',
        backgroundColor: '#E26550'
    },
    basicText: {
        fontSize: 20,
        textAlign: 'center',
        padding: 20,
    },
    basicInput: {
        borderWidth: 1,
        margin: 5,
        backgroundColor: '#fff'
     },
    basicButton: {
        marginTop: 20,
        marginRight: 21,
        marginLeft: 21,
     },
     basicImage: {
         width: '50%',
         height: '30%',
         alignSelf: 'center'
     },
     
     loading: {
        color: '#fff',
        fontSize: 20,
      }
});

export default Login