import React, { useState } from "react"
import { 
    SafeAreaView, 
    View, 
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity 
} from "react-native"

import { useNavigation } from "@react-navigation/native"

import { PickColorModal } from "../../components/PickColorModal"
import { InputWithLabel } from "../../components/InputWithLabel"
import { SmallInput } from "../../components/SmallInput"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"

import { FontAwesome5 } from '@expo/vector-icons'

import { styles } from "./styles"

export function EditAgenda(){
    const navigation = useNavigation()

    const [title, setTitle] = useState('Festa de despedida')
    const [day, setDay] = useState('16')
    const [month, setMonth] = useState('08')
    const [place, setPlace] = useState('Brusque')
    const [hour, setHour] = useState('11')
    const [minute, setMinute] = useState('21')
    const [remember, setRemember] = useState(true)
    const [color, setColor] = useState('#FFFF00')

    const [colorModal, setColorModal] = useState(false)
    
    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Editar agenda'
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
                    onPress={() => navigation.goBack()}
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