import React, { useState } from "react"
import { 
    View, 
    Text, 
    Image,
    Clipboard,
    TouchableOpacity, 
    TouchableOpacityProps
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { OptionsModal } from "../OptionsModal"

import { SimpleLineIcons } from '@expo/vector-icons'

import { adjust } from "../../global/functions"
import { styles } from "./styles"

export type GroupProps = {
    id: string,
    name: string,
    amountOfPeople?: number,
    image: string,
    linkToTheGroup: string
}

type Props = TouchableOpacityProps & {
    data: GroupProps
}

export function Group({ data, ...rest } : Props){
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
                navigation.navigate('GroupMembers', {
                    groupId: data.id
                })
                setOptionsVisible(false)
            }
        },
        {
            id: '3',
            title: 'Copiar link',
            function: () => {
                Clipboard.setString(data.linkToTheGroup)
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
    ])

    return(
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} {...rest}>
                <View style={styles.leftContent}>
                    {
                        data.image == '' ?
                        <Image 
                            source={{ uri: 'https://i.dlpng.com/static/png/4806116-accounts-avatar-group-heads-human-humans-men-people-heads-of-people-png-512_512_preview.png' }}
                            style={styles.imageWithBorder}
                        />
                        :
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${data.image}` }}
                            style={styles.image}
                        />
                    }
                    
                    <View style={styles.information}>
                        <Text style={styles.title}>{ data.name }</Text>
                        <Text style={styles.members}>membros: {data.amountOfPeople}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOptionsVisible(!optionsVisible)}>
                <SimpleLineIcons name="options-vertical" size={adjust(30)} color="black" />
            </TouchableOpacity>

            <OptionsModal
                visible={optionsVisible}
                closeModal={() => {
                    setOptionsVisible(false)
                }}
                data={options}
            />
        </View>
    )
}