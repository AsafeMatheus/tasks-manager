import React, { useState } from "react"
import { 
    SafeAreaView,
    FlatList
} from "react-native"

import {
    AdMobBanner,
    setTestDeviceIDAsync
} from 'expo-ads-admob'

import { Header } from "../../components/Header"
import { Member } from "../../components/Member"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function GroupMembers(){
    const [members, setMembers] = useState([
        {
            id: '1',
            username: 'Asafe Matheus',
            image: 'https://www.github.com/AsafeMatheus.png'
        },
        {
            id: '2',
            username: 'Renan Pereira',
            image: 'https://www.github.com/r3nanp.png'
        },
        {
            id: '3',
            username: 'Gabrielle Lima',
            image: 'https://www.github.com/gabizinha12.png'
        },
        {
            id: '4',
            username: 'Daniel Alves',
            image: 'https://www.github.com/danielins.png'
        },
        {
            id: '5',
            username: 'Matheus Baron',
            image: 'https://www.github.com/matheusbr1.png'
        },
        {
            id: '6',
            username: 'Rafaella Ballerini',
            image: 'https://www.github.com/rafaballerini.png'
        },
        {
            id: '7',
            username: 'Ika',
            image: 'https://www.github.com/ikatyang.png'
        },
        {
            id: '8',
            username: 'Evan You',
            image: 'https://www.github.com/yyx990803.png'
        },
        {
            id: '9',
            username: 'Ka-Ying Yvonne Yip',
            image: 'https://www.github.com/morethanreal.png'
        },
    ])

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Turma de inglês'
            />

            <AdMobBanner
                bannerSize="banner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds 
                onDidFailToReceiveAdWithError={(err) => console.log(err)}
                style={styles.ad}
            />

            <FlatList 
                data={members}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return(
                        <Member 
                            data={item} 
                        />
                    )
                }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}