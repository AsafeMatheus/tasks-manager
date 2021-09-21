import React, { useState, useEffect } from "react"
import { 
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    View
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import firebase from '../../config/firebaseconfig'

import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { Member } from "../../components/Member"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function GroupInvite({ navigation, route } : any){
    const groupId = route.params.groupId

    const [groupName, setGroupName] = useState('')
    const [loading, setLoading] = useState(false)

    const [members, setMembers] : any = useState([])

    useEffect(() => {
        setLoading(false)

        firebase.firestore().collection('groups')
        .doc(String(groupId))
        .get()
        .then((response) => {
            setGroupName(response.data()?.name)
        }).catch((err) => console.log(err))

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
                        console.log(responseImage.data())
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

    const participate = () => {
        setLoading(true)

        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('groups')
        .collection('my-groups')
        .add({
            groupId
        })

        setTimeout(() => {
            navigation.navigate('MainNavigation', {
                screen: 'Grupos'
            })
        }, 3500)
    }


    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size={50} color={theme.colors.highlight} />
            </View>
        )
    }else{
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.spacement}>
                    <Header
                        title={groupName}
                    />
                </View>

                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" 
                    servePersonalizedAds 
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}
                    style={styles.ad}
                />

                <View style={styles.spacement}>
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
                </View>

                <View style={styles.footer}>
                    <Button
                        onPress={participate}
                        title='Participar'
                    />
                </View>
            </SafeAreaView>
        )
    }
}