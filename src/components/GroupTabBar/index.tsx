import React, { useState } from "react"
import { 
    TouchableOpacity,
    ImageBackground,
    Clipboard,
    Alert,
    View, 
    Text
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { OptionsModal } from "../OptionsModal"

import { SimpleLineIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = {
    name: string,
    description: string,
    image: string,
    groupId: string, 
    linkToTheGroup: string,
    load: boolean,
    setLoad: any
}

export function GroupTabBar({
    name, 
    description, 
    image,
    groupId,
    linkToTheGroup,
    load,
    setLoad
    } : Props){
    const navigation = useNavigation()

    const [optionsVisible, setOptionsVisible] = useState(false)

    const userId = String(firebase.auth().currentUser?.uid)
    const myGroupsReference = firebase.firestore().collection(userId)
    .doc('groups')
    .collection('my-groups')

    const exitGroup = () => {
        const groupReference = firebase.firestore().collection('groups')
        .doc(groupId)

        myGroupsReference
        .doc(groupId)
        .delete()

        groupReference.collection('members').get().then(snap => {
            const groupMembersLength = snap.size

            groupReference
            .collection('members')
            .doc(userId)
            .delete()

            if (groupMembersLength == 1){
                groupReference.delete()
            }
        })

        setOptionsVisible(false)
        setLoad(!load)
        navigation.navigate('Grupos')
    }

    const askIfTheUserWantsToExit = () => {
        Alert.alert(`Sair`, `Você realmente deseja sair de ${name}`, [
            {
                text: 'Não',
                onPress: () => setOptionsVisible(false)
            },
            {
                text: 'Sim',
                onPress: () => exitGroup()
            }
        ])
    }

    const options = [
        {
            id: '1',
            title: 'Editar',
            function: () => {
                navigation.navigate('EditGroup', { 
                    groupId,
                    load,
                    setLoad
                })
                setOptionsVisible(false)
            }
        },
        {
            id: '2',
            title: 'Membros',
            function: () => {
                navigation.navigate('GroupMembers', {
                    groupId
                })
                setOptionsVisible(false)
            }
        },
        {
            id: '3',
            title: 'Copiar link',
            function: () => {
                Clipboard.setString(linkToTheGroup)
                setOptionsVisible(false)
            }
        },
        {
            id: '4',
            title: 'Sair',
            function: () => askIfTheUserWantsToExit()
        },
        {
            id: '5',
            title: 'Cancelar',
            function: () => setOptionsVisible(false)
        }
    ]

    return(
        <>
        <View style={styles.container}>
            <ImageBackground
                source={{uri: `data:image/jpeg;base64,${image}` }}
                style={styles.image}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('Grupos')}>
                        <AntDesign name="arrowleft" size={24} color={theme.colors.heading} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
                        <SimpleLineIcons name="options-vertical" size={24} color={theme.colors.heading} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {name}
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
            </ImageBackground>
        </View>

        <OptionsModal
                visible={optionsVisible}
                closeModal={() => {
                    setOptionsVisible(false)
                }}
                data={options}
            />
        </>
    )
}