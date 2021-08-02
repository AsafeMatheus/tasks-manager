import React, { useState } from "react"
import { 
    SafeAreaView, 
    View, 
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    StatusBar 
} from "react-native"
import { useNavigation } from "@react-navigation/native"

import { FontAwesome5 } from '@expo/vector-icons'

import { PickColorModal } from "../../components/PickColorModal"
import { InputWithLabel } from "../../components/InputWithLabel"
import { SmallInput } from "../../components/SmallInput"
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"

import { styles } from "./styles"

export function CreateGroupAgenda(){
    const navigation = useNavigation()

    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [place, setPlace] = useState('')
    const [hour, setHour] = useState('')
    const [remember, setRemember] = useState(false)
    const [color, setColor] = useState('#FFFF00')

    const [colorModal, setColorModal] = useState(false)
    
    return(
        <>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        <SafeAreaView style={styles.container}>
            <Header
                title='Criar agenda'
            />

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
                            <SmallInput set={setDay} />
                            <Text style={styles.separator}>:</Text>
                            <SmallInput set={setMonth} />
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
                    onPress={() => {
                        navigation.navigate('GroupAgenda')
                    }}
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
        </>
    )
}