import React, { useState, useEffect } from "react"
import { 
    KeyboardAvoidingView,
    TouchableOpacity, 
    SafeAreaView,
    ScrollView, 
    Platform,
    Keyboard,
    View, 
    Text,
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { PickColorModal } from "../../components/PickColorModal"
import { InputWithLabel } from "../../components/InputWithLabel"
import { SmallInput } from "../../components/SmallInput"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"

import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from "./styles"

export function CreateAgenda(){
    const navigation = useNavigation()
    const currentMoment = new Date()

    const [remember, setRemember] = useState(false)
    const [color, setColor] = useState('#FFFF00')
    const [minute, setMinute] = useState('')
    const [title, setTitle] = useState('')
    const [month, setMonth] = useState('')
    const [place, setPlace] = useState('')
    const [hour, setHour] = useState('')
    const [day, setDay] = useState('')

    const [colorModal, setColorModal] = useState(false)
    const [showButton, setShowButton] = useState(true)

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setShowButton(false)
        })

        Keyboard.addListener('keyboardDidHide', () => {
            setShowButton(true)
        })
    }, [])

    const addAgenda = () => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('agendas')
        .collection('agendas-list')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            year: currentMoment.getFullYear(),
            remember,
            minute,
            place,
            color,
            title,
            month,
            hour,
            day,
        })

        navigation.navigate('Agenda')
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Criar agenda'
            />
            
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios'? 'padding' : 'position'}
                >
                    <InputWithLabel
                        title='Título'
                        set={setTitle}
                    />
                    <InputWithLabel
                        title='Local'
                        set={setPlace}
                    />
                    <View style={styles.time}>
                        <View>
                            <Text style={styles.title}>Dia e mês:</Text>
                            <View style={styles.smallInputs}>
                                <SmallInput set={setDay} />
                                <Text style={styles.separator}>/</Text>
                                <SmallInput set={setMonth} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Horário:</Text>
                            <View style={styles.smallInputs}>
                                <SmallInput set={setHour} />
                                <Text style={styles.separator}>:</Text>
                                <SmallInput set={setMinute} />
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
            </ScrollView>

            {
                showButton ?
                <View style={styles.footer}>
                    <Button
                        title='Confirmar'
                        onPress={addAgenda}
                    />
                </View>
                :
                <View />
            }
            
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