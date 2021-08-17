import React, { useState } from "react"
import { 
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    StatusBar
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import firebase from '../../config/firebaseconfig'

import { InputWithLabel } from "../../components/InputWithLabel"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function CreateGroupTask({ navigation, route } : any){
    const { groupId } = route.params

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [amountOfPeople, setAmountOfPeople] = useState(0)

    const addTask = () => {
        const userId = String(firebase.auth().currentUser?.uid)

        const ref = firebase.firestore().collection(userId)
        .doc('groups')
        .collection('my-groups')
        .doc(groupId)
        
        ref.collection('group-tasks')
        .add({
            title,
            date,
            amountOfPeople,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        navigation.navigate('GroupNavigation', { groupId })
    }

    const verification = () => {
        let titleLength = title.length
        let dateLength = date.length

        if (titleLength == 0 || dateLength == 0){
            Alert.alert('Por favor, preencha todos os campos assima')
        } else{
            navigation.navigate('GroupNavigation')
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios'? 'padding' : 'position'}
            >
            <Header 
                title='Nova tarefa'
            />

            <InputWithLabel 
                title='Título'
                set={setTitle}
                placeholder='Fazer a maquete'
            />

            <InputWithLabel 
                title='Prazo'
                set={setDate}
                placeholder='20/07/2021'
            />

            <InputWithLabel 
                title='Quantidade de pessoas'
                set={setAmountOfPeople}
                placeholder='4'
            />
            </KeyboardAvoidingView>

            <AdMobBanner
                bannerSize="largeBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds 
                onDidFailToReceiveAdWithError={(err) => console.log(err)}
                style={styles.ad}
            />

            <View style={styles.footer}>
                <Button
                    title='Confirmar'
                    onPress={ addTask }
                />
            </View>
        </SafeAreaView>
    )
}