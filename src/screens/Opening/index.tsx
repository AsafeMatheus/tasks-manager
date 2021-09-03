import React, { useState, useEffect } from "react"
import { 
    ActivityIndicator,
    SafeAreaView, 
    Text,
    View
} from "react-native"

import firebase from "../../config/firebaseconfig"

import { Button } from "../../components/Button"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function Opening({navigation} : any){
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('MainNavigation')
            } else{
                setLoading(false)
            }
        })

        return unsubscribe
    }, [])

    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size={50} color={theme.colors.highlight} />
            </View>
        )
    }else{

    return(
        <SafeAreaView style={styles.container}>
            <Text 
                adjustsFontSizeToFit
                numberOfLines={2}
                style={styles.title}
            >
                Bem vindo {'\n'}
                ao greate keeper
            </Text>

            <Button
                title='Entrar'
                onPress={() => {
                    navigation.navigate('SignIn', {justLogOut: false})
                }}
            />

            <Button
                dark={false}
                title='Cadastrar'
                onPress={() => {
                    navigation.navigate('SignUp')
                }}
            />
        </SafeAreaView>
    )
    }
}