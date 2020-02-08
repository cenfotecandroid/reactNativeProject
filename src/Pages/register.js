import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, Button, Image } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import Spinner from 'react-native-loading-spinner-overlay';

const buttonColor = "#008577";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passw: '',
            loading: false
        };
    }

    Register = (email, passw) => {
        if(email == '' || passw == ''){
            alert('Por favor ingrese toda la información solicitada');
        } 
        else {
            this.setState({ loading: true });
            try {
                firebase
                    .auth()
                    // Generate a Firebase credential
                    .createUserWithEmailAndPassword(email, passw)
                    .then(email => { 
                            console.log(email);
                            this.props.navigation.navigate('Home');

                            //After signUp reset state
                            this.setState({
                                email: '',
                                passw: '',
                                loading: false,
                            });
                    })
                    .catch(error => {   
                        switch(error.code) {
                            case 'auth/invalid-email':
                                alert('Formato de correo inválido')
                                break;
                            case 'auth/email-already-in-use':
                                alert('Éste correo ya se encuentra registrado')
                                break;
                        }
                        this.setState({ loading: false });
                    })
            } catch (error) {
                console.log(error.toString(error));
                this.setState({ loading: false });
            }
        }
    }
    
    render(){
        return(
            <View style={styles.basicView}>
                 <Spinner
                    visible={this.state.loading}
                    textContent={'Cargando...'}
                    textStyle={styles.loading}
                    overlayColor = "rgba(0, 0, 0, 0.8)"
                />
                <Text style={styles.basicText}>Correo</Text>
                <TextInput style={styles.basicInput} 
                    onChangeText ={(email) => this.setState({email})}
                    value={this.state.email}
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
                    <Button title="Crear Usuario" color={buttonColor} onPress={() => this.Register(this.state.email, this.state.passw)}></Button>                   
                </View>
            </View>
    )} 
}

const styles = StyleSheet.create({
    basicView: {
        flex: 1,
        justifyContent: 'flex-start',
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
     loading: {
        color: '#fff',
        fontSize: 20,
      }
});

export default Register