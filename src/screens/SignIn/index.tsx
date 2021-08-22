import React, { useState, useEffect } from "react"
import { 
    TouchableOpacity,
    SafeAreaView,
    BackHandler,
    TextInput,
    View,
    Text
} from "react-native"

import firebase from '../../config/firebaseconfig'

import { Foundation } from '@expo/vector-icons'

import { styles } from "./styles"

export function SignIn({ navigation, route } : any){
    const [errorLogin, setErrorLogin] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp()
            return true
        }

        if(route.params.justLogOut){
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            )
    
            return () => BackHandler.removeEventListener(
                "hardwareBackPress",
                backAction
            )
        }
    }, [])

    const signIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainNavigation' }]
           })
        })
        .catch((error) => {
            var errorMessage = error.message
            setErrorLogin(errorMessage)
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Entrar</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>
                    Tasks manager
                </Text>

                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setEmail(text)
                    }}
                    placeholder='Email'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setPassword(text)
                    }}
                    placeholder='Senha'
                    secureTextEntry
                />

                {
                    errorLogin 
                    ?
                    <View style={styles.alertContainer}>
                        <Foundation name="alert" size={24} color="#bdbdbd" />
                        <Text style={styles.alertText}>Email ou senha inválido</Text>
                    </View>
                    :
                    <View />
                }

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signIn()}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerLeftText}>Não possui uma conta ainda? </Text>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                    >
                        <Text style={styles.link}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}