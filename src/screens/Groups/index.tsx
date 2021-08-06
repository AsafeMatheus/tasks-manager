import React, { useState, useEffect } from "react"
import { SafeAreaView, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { OptionsModal } from "../../components/OptionsModal"
import { AddButton } from "../../components/AddButton"
import { Divider } from "../../components/Divider"
import { Header } from "../../components/Header"
import { Group } from "../../components/Group"

import { styles } from "./styles"

export function Groups(){
    const navigation = useNavigation()

    const [optionsVisible, setOptionsVisible] = useState(false)

    const [options, setOptions] = useState([
        {
            id: '1',
            title: 'Editar',
            function: () => {
                navigation.navigate('EditGroup')
                setOptionsVisible(false)
            }
        },
        {
            id: '2',
            title: 'Membros',
            function: () => {
                navigation.navigate('GroupMembers')
                setOptionsVisible(false)
            }
        },
        {
            id: '3',
            title: 'Copiar link',
            function: () => setOptionsVisible(false)
        },
        {
            id: '4',
            title: 'Sair',
            function: () => setOptionsVisible(false)
        },
        {
            id: '5',
            title: 'Cancelar',
            function: () => setOptionsVisible(false)
        }
    ])

    const [groups, setGroups] : any = useState([])

    useEffect(() => {
        const userId = String(firebase.auth().currentUser?.uid)
        const reference = firebase.firestore().collection(userId)
        .doc('groups')
        .collection('my-groups')
        .orderBy('timestamp', 'desc')

        reference.onSnapshot((doc) => {
            let list: any = []

            doc.forEach((item) => {
                list.push({id: item.id, ...item.data()})
            })

            setGroups(list)
        })

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
                            openOptions={() => {
                                setOptionsVisible(true)
                            }}
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

            <OptionsModal
                visible={optionsVisible}
                closeModal={() => {
                    setOptionsVisible(false)
                }}
                data={options}
            />
        </SafeAreaView>
    )
}