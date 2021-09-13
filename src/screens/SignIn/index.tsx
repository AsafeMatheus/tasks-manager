import React, { useState, useEffect } from "react"
import {
    TouchableOpacity,
    SafeAreaView,
    BackHandler,
    TextInput,
    Keyboard,
    View,
    Text
} from "react-native"

import firebase from '../../config/firebaseconfig'
import { adjust } from '../../global/functions/'

import { Foundation } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import { styles } from "./styles"

export function SignIn({ navigation, route } : any){
    const [hiddenPassword, setHiddenPassword] = useState(true)
    const [showHeader, setShowHeader] = useState(true)
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

        Keyboard.addListener("keyboardDidShow", () => {
            setShowHeader(false)
        })

        Keyboard.addListener("keyboardDidHide", () => {
            setShowHeader(true)
        })
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
            {
                showHeader ?
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Entrar</Text>
                </View>
                :
                <View />
            }

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

                <View style={styles.inputPassword}>
                    <TextInput
                        style={styles.textInputPassword}
                        onChangeText={text => {
                            setPassword(text)
                        }}
                        placeholder='Senha'
                        secureTextEntry={hiddenPassword}
                    />

                    <TouchableOpacity
                        onPress={() =>{
                            setHiddenPassword(!hiddenPassword)
                        }}
                    >
                        {
                            hiddenPassword ?
                                <Ionicons name="eye" size={adjust(24)} color="black" />
                            :
                                <Ionicons name="eye-off" size={adjust(24)} color="black" />
                        }
                    </TouchableOpacity>
                </View>

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
                    <Text 
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={styles.footerLeftText}
                    >
                        Não possui uma conta?{' '}
                    </Text>

                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate('SignUp')
                        }}
                    >
                        <Text
                            adjustsFontSizeToFit
                            numberOfLines={1} 
                            style={styles.link}
                        >
                            cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('ForgotPassword')
                    }}
                >
                    <Text style={styles.forgotPasswordText}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}