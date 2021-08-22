import React, { useState, useEffect } from "react"
import { 
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert 
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from "../../config/firebaseconfig"
import * as ImagePicker from 'expo-image-picker'
import {
    AdMobBanner,
    setTestDeviceIDAsync
} from 'expo-ads-admob'

import { InputWithLabel } from "../../components/InputWithLabel"
import { MarkOption } from "../../components/MarkOption"
import { PickImage } from "../../components/PickImage"
import { TextArea } from "../../components/TextArea"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function CreateGroup(){
    const navigation = useNavigation()

    const [everybodyCanPost, setEverybodyCanPost] = useState(true)
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!')
            }
          }
        })()
    }, [])

    const addGroup = () => {
        const reference = firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('groups')
        .collection('my-groups')

        reference.add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            creator: firebase.auth().currentUser?.uid,
            everybodyCanPost,
            description,
            image,
            name,
        })

        navigation.navigate('Grupos')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
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

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Header
                    title='Novo grupo'
                />
                
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios'? 'padding' : 'position'}
                >
                    <InputWithLabel
                        title='Nome'
                        set={setName}
                    />
                    <TextArea
                        title='Descrição'
                        set={setDescription}
                    />
                </KeyboardAvoidingView>

                <PickImage
                    imageUrl={imageUrl}
                    onPress={() => pickImage()}
                />

                <View style={styles.mark}>
                    <MarkOption
                        title={'Todos podem postar'}
                        set={() => setEverybodyCanPost(!everybodyCanPost)}
                        marked={everybodyCanPost}
                        size={18}
                        line={false}
                    />
                </View>

                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" 
                    servePersonalizedAds 
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}
                    style={styles.ad}
                />
            </View>

            <View style={[styles.footer, styles.content]}>
                <Button
                    title='Confirmar'
                    onPress={addGroup}
                />
            </View>
        </SafeAreaView>
    )
}