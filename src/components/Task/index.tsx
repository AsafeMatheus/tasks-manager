import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

import { Swipeable } from "react-native-gesture-handler"

import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import { styles } from "./styles"

type TaskDescriptionProps = {
    id: string,
    desc: string
}

type taskProps = {
    id: string,
    desc: string
}

type Props = {
    item: taskProps,
    deleted: any,
    finished: any
}

export function Task({ item, finished, deleted } : Props){

    const FinishedAction = () => {
        return(
            <View style={styles.actionWraper}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.action, {backgroundColor: '#388e3c'}]}
                    onPress={finished}
                >
                    <FontAwesome5 name="check" size={24} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.action, {backgroundColor: 'red'}]}
                    onPress={deleted}
                >
                    <Ionicons name="md-trash-sharp" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <Swipeable renderRightActions={FinishedAction}>
            <View style={styles.container}>
                <Text>
                    {item.desc}
                </Text>
            </View>
        </Swipeable>
    )
}