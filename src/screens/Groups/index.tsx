import React, { useState, useEffect } from "react"
import { 
    ActivityIndicator,
    SafeAreaView, 
    FlatList,
    View 
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { AddButton } from "../../components/AddButton"
import { Divider } from "../../components/Divider"
import { Header } from "../../components/Header"
import { Group } from "../../components/Group"

import { theme } from '../../global/styles/theme'
import { styles } from "./styles"

export function Groups({ route } : any){
    const navigation = useNavigation()

    const userId = String(firebase.auth().currentUser?.uid)

    const [load, setLoad] = useState(false)

    const [groups, setGroups] : any = useState([])

    function getGroups(){
        setGroups([])

        firebase.firestore().collection(userId)
        .doc('groups')
        .collection('my-groups')
        .onSnapshot((myGroupsIds) => {
            const listOfGroupsIds : any = []
            let listOfGroups : any = []

            myGroupsIds.forEach((oneGroupId) => {
                listOfGroupsIds.push(oneGroupId.data().groupId)
            })

            listOfGroupsIds.forEach((groupId : any) => {
                firebase.firestore().collection('groups')
                .doc(groupId)
                .get()
                .then((response) => {
                    listOfGroups = [
                        ...listOfGroups, 
                        {
                            id: response.id,
                        ...response.data()
                        }
                    ]

                    setGroups(listOfGroups)
                }).catch(() => null)
            })
        })
    }

    if (route.params?.justUpdate){
        getGroups()
    }

    useEffect(() => {
        getGroups()
    }, [])

    useEffect(() => {
        getGroups()
    }, [load])

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
                            setLoad={setLoad}
                            load={load}
                            onPress={() => {
                                navigation.navigate('GroupNavigation', {
                                    groupId: item.id
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