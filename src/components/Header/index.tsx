import React, {ReactNode} from "react"
import { View, Text, TouchableOpacity } from "react-native"

import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'

import { styles } from "./styles"

type Props = {
    title: string,
    action?: ReactNode,
    goBack?: boolean
}

export function Header({ title, action, goBack } : Props){
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                disabled={goBack}
            >
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>
                {title}
            </Text>

            {
                action 
                ? 
                <View>
                { action }
                </View>
                :
                <View style={{ width: 24 }}/>
            }
        </View>
    )
}