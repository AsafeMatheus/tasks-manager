import React, { useState, useEffect } from "react"
import { 
    SafeAreaView,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert 
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'
import {
    AdMobBanner,
    setTestDeviceIDAsync
} from 'expo-ads-admob'

import { InputWithLabel } from "../../components/InputWithLabel"
import { PickImage } from "../../components/PickImage"
import { TextArea } from "../../components/TextArea"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function CreateGroup(){
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
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
        let nameLength = name.length
        let descriptionLength = description.length

        if (nameLength == 0 || descriptionLength == 0){
            Alert.alert('Por favor, preencha todos os campos assima')
        } else{
            navigation.navigate('Grupos')
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
                    imageUrl={image}
                    onPress={() => pickImage()}
                />
            
                <AdMobBanner
                    bannerSize="largeBanner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" 
                    servePersonalizedAds 
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}
                    style={styles.ad}
                />
            </View>

            <View style={[styles.footer, styles.content]}>
                <Button
                    title='Confirmar'
                    onPress={verification}
                />
            </View>
        </SafeAreaView>
    )
}