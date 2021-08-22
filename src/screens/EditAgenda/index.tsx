import React, { useState } from "react"
import { 
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView, 
    Platform,
    Alert, 
    View, 
    Text
} from "react-native"

import firebase from '../../config/firebaseconfig'

import { PickColorModal } from "../../components/PickColorModal"
import { InputWithLabel } from "../../components/InputWithLabel"
import { SmallInput } from "../../components/SmallInput"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"

import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from "./styles"

export function EditAgenda({ navigation, route } : any){
    const data = route.params.item

    const [remember, setRemember] = useState(data.remember)
    const [minute, setMinute] = useState(data.minute)
    const [title, setTitle] = useState(data.title)
    const [month, setMonth] = useState(data.month)
    const [place, setPlace] = useState(data.place)
    const [color, setColor] = useState(data.color)
    const [hour, setHour] = useState(data.hour)
    const [day, setDay] = useState(data.day)
    
    const userId = String(firebase.auth().currentUser?.uid)
    const [colorModal, setColorModal] = useState(false)

    const deleteAgenda = () => {
        Alert.alert("Alerta!", `Deseja mesmo excluir isto de sua agenda`, [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Sim", onPress: () => {
                    if (data.groupAgenda){
                        firebase.firestore().collection(data.groupCreator)
                        .doc('groups')
                        .collection('my-groups')
                        .doc(data.groupId)
                        .collection('agendas')
                        .doc(data.id).delete()

                        navigation.navigate('GroupAgenda')
                    } else{
                        firebase.firestore().collection(userId)
                        .doc('agendas')
                        .collection('agendas-list')
                        .doc(data.id).delete()

                        navigation.navigate('Agenda')
                    }
                }
            }
        ])
    }

    const update = () => {
        if (data.groupAgenda){
            firebase.firestore().collection(data.groupCreator)
            .doc('groups')
            .collection('my-groups')
            .doc(data.groupId)
            .collection('agendas')
            .doc(data.id).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                groupCreator: data.groupCreator,
                groupId: data.groupId,
                minute: data.minute,
                year: data.year,
                groupAgenda: true,
                remember,
                title,
                month,
                place,
                color,
                hour,
                day,
            })

            navigation.navigate('GroupAgenda')
        } else {
            firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
            .doc('agendas')
            .collection('agendas-list')
            .doc(data.id).set({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                remember,
                minute,
                title,
                place,
                color,
                month,
                hour,
                day
            })

            navigation.navigate('Agenda')
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Editar agenda'
                action={
                    <TouchableOpacity 
                        activeOpacity={0.7}
                        onPress={deleteAgenda}
                    >
                        <FontAwesome5 name="trash-alt" size={24} color="black" />
                    </TouchableOpacity>
                }
            />

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios'? 'padding' : 'position'}
            >
                <InputWithLabel 
                    title='Título'
                    set={setTitle}
                    value={title}
                />

                <InputWithLabel 
                    title='Local'
                    set={setPlace}
                    value={place}
                />

                <View style={styles.time}>
                    <View>
                        <Text style={styles.title}>Dia e mês:</Text>
                        <View style={styles.smallInputs}>
                            <SmallInput 
                                set={setDay}
                                value={day} 
                            />
                            <Text style={styles.separator}>/</Text>
                            <SmallInput 
                                set={setMonth}
                                value={month} 
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.title}>Horário:</Text>
                        <View style={styles.smallInputs}>
                            <SmallInput 
                                set={setHour}
                                value={hour} 
                            />
                            <Text style={styles.separator}>:</Text>
                            <SmallInput 
                                set={setMinute} 
                                value={minute}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>

            <TouchableOpacity
                style={styles.pickColor}
                activeOpacity={0.7}
                onPress={() => setColorModal(true)}
            >
                <View style={[styles.colorView, {backgroundColor: color}]} />

                <View style={styles.colorPickerTextContainer}>
                    <Text style={styles.colorPickerText}>Escolher cor</Text>
                </View>
            </TouchableOpacity>

            {
                remember ?
                <TouchableOpacity 
                    style={styles.alarm}
                    onPress={() => setRemember(!remember)}
                >
                    <FontAwesome5 name="bell" size={24} color="black" />
                    <Text style={styles.alarmText}>Desativar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity 
                    style={styles.alarm}
                    onPress={() => setRemember(!remember)}
                >
                    <FontAwesome5 name="bell-slash" size={24} color="black" />
                    <Text style={styles.alarmText}>Ativar</Text>
                </TouchableOpacity>
            }

            <View style={styles.footer}>
                <Button
                    title='Confirmar'
                    onPress={update}
                />
            </View>

            <PickColorModal
                visible={colorModal}
                closeModal={() => {
                    setColorModal(false)
                }}
                set={setColor}
            />
        </SafeAreaView>
    )
}