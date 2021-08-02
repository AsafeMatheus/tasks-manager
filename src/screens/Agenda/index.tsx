import React, { useState, useEffect } from "react"
import { 
    SafeAreaView,
    BackHandler, 
    FlatList,
    Alert 
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { Appointment } from "../../components/Appointment"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

export function Agenda(){
    const navigation = useNavigation()

    const backAction = () => {
        navigation.goBack()
        return true
    }

    /*useEffect(() => {
        //if (navigation.isFocused())

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        )

        return () => BackHandler.removeEventListener(
            "hardwareBackPress",
            backAction
        )
    }, [backAction])*/

    const [events, setEvents] = useState([
        {
            id: '1',
            title: 'Festa de despedida',
            date: '16/08/2021',
            hour: '11:21',
            place: 'Brusque',
            remember: true,
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
        <SafeAreaView style={styles.container}>
            <Header
                title='Agenda particular'
            />

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
            />

            <Button 
                title='Agendar'
                onPress={() => {
                    navigation.navigate('CreateAgenda')
                }}
            />
        </SafeAreaView>
    )
}