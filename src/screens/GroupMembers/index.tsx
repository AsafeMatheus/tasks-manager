import React, { useState, useEffect } from "react"
import { 
    SafeAreaView,
    FlatList
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import firebase from '../../config/firebaseconfig'

import { Header } from "../../components/Header"
import { Member } from "../../components/Member"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function GroupMembers({ route } : any){
    const { groupId } = route.params

    const [groupName, setGroupName] = useState('')
    const [members, setMembers] : any = useState([])

    useEffect(() => {
        firebase.firestore().collection('groups')
        .doc(String(groupId))
        .get()
        .then((response) => {
            setGroupName(response.data()?.name)
        }).catch((err) => null)

        firebase.firestore().collection('groups')
        .doc(String(groupId))
        .collection('members')
        .onSnapshot((membersOnGroup) => {
            const listOfMembers : any = []

            membersOnGroup.forEach((memberId) => {
                const reference = firebase.firestore().collection(memberId.data()?.userId)

                reference
                .doc('profile-image')
                .get()
                .then((responseImage) => {
                    reference
                    .doc('username')
                    .get()
                    .then((responseUsername) => {
                        listOfMembers.push({
                            id: memberId.data()?.userId,
                            username: responseUsername.data()?.username,
                            image: responseImage.data()?.avatar   
                        })

                        setMembers(listOfMembers)
                    })
                })
            })
        })
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title={groupName}
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