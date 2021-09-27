import React, { useState, useEffect } from "react"
import { 
    SafeAreaView, 
    FlatList, 
    View 
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import { globalFunctions } from "../../global/functions"
import firebase from '../../config/firebaseconfig'

import { CompletedTask } from "../../components/CompletedTask"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function Concluded(){
    const [ finishedTasks, setFinishedTasks ] : any = useState([])

    useEffect(() => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('concluded-tasks')
        .collection('concluded-list')
        .orderBy('timestamp', 'desc')
        .onSnapshot((query) => {
            const list : any = []

            query.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            })

            setFinishedTasks(list)
        })
    }, [])

    const deleteOneTask = (index:any) => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('concluded-tasks')
        .collection('concluded-list')
        .doc(index.id).delete()
    }

    const deleteEverything = () => {
        globalFunctions.handleInterstitialAd()

        const ref = firebase.firestore()
        .collection(String(firebase.auth().currentUser?.uid))
        .doc('concluded-tasks')
        .collection('concluded-list')

        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('concluded-tasks')
        .collection('concluded-list')
        .get()
        .then(res => {
            res.forEach((doc) => {
                ref.doc(doc.id).delete()
            })
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header
                    title='concluido'
                />
            </View>

            <AdMobBanner
                bannerSize="smartBannerLandscape"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds 
                onDidFailToReceiveAdWithError={(err) => null}
                style={styles.ad}
            />

            <View style={styles.content}>
                <FlatList
                    data={finishedTasks}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return (
                            <CompletedTask
                                title={item.title}
                                onPress={() => deleteOneTask(item)}
                            />
                        )
                    }}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                />
                
                <Button
                    title='Apagar tudo'
                    onPress={deleteEverything}
                />
            </View>
        </SafeAreaView>
    )
}