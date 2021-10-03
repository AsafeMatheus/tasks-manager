import React, { useState, useEffect } from "react"
import { 
    KeyboardAvoidingView,
    ActivityIndicator,
    SafeAreaView,
    Dimensions,
    Keyboard,
    Platform,
    View
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'
import { useNavigation } from "@react-navigation/native"
import * as ImagePicker from 'expo-image-picker'
import firebase from '../../config/firebaseconfig'

import { InputWithLabel } from "../../components/InputWithLabel"
import { MarkOption } from "../../components/MarkOption"
import { PickImage } from "../../components/PickImage"
import { TextArea } from "../../components/TextArea"
import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { theme } from "../../global/styles/theme"
import { adjust } from "../../global/functions"
import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function EditGroup({ route } : any){
    const navigation = useNavigation()

    const { groupId } = route.params
    const [everybodyCanPost, setEverybodyCanPost] = useState(true)
    const [linkToTheGroup, setLinkToTheGroup] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')

    const [loading, setLoading] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const deviceHeight = Dimensions.get('window').height

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

        firebase.firestore().collection('groups')
        .doc(groupId)
        .get()
        .then((response) => {
            let responseData = response.data()

            setEverybodyCanPost(responseData?.everybodyCanPost)
            setLinkToTheGroup(responseData?.linkToTheGroup)
            setDescription(responseData?.description)
            setImage(responseData?.image)
            setName(responseData?.name)
        }).catch(() => null)

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
          quality: 0.6,
          base64: true
        })
    
        if (!result.cancelled) {
          setImage(String(result.base64))
        }
    }

    const updateGroup = () => {
        setLoading(true)

        firebase.firestore().collection('groups')
        .doc(groupId)
        .set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            everybodyCanPost,
            linkToTheGroup,
            description,
            image,
            name
        })

        setTimeout(() => {
            navigation.navigate('Grupos', { justUpdate: true })
        }, 3000)
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

            <View
                style={{
                    marginTop: deviceHeight >= 590 ?
                    0 : 15
                }}
            >
                <PickImage
                    imageUrl={`data:image/jpeg;base64,${image}`}
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
                deviceHeight > 600 ?
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-3940256099942544/6300978111" 
                    servePersonalizedAds 
                    onDidFailToReceiveAdWithError={(err) => console.log(err)}
                />
                :
                <View />
            }

            {
                showButton ?
                <View style={styles.footer}>
                    <Button
                        title='Confirmar'
                        onPress={updateGroup}
                    />
                </View>
                :
                <View />
            }

            
        </SafeAreaView>
    )
    }
}