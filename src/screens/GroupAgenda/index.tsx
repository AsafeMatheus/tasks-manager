import React, { useState, useEffect } from "react"
import { View, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { Appointment } from "../../components/Appointment"
import { Button } from "../../components/Button"

import { styles } from "./styles"

type Props = {
    groupId: string,
    groupCreator: string
}

export function GroupAgenda({ groupId, groupCreator } : Props){
    const navigation = useNavigation()

    const [events, setEvents] : any = useState([])

    useEffect(() => {
        firebase.firestore().collection(groupCreator)
        .doc('groups')
        .collection('my-groups')
        .doc(groupId)
        .collection('agendas')
        .onSnapshot((agendas) => {
            const agendasList : any = []

            agendas.forEach((agenda) => {
                agendasList.push({
                    id: agenda.id,
                    ...agenda.data()
                })

                console.log(agenda.data())
            })

            setEvents(agendasList)
        })
    }, [])

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
                                navigation.navigate('EditAgenda', { item })
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
                        navigation.navigate('CreateGroupAgenda', {
                            groupId,
                            groupCreator
                        })
                    }}
                />
            </View>
        </View>
    )
}