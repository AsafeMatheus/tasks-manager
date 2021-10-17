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
        .onSnapshot((myGroupsInformation) => {
            const listOfGroupsInformations : any = []
            let listOfGroups : any = []

            myGroupsInformation.forEach((oneGroupInformation) => {
                const groupInformationData = oneGroupInformation.data()

                listOfGroupsInformations.push({
                    groupId: groupInformationData.groupId,
                    removed: groupInformationData?.removed ? true : false
                })
            })

            listOfGroupsInformations.forEach((groupInformation : any) => {
                firebase.firestore().collection('groups')
                .doc(groupInformation.groupId)
                .get()
                .then((response) => {
                    listOfGroups = [
                        ...listOfGroups, 
                        {
                            id: response.id,
                            removed: groupInformation.removed,
                            ...response.data()
                        }
                    ]

                    setGroups(listOfGroups)
                }).catch(() => null)
            })
        })
    }

    useEffect(() => {
        /*if (route.params?.justUpdate){
            getGroups()
        }*/

        console.log('1) useEffect is working.')
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
                                navigation.navigate(item?.removed ? 
                                    'Removed' : 'GroupNavigation', 
                                    {
                                        groupId: item.id,
                                        load,
                                        setLoad
                                    }
                                )
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