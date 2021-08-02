import React, { useState } from "react"
import { View, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { Appointment } from "../../components/Appointment"
import { Button } from "../../components/Button"

import { styles } from "./styles"


export function GroupAgenda(){
    const navigation = useNavigation()

    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Festa de despedida',
            date: '16/08/2021',
            hour: '11:21',
            place: 'Brusque',
            remember: false,
            background: "#FFFF00"
        },
        {
            id: '2',
            title: 'Apresentação',
            date: '20/07/2021',
            hour: '09:30',
            place: 'Brusque',
            remember: false,
            background: "#42FF41"
        },
        {
            id: '3',
            title: 'Passeio escolar',
            date: '30/07/2021',
            hour: '06:15',
            place: 'Brusque',
            remember: true,
            background: "#FF8E01"
        },
        {
            id: '4',
            title: 'Aula de violão',
            date: '16/08/2021',
            hour: '14:30',
            place: 'Brusque',
            remember: true,
            background: "#FFA5E8"
        }
    ])

    return(
        <View style={styles.container}>
            <FlatList
                data={events}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <Appointment 
                            data={item} 
                            onPress={() => {
                                navigation.navigate('EditAgenda')
                            }} 
                        />
                    )
                }}
                showsVerticalScrollIndicator={false}
                style={styles.content}
            />

            <View style={styles.footer}>
                <Button
                    title='Agendar'
                    onPress={() => {
                        navigation.navigate('CreateGroupAgenda')
                    }}
                />
            </View>
        </View>
    )
}