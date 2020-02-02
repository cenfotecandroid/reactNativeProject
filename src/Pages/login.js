import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, Button, Image } from "react-native";
import { firebase } from "@react-native-firebase/auth";

const buttonColor = "#008577";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            passw: ''
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
            try {
                firebase
                    .auth()
                    // Generate a Firebase credential
                    .signInWithEmailAndPassword(user, passw)
                    .then(user => { 
                            console.log(user);
                            this.props.navigation.navigate('Home') 
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
                    })
            } catch (error) {
                console.log(error.toString(error));
            }
        }
    };    

    render(){
        return(
            <View style={styles.basicView}>
                <Image source={require('../Images/billWallet.png')} style={styles.basicImage}></Image>
                <Text style={styles.basicText}>Email</Text>
                <TextInput style={styles.basicInput} 
                    onChangeText ={(user) => this.setState({user})}
                    value={this.state.user}
                    placeholder="Please insert your E-Mail"
                ></TextInput>
                <Text style={styles.basicText}>Contraseña</Text>
                <TextInput style={styles.basicInput}
                    onChangeText ={(passw) => this.setState({passw})}
                    value={this.state.passw}
                    secureTextEntry={true}
                    placeholder="Please insert your Password"
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
        marginTop: 20
     },
     basicImage: {
         width: '50%',
         height: '30%',
         alignSelf: 'center'
     }
});

export default Login