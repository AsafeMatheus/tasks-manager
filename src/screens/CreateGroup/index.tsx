import React, { useState, useEffect } from "react"
import { 
    KeyboardAvoidingView,
    ActivityIndicator,
    SafeAreaView,
    Dimensions,
    Keyboard,
    Platform,
    View,
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import { useNavigation } from "@react-navigation/native"
import firebase from "../../config/firebaseconfig"
import * as ImagePicker from 'expo-image-picker'
import * as Linking from 'expo-linking'
import 'react-native-get-random-values'
const uuid = require('uuid')

import { InputWithLabel } from "../../components/InputWithLabel"
import { MarkOption } from "../../components/MarkOption"
import { PickImage } from "../../components/PickImage"
import { TextArea } from "../../components/TextArea"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { theme } from "../../global/styles/theme"
import { adjust } from '../../global/functions'
import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function CreateGroup(){
    const navigation = useNavigation()
    const deviceHeight = Dimensions.get('window').height

    const [everybodyCanPost, setEverybodyCanPost] = useState(true)
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')

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

        setLoading(false)

        Keyboard.addListener('keyboardDidShow', () => {
            setShowButton(false)
        })

        Keyboard.addListener('keyboardDidHide', () => {
            setShowButton(true)
        })
    }, [])

    const addGroup = async () => {
        // The purpose of this function is to create a group with a random id
        // that doesn't exist yet

        let keepCreating = true
        let groupId = ''

        setLoading(true)

        const reference = firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('groups')
        .collection('my-groups')

        // if there is a group with the created random id its goint to keep creating
        while (keepCreating == true){
            let randomId = uuid.v4()

            const group = await firebase.firestore().collection('groups')
            .doc(randomId)
            
            const groupDoc = await group.get()

            if (!groupDoc.exists){
                let linkToTheGroup = Linking.createURL('exp://192.168.15.7:19000', {
                    queryParams:{
                        groupId: randomId,
                        group: true
                    }
                })

                // Setting the group with its data
                firebase.firestore().collection('groups')
                .doc(randomId)
                .set({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    everybodyCanPost,
                    linkToTheGroup,
                    description,
                    image,
                    name
                })

                // Adding the creator to the list of members
                firebase.firestore().collection('groups')
                .doc(randomId)
                .collection('members')
                .doc(String(firebase.auth().currentUser?.uid))
                .set({
                    userId: String(firebase.auth().currentUser?.uid),
                    admin: true,
                    creator: true
                })

                keepCreating = false
                groupId = randomId
            }
        }

        // Adding the created group to the creator groups list
        await reference.add({
            groupId
        })

        setTimeout(() => {
            navigation.navigate('Grupos')
        }, 3500)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.6,
          base64: true
        })
    
        if (!result.cancelled) {
            setImage(String(result.base64))
            setImageUrl(result.uri)
        }
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

                <View 
                    style={{
                        marginTop: deviceHeight >= 590 ?
                        0 : 15
                    }}
                >
                    <PickImage
                        imageUrl={imageUrl}
                        onPress={() => pickImage()}
                    />
                </View>

                <View style={styles.mark}>
                    <MarkOption
                        title={'Todos podem postar'}
                        set={() => setEverybodyCanPost(!everybodyCanPost)}
                        marked={everybodyCanPost}
                        size={adjust(18)}
                        line={false}
                    />
                </View>

                {
                    deviceHeight >= 590 ?
                    <AdMobBanner
                        bannerSize="banner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" 
                        servePersonalizedAds 
                        onDidFailToReceiveAdWithError={(err) => null}
                        style={styles.ad}
                    />
                    :
                    <View />
                }
            </View>

            {
                showButton ?
                <View style={[styles.footer, styles.content]}>
                    <Button
                        title='Confirmar'
                        onPress={addGroup}
                    />
                </View>
                :
                <View />
            }
        </SafeAreaView>
    )
    }
}