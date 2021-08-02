import React, { useState, useEffect } from "react"
import {
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    Text,
    View,
    Alert,
    TouchableOpacity 
} from "react-native"

import { useNavigation } from '@react-navigation/native'
import firebase from "../../config/firebaseconfig"
import * as ImagePicker from 'expo-image-picker'

import { InputWithLabel } from "../../components/InputWithLabel"
import { PickImage } from "../../components/PickImage"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

export function EditAccount(){
    const navigation = useNavigation()

    const currentUser = firebase.auth().currentUser
    const [username, setUsername] = useState(String(currentUser?.displayName))
    const [email, setEmail] = useState(String(currentUser?.email))
    const [image, setImage] = useState('')

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
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
    
        if (!result.cancelled) {
          setImage(result.uri)
        }
    }

    const verification = () => {
        let usernameLength = username.length
        let emailLength = email.length

        if (usernameLength == 0 || emailLength == 0){
            Alert.alert('Por favor, preencha todos os campos assima')
        } else{
            navigation.navigate('Tab'/*, {username, imageUrl: image}*/)
        }
    }

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
            >
                <Text style={styles.editPasswodText}>Redefinir senha</Text>
            </TouchableOpacity>

            <PickImage
                imageUrl={`data:image/jpeg;base64,${image}`}
                onPress={pickImage}
            />

            <View style={styles.Button}>
                <Button
                    title='Confirmar' 
                    onPress={() => verification()}
                />
            </View>
        </SafeAreaView>
    )
}