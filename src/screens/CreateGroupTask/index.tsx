import React, { useState } from "react"
import { 
    KeyboardAvoidingView,
    SafeAreaView,
    Dimensions,
    StatusBar,
    Platform,
    View
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import firebase from '../../config/firebaseconfig'

import { InputWithLabel } from "../../components/InputWithLabel"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { adjust } from "../../global/functions"
import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function CreateGroupTask({ navigation, route } : any){
    const { groupId } = route.params

    const deviceHeight = Dimensions.get('window').height

    const [amountOfPeople, setAmountOfPeople] = useState(0)
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')

    const addTask = () => {
        const ref = firebase.firestore().collection('groups')
        .doc(groupId)
        
        ref.collection('group-tasks')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            amountOfPeople,
            title,
            date
        })

        navigation.navigate('GroupNavigation', {
            groupId
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios'? 'padding' : 'position'}
                style={styles.spacement}
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
                bannerSize={ deviceHeight > 600 ? "largeBanner" : "banner"}
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds 
                onDidFailToReceiveAdWithError={(err) => null}
                style={{
                    marginTop: deviceHeight > 600 ? adjust(35) : adjust(15)
                }}
            />

            <View style={styles.spacement}>
                <View style={styles.footer}>
                    <Button
                        title='Confirmar'
                        onPress={ addTask }
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}