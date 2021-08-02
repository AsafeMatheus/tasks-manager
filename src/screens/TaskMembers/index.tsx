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

export function TaskMembers({navigation, route} : any){
    const [members, setMembers] = useState(route.params.data)

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title={route.params.title}
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