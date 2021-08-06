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
            title: 'rumo ao platina',
            hour: '19',
            place: 'quarto',
            remember: false,
            color: '#FFFF00',
            day: '05',
            month: '08',
            minute: '30',
            year: '2021'
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