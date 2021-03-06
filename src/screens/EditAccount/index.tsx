import React, { useState, useEffect } from "react"
import {
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableOpacity, 
    SafeAreaView,
    Keyboard,
    Platform,
    Alert,
    Text,
    View
} from "react-native"

import { useNavigation } from '@react-navigation/native'
import firebase from "../../config/firebaseconfig"
import { sendEmail } from "../../global/functions"
import * as ImagePicker from 'expo-image-picker'

import { InputWithLabel } from "../../components/InputWithLabel"
import { PickImage } from "../../components/PickImage"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function EditAccount(){
    const navigation = useNavigation()

    const currentUser = firebase.auth().currentUser
    const [username, setUsername] = useState(String(currentUser?.displayName))
    const [email, setEmail] = useState(String(currentUser?.email))
    const [image, setImage] = useState('')

    const [loading, setLoading] = useState(false)
    const [showButton, setShowButton] = useState(true)

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!')
            }
          }
        })()

        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc("profile-image")
        .onSnapshot((doc) => {
            let data =  doc.data()
            setImage(data?.avatar)
        })

        setLoading(false)

        Keyboard.addListener('keyboardDidShow', () => {
            setShowButton(false)
        })

        Keyboard.addListener('keyboardDidHide', () => {
            setShowButton(true)
        })
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
          quality: 0.6,
        })
    
        if (!result.cancelled) {
          setImage(String(result.base64))
        }
    }

    const updateProfile = async () => {
        const currentUser = firebase.auth().currentUser

        setLoading(true)

        await currentUser?.updateProfile({
            displayName: username
        })

        await currentUser?.updateEmail(email).then(
            null
        ).catch(() => Alert.alert('N??o foi poss??vel atualizar o email. Tente novamente mais tarder.'))

        await firebase.firestore().collection(String(currentUser?.uid))
        .doc('profile-image')
        .set({
            avatar: image
        })

        await navigation.navigate('Opening')

        await setLoading(false)
    }

    const okFunction = () => {
        setLoading(true)
        navigation.navigate('Opening')
        setLoading(false)
    }

    const resetPassword = () => {
        Alert.alert('Enviar email', 'Ao clicar em ok um email de redefini????o de senha ser?? enviado para o endere??o: ' + String(currentUser?.email), [
            {
                text: 'Ok',
                onPress: () => {
                    sendEmail(email, okFunction)
                }
            },
            {
                text: 'Cancelar', 
                onPress: () => null
            }
        ])
    }

    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size={50} color={theme.colors.highlight} />
            </View>
        )
    }else{

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Editar perfil'
            />

            <KeyboardAvoidingView 
                style={styles.inputs}
                behavior={Platform.OS === 'ios'? 'padding' : 'position'}
            >
                <InputWithLabel
                    title='nome de usuario'
                    set={setUsername}
                    value={username}
                />
                <InputWithLabel
                    title='Email'
                    set={setEmail}
                    value={email}
                />
            </KeyboardAvoidingView>

            <TouchableOpacity
                style={styles.editPassword}
                onPress={() => resetPassword()}
            >
                <Text style={styles.editPasswodText}>Redefinir senha</Text>
            </TouchableOpacity>

            <PickImage
                imageUrl={`data:image/jpeg;base64,${image}`}
                onPress={pickImage}
            />

            {
                showButton ?
                <View style={styles.Button}>
                    <Button
                        title='Confirmar' 
                        onPress={() => updateProfile()}
                    />
                </View>
                :
                <View />
            }
            
        </SafeAreaView>
    )
    }
}