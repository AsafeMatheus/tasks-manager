import React, { useState } from "react"
import { 
    View,
    Image,
    Text,
    TouchableOpacity
} from "react-native"

import { OptionsModal } from "../OptionsModal"

import { SimpleLineIcons } from '@expo/vector-icons'

import { styles } from "./styles"

type MemberProps = {
    id: string,
    username: string,
    image: string
}

type Props = {
    data: MemberProps,
    deleteMember?: () => void
}

export function Member({ data, deleteMember } : Props){
    const [optionsModal, setOptionsModal] = useState(false)

    const options = [
        {
            id: '1',
            title: 'Tirar membro',
            function: () => setOptionsModal(false)
        },
        {
            id: '2',
            title: 'Cancelar',
            function: () => setOptionsModal(false)
        }
    ]

    return(
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <Image 
                    style={styles.image}
                    source={{ uri: `data:image/jpeg;base64,${data.image}` }}
                />
                <Text style={styles.title}>
                    { data.username }
                </Text>
            </View>

            <TouchableOpacity 
                onPress={() => setOptionsModal(true)}
            >
                <SimpleLineIcons name="options-vertical" size={24} color="black" />
            </TouchableOpacity>

            <OptionsModal 
                visible={optionsModal}
                data={options}
                closeModal={() => setOptionsModal(false)}
            />
        </View>
    )
}