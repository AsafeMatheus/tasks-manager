import React, { useState } from "react"
import { View, FlatList } from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import { globalFunctions } from "../../global/functions"

import { CompletedTask } from "../../components/CompletedTask"
import { Button } from "../../components/Button"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function GroupConcluded(){
    const [ finishedTasks, setFinishedTasks ] = useState([
        {
            id: '1',
            title: 'Lavar a louça'
        },
        {
            id: '2',
            title: 'Jogar o lixo fora'
        },
        {
            id: '3',
            title: 'Fazer café'
        },
        {
            id: '4',
            title: 'Enviar os relatórios'
        },
        {
            id: '5',
            title: 'comprar filtro'
        },
        {
            id: '6',
            title: 'comprar refri'
        },
        {
            id: '7',
            title: 'Vender rifa'
        },
    ])

    const deleteOneTask = (index:any) => {
        const finishedTasksCopy = [...finishedTasks]
        finishedTasksCopy.splice(finishedTasksCopy.indexOf(index), 1)
        setFinishedTasks(finishedTasksCopy)
    }

    return(
        <View style={styles.container}>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds 
                onDidFailToReceiveAdWithError={(err) => console.log(err)}
                style={styles.ad}
            />

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
                style={styles.content}
            />


            <View style={styles.footer}>
                <Button
                    title='Apagar tudo'
                    onPress={() => {
                        globalFunctions.handleInterstitialAd()
                        setFinishedTasks([])
                    }}
                />
            </View>
        </View>
    )
}