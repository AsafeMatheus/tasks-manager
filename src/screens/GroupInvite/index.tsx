import React, { useState, useEffect } from "react"
import { 
    ActivityIndicator,
    SafeAreaView,
    FlatList,
    Alert,
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

    const [alreadyAMember, setAlreadyAMember] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [loading, setLoading] = useState(false)

    const [members, setMembers] : any = useState([])

    const myGroupsReference = firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
    .doc('groups')
    .collection('my-groups')

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
                        listOfMembers.push({
                            id: memberId.data()?.userId,
                            username: responseUsername.data()?.username,
                            image: responseImage.data()?.avatar,
                            admin: memberId.data()?.admin 
                        })

                        setMembers(listOfMembers)
                    })
                })
            })

            myGroupsReference.onSnapshot((myGroups) => {
                myGroups.forEach((myGroup) => {
                    let myGroupId = myGroup.data().groupId

                    if (groupId == myGroupId){
                        setAlreadyAMember(true)
                    }
                })
            })

        })
    }, [])

    const participate = () => {
        if (alreadyAMember){
            Alert.alert(`${groupName}`, 'Você já faz parte desse grupo. Deseja ir para página de grupos', [
                {
                    text: 'sim',
                    onPress: () => {
                        navigation.navigate('MainNavigation', {
                            screen: 'Grupos'
                        })
                    }
                },
                {
                    text: 'não',
                    onPress: () => null
                }
            ])
        } else{
            setLoading(true)

            myGroupsReference
            .add({
                groupId
            })

            firebase.firestore().collection('groups')
            .doc(groupId)
            .collection('members')
            .doc(String(firebase.auth().currentUser?.uid))
            .set({
                userId: String(firebase.auth().currentUser?.uid),
                admin: false,
                creator: false
            })

            setTimeout(() => {
                navigation.navigate('MainNavigation', {
                    screen: 'Grupos'
                })

                setLoading(false)
            }, 3500)
        }
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
                        goBackFunction={() => {
                            navigation.navigate('MainNavigation')
                        }}
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
                                    optionsButton={false}
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