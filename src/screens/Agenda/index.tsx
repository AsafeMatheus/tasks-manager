import React, { useState, useEffect } from "react"
import { 
    SafeAreaView,
    FlatList
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { Appointment } from "../../components/Appointment"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

export function Agenda(){
    const navigation = useNavigation()

    const [events, setEvents] : any = useState([])

    useEffect(() => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc("agendas")
        .collection('agendas-list')
        .orderBy('timestamp', 'desc')
        .onSnapshot((query) => {
            const list : any = []

            query.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            })

            setEvents(list)
        })
    }, [])

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
                                navigation.navigate('EditAgenda', { item })
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