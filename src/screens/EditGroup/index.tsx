import React, { useState, useEffect } from "react"
import { 
    SafeAreaView,
    Platform,
    KeyboardAvoidingView,
    View,
    Alert
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'

import { InputWithLabel } from "../../components/InputWithLabel"
import { PickImage } from "../../components/PickImage"
import { TextArea } from "../../components/TextArea"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function EditGroup(){
    const navigation = useNavigation()

    const [name, setName] = useState('Turma de inglês')
    const [description, setDescription] = useState('Eventos e trabalhos da turma número 8 do CCAA')
    const [image, setImage] = useState('https://certificadocursosonline.com/wp-content/uploads/2017/09/curso-de-ingles-online-gratis-1280x720.jpg')

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
            <Header 
                title='Editar grupo'
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios'? 'padding' : 'position'}
            >
                <InputWithLabel 
                    title='Nome'
                    set={setName}
                    value={name}
                />

                <TextArea 
                    title='Descrição'
                    set={setDescription}
                    value={description}
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

            <Button
                title='Confirmar'
                onPress={verification}
            />
        </SafeAreaView>
    )
}