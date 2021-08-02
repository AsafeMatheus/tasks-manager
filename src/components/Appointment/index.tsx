import React from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TouchableOpacityProps 
} from "react-native"

import { MaterialCommunityIcons } from '@expo/vector-icons'

import { styles } from "./styles"

export type AgendaProps = {
    id: string
    title: string,
    date: string,
    hour: string,
    place: string,
    remember: boolean,
    background: string
}

type Props = TouchableOpacityProps & {
    data: AgendaProps
}

export function Appointment({ data, ...rest } : Props){
    return(
        <TouchableOpacity 
            style={[styles.container, {backgroundColor: data.background}]}
            activeOpacity={0.5}
            {...rest}
        >
            <Text style={styles.title}>{data.title}</Text>

            <View style={styles.content}>
                <Text style={styles.information}>Data: {data.date}</Text>
                <Text style={styles.information}>Horário: {data.hour}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.information}>Local: {data.place}</Text>
                <Text style={styles.remember}>{
                        data.remember 
                        ? 
                        <MaterialCommunityIcons name="bell-ring" size={24} color="black" />
                        : 
                        <></>
                    }
                </Text>
            </View>
        </TouchableOpacity>
    )
}