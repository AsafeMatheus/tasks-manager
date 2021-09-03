import React, { useState, useEffect } from "react"
import { SafeAreaView, FlatList, Alert } from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { AddButton } from "../../components/AddButton"
import { Divider } from "../../components/Divider"
import { Header } from "../../components/Header"
import { Group } from "../../components/Group"

import { styles } from "./styles"

export function Groups(){
    const navigation = useNavigation()

    const [groups, setGroups] : any = useState([])
    const [groupsIdsState, setGroupsIdsState] = useState([])

    useEffect(() => {
        const userId = String(firebase.auth().currentUser?.uid)

        firebase.firestore().collection(userId)
        .doc('groups')
        .collection('my-groups')
        .onSnapshot((myGroupsIds) => {
            const listOfGroupsIds : any = []

            myGroupsIds.forEach((oneGroupId) => {
                firebase.firestore().collection('groups')
                .doc(oneGroupId.data().groupId)
                .get()
                .then((response) => {
                    listOfGroupsIds.push({
                        id: oneGroupId.data().groupId,
                        ...response.data()
                    })
                })
                .catch((err) => console.log(err))
            })

            setGroups(listOfGroupsIds)
        })
    }, [])

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title={groups.length}
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
                                    creatorId: 'sdfsd'
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