import React, { useState } from "react"
import {
    TouchableOpacity, 
    SafeAreaView,
    TextInput,
    Alert,
    View,
    Text
} from "react-native"

import firebase from '../../config/firebaseconfig'

import { Header } from "../../components/Header"

import { styles } from "./styles"

export function ForgotPassword(){
    const [email, setEmail] = useState('')

    const sendEmail = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert('Email enviado', 'enviamos um email de redefinição de senha para o endereço: ' + email),
            [{
                text: "ok",
                onPress: () => null
            }]
        }).catch((err) => {
            Alert.alert(err.message)
        })
    }

    const sendEmailToChangePassword = () => {
        Alert.alert('Enviar email', 'Ao clicar em ok um email para redefinir a senha será enviado para você', [
            {
                text: 'Cancelar',
                onPress: () => null,
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => sendEmail()
            }
        ])
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Nova senha'
            />

            <View style={styles.content}>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1} 
                    style={styles.title}
                >
                    Tasks manager
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setEmail(text)
                    }}
                    placeholder='Email'
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={sendEmailToChangePassword}
                >
                    <Text style={styles.buttonText}>Enviar email</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}