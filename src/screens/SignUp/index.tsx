import React, { useState, useEffect } from "react"
import { 
    KeyboardAvoidingView,
    ActivityIndicator,
    ScrollView,
    Platform,
    Alert,
    Text, 
    View
} from "react-native"

import { Dimensions} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../config/firebaseconfig'
import 'firebase/storage'
import 'firebase/auth'

import { InputWithLabel } from "../../components/InputWithLabel"
import { PickImage } from "../../components/PickImage"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function SignUp({ navigation } : any){
    const [deviceHeight, setDeviceHeight] = useState(692)

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [email, setEmail] = useState('')
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

        setDeviceHeight(Dimensions.get('window').height)
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        })
    
        if (!result.cancelled) {
            setImage(String(result.base64))
            setImageUrl(result.uri)
        }
    }

    const signUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            let user = authUser.user
            user?.updateProfile({
                displayName: username
            })
            console.log(user?.uid)
            firebase.firestore().collection(String(user?.uid)).doc('profile-image').set({avatar: image})

            setLoading(true)

            setTimeout(async () => {
                await navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainNavigation' }]
                })
            }, 5000)
        })
        .catch((error) => {
            var errorMessage = error.message

            Alert.alert(errorMessage)
        })
    }

    if(loading){
        return(
            <View style={styles.loading}>
                <ActivityIndicator size={50} color={theme.colors.highlight} />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        )
    }else{
        return(
            <>
                {
                    deviceHeight > 600 ?
                    <View
                        style={styles.container}
                    >
                        <Header
                            title='Cadastro'
                        />

                        <KeyboardAvoidingView
                            style={styles.inputs}
                            behavior={Platform.OS === 'ios'? 'padding' : 'position'}
                        >
                            <InputWithLabel
                                title='nome de usuario'
                                set={setUsername}
                                maxLength={13}
                            />
                            <InputWithLabel
                                title='Senha'
                                set={setPassword}
                            />
                            <InputWithLabel
                                title='Email'
                                set={setEmail}
                            />
                        </KeyboardAvoidingView>

                        <PickImage
                            imageUrl={imageUrl}
                            onPress={pickImage}
                        />

                        <View 
                            style={[
                                styles.Button,
                                { paddingBottom: 15 }
                            ]}
                        >
                            <Button
                                title='Cadastrar'
                                onPress={() => signUp()}
                                space
                            />
                        </View>
                    </View>

                    :

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                    <View style={styles.container}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios'? 'padding' : 'position'}
                        >
                            <Header
                                title='Cadastro'
                            />

                            <View style={styles.inputs}>
                                <InputWithLabel
                                    title='nome de usuario'
                                    set={setUsername}
                                    maxLength={13}
                                />
                                <InputWithLabel
                                    title='Senha'
                                    set={setPassword}
                                />
                                <InputWithLabel
                                    title='Email'
                                    set={setEmail}
                                />
                            </View>

                        </KeyboardAvoidingView>

                        <PickImage
                            imageUrl={imageUrl}
                            onPress={pickImage}
                        />

                        <View 
                            style={[
                                styles.Button,
                                { paddingBottom: 15 }
                            ]}
                        >
                            <Button
                                title='Cadastrar'
                                onPress={() => signUp()}
                                space
                            />
                        </View>
                    </View>
                </ScrollView>
                }
            </>
        )
    }
}