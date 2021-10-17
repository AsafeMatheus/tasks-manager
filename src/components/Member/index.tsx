import React, { useState, useEffect } from "react"
import { 
    TouchableOpacity,
    Alert,
    Image,
    View,
    Text,
} from "react-native"

import firebase from '../../config/firebaseconfig'

import { OptionsModal } from "../OptionsModal"

import { SimpleLineIcons } from '@expo/vector-icons'

import { styles } from "./styles"

type MemberProps = {
    creator: boolean,
    username: string,
    admin: boolean,
    image: string,
    id: string,
}

type Props = {
    deleteMember?: () => void,
    optionsButton?: boolean,
    data: MemberProps,
    isAdmin?: boolean,
    groupId?: string
}

export function Member({ 
        optionsButton = true,
        deleteMember, 
        isAdmin,
        groupId,
        data, 
    } : Props){
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [optionsModal, setOptionsModal] = useState(false)

    const memberReference = firebase.firestore().collection('groups')
    .doc(groupId)
    .collection('members')
    .doc(data.id)

    const makeOrDismissUserAdmin = () => {
        if (data.creator){
            Alert.alert(
                'Ação não permitida', 
                `${data.username} não pode ser removido da lista de admin, pois o usuario é o criador do grupo`
            )
        } else{
            memberReference
            .set({
                userId: data.id,
                admin: !data.admin
            })
        }
    }

    const removeUser = () => {
        Alert.alert('Remover membro', `Deseja mesmo remover ${data.username} do grupo?`, [
            {
                text: 'Não',
                onPress: () => null
            },
            {
                text: 'Sim',
                onPress: () => {
                    firebase.firestore().collection(data.id)
                    .doc('groups')
                    .collection('my-groups')
                    .doc(groupId)
                    .set({
                        groupId,
                        removed: true
                    })

                    memberReference.delete()
                }
            }
        ])
    }

    const adminOptions = [
        {
            id: '1',
            title: 'Remover membro',
            function: () => {
                removeUser()

                setOptionsModal(false)
            }
        },
        {
            id: '2',
            title: data.admin ? 'Remover de admin'  : 'Tornar admin',
            function: () => { 
                makeOrDismissUserAdmin()
                setOptionsModal(false)
            }
        },
        {
            id: '3',
            title: 'Cancelar',
            function: () => setOptionsModal(false)
        }
    ]

    useEffect(() => {
        const currentUserId = firebase.auth().currentUser?.uid

        if (currentUserId == data.id){
            setIsCurrentUser(true)
        }
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <Image 
                    style={styles.image}
                    source={{ uri: `data:image/jpeg;base64,${data.image}` }}
                />
                <View style={styles.informations}>
                    <Text style={styles.title}>
                        { data.username }
                    </Text>

                    {
                        data.admin ?
                        <View style={styles.adminBox}>
                            <Text style={styles.adminText}>
                                admin
                            </Text>
                        </View>
                        :
                        <View />
                    }
                </View>
            </View>

            {
                optionsButton && isCurrentUser == false && isAdmin ?
                <TouchableOpacity 
                    onPress={() => setOptionsModal(true)}
                >
                    <SimpleLineIcons name="options-vertical" size={24} color="black" />
                </TouchableOpacity>
                :
                <View />
            }

            <OptionsModal 
                visible={optionsModal}
                data={adminOptions}
                closeModal={() => setOptionsModal(false)}
            />
        </View>
    )
}