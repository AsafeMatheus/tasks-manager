import React, { useState } from "react"
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
    hour: string,
    place: string,
    remember: boolean,
    color: string,
    day: string,
    month: string,
    minute: string,
    year: string
}

type Props = TouchableOpacityProps & {
    data: AgendaProps
}

export function Appointment({ data, ...rest } : Props){
    const [date, setDate] = useState(data.day + '/' + data.month + '/' + data.year)
    const [hour, setHour] = useState(data.hour + ':' + data.minute)

    return(
        <TouchableOpacity 
            style={[styles.container, {backgroundColor: data.color}]}
            activeOpacity={0.5}
            {...rest}
        >
            <Text style={styles.title}>{data.title}</Text>

            <View style={styles.content}>
                <Text style={styles.information}>Data: {date}</Text>
                <Text style={styles.information}>Horário: {hour}</Text>
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