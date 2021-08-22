import React, { useState, useEffect } from "react"
import { SafeAreaView, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'
import * as Linking from 'expo-linking'

import { AddButton } from "../../components/AddButton"
import { Divider } from "../../components/Divider"
import { Header } from "../../components/Header"
import { Group } from "../../components/Group"

import { styles } from "./styles"

export function Groups(){
    const navigation = useNavigation()

    const [groups, setGroups] : any = useState([])

    useEffect(() => {
        const userId = String(firebase.auth().currentUser?.uid)
        const reference = firebase.firestore().collection(userId)
        .doc('groups')
        .collection('my-groups')

        const mainFunction = () => {
            reference.orderBy('timestamp', 'desc')
            .onSnapshot((doc) => {
                let list: any = []

                doc.forEach((item) => {
                    if (!item.data().linkToTheGroup){
                        let linkToTheGroup = Linking.createURL('exp://192.168.15.7:19000', {
                            queryParams:{
                                groupId: item.id,
                                groupCreator: item.data().creator
                            }
                        })

                        reference.doc(item.id)
                        .set({
                            ...item.data(),
                            linkToTheGroup
                        })
                    }

                    list.push({ id: item.id, ...item.data() })
                })

                setGroups(list)
            })
        }

        return mainFunction()
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Grupos'
                action={
                    <AddButton
                        onPress={() => navigation.navigate('CreateGroup')} 
                    />
                }
            />

            <FlatList
                data={groups}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return(
                        <Group
                            data={item}
                            onPress={() => {
                                navigation.navigate('GroupNavigation', {
                                    groupId: item.id,
                                    creatorId: item.creator
                                })
                            }}
                        />
                    )
                }}
                ItemSeparatorComponent={Divider}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}