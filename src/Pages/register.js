import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet, Button, Image } from "react-native";

const buttonColor = "#008577";

class Register extends Component{
    render(){
        return(
            <View style={styles.basicView}>
                <Text style={styles.basicText}>Correo</Text>
                <TextInput style={styles.basicInput}></TextInput>
                <Text style={styles.basicText}>Usuario</Text>
                <TextInput style={styles.basicInput}></TextInput>
                <Text style={styles.basicText}>Contraseña</Text>
                <TextInput style={styles.basicInput}></TextInput>
                <View style={styles.basicButton}>
                    <Button title="Crear Usuario" color={buttonColor} onPress={() => this.props.navigation.navigate('Home')}></Button>
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
});

export default Register