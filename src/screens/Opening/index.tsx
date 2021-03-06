import React, { useState, useEffect } from "react"
import { 
    ActivityIndicator,
    SafeAreaView, 
    Text,
    View
} from "react-native"

import firebase from "../../config/firebaseconfig"
import * as Linking from 'expo-linking'

import { Button } from "../../components/Button"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function Opening({navigation} : any){
    const [loading, setLoading] = useState(true)

    const handleMainNavigation = () => {
        navigation.navigate('MainNavigation')
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
            if (authUser) {
                await Linking.getInitialURL().then((ev) => {
                    if (ev){
                        let dataFromLinking = Linking.parse(ev)

                        if (!dataFromLinking.queryParams.group){
                            handleMainNavigation()
                        } else{
                            navigation.replace('GroupInvite', {
                                groupId: dataFromLinking.queryParams.groupId
                            })
                        }
                    } else{
                        handleMainNavigation()
                    }
                }).catch((err) => console.log('An error ocurred: ' + err))
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
                    navigation.navigate('SignIn', { justLogOut: false })
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