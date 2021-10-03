import React, { useState } from "react"
import { 
    TouchableOpacity,
    ImageBackground,
    Clipboard,
    View, 
    Text
} from "react-native"

import { useNavigation } from "@react-navigation/native"

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
    linkToTheGroup: string
}

export function GroupTabBar({
    name, 
    description, 
    image,
    groupId,
    linkToTheGroup
    } : Props){
    const navigation = useNavigation()

    const [optionsVisible, setOptionsVisible] = useState(false)

    const options = [
        {
            id: '1',
            title: 'Editar',
            function: () => {
                navigation.navigate('EditGroup', { groupId })
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
            function: () => setOptionsVisible(false)
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