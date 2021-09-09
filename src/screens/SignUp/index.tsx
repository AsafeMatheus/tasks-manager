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

import { styles } from "./styles"

export function SignUp({ navigation } : any){
    const [deviceHeight, setDeviceHeight] = useState(692)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(`iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAgMAAACJFjxpAAAADFBMVEXFxcX////p6enW1tbAmiBwAAAGTklEQVR42u2dPZKkRhCFdyHGwKBlzRE4AkavtUcYYwoIDQb+ttFH4BJ1hHUUMuYAMuYSfYQ2JEu2QoYchSK0u9NTlWTyDUS+C/AF5HtZ/FTy4YPL5XK5XC6Xy+VyuVwul8vlcrlcLpfL5XK5XC6Xy+VyuVwul8vlcrlcrgX66Y+vIXS//E0d/6/wr768EIcvv4b/1D2zxycIymv4n7o/Vwb4PXyjn9etg0/hO31Z1X/xe4Dw24oA1x8cP3TrXYRD+KFOjAMBLx7DK3pa6QTE1wDCOqegevX4YeAssKIRDuGGTuwJWOUUlOGmzpwH13JivA0QZrIE1yjD9i2AHr4C1tfgzStgfQ3atwF6+ArYXoOEK2B7DY4pAJZZdE0BMOwHZUiSXT+o0wBG0oS2RoxpAGZGLBKPH6b1V6PrrE3bVACrIrikAoQXMgXskqBOB7BJgmM6wBPXCCzbQUwHMImiIuP4JlFU5wCMZAxZRVGTA9DBNWhRhWXW8Q2ysM4D0K/CKg9gYGvQogoveQD6HTlmAsysCfRtUOcCjKwJ9G3Q5gL0rAv1fZjrQnUfxmwAXR8W2cdXXhTV+QAj60JtH7b5AD3rQm0f5rtQ2YdRADDvCaAUHF+1IRcSgInNId0kqiQAA5tDukmEAzQSgA4OQtUojCKAeT8AoiDUjMJCBjDtB6CWAYz7AahkAHrN4E4G8Mi2As1m0MgAuv0A3MsAAtwMFdthFALMuwEQHj983gtAKQU47wWgkAJMewH4KAV42AtALQUYHYBdEuotCh3AAe6kAI8O4AAO4AAO4ADejh1gLwB+Y4ID+O25P6Lxx3T+qNYf1/NvTPB3Rv7aDn9zir87xt+e+wcM/hEL/h2Rf8rFf02Hf0/Ysq3gHQDgX9Xi3xXjX1bj35b75/38Dgt8j0nL5tA72GeE77TC95rhu+34/Yb4jsuWdeE72HWL7zvGd17je8/53ff4/AF8AgM+gwKfwoHPIeEnsbRkJ8iuQotpPPg8InwiEz+TCp/Khc8lwyez4bPp+Ol8+HxCfEIjPqOSn9KJzynFJ7Xis2r5ab34vGJ8YjM/sxqf2o3PLecnt+Oz6/Hp/fz/C/A/OOD/sOD/4oH/xwT/k0t54ww8rXEGjnANHG4m0Qq/NLrCQfTprV7wq3EFRnJJmrYqPbEnwPgUHOFVcRnhG5PEx1Qn9gQYnoLk53Qn9gSYnYKM54Q2C7OMR7UmHeEQMmTRFLNeWIxkCRqVYeZ7w4ksQZMyzP6KZaZS0CoNsz9i6cEQsIiCYz6A7jUQfE/YwVdA9xocJQAn0gPKPhBucJjZK6B5Da4yALV+IN7yqdWTxTuvtZaGjRRg4GJQNQwPQaxn0oR6RrzKAVSMWEY5gMrieEEJ6BRBuwRgpDqhYkcswyK9cDmslcbtMoCRLQGFIliSAipJcAgL9cw1Ap12cF0KsLQdxKUAC9cERVisZYvzajnAsoc1zXKAgYyhxVFUBgW9kDG0NIoqDYCJrcFlVRg1ADq4BpdUYa0DcGZrcEkVNjoAA5mDi7JQqQblVVhoAcxsDcqrsNUCGNkalFdh1ALo4BqUVmGtB3BmTSC1QaMHMLAmkNog6gF0sAlkNqg1Ac6sCWQ2aDQBBtYEMhtETYAOXA5JF0WFLsDMmkBig1YXYGRdKPHhRRegZ10o8KGyC/N9WGgDzKwL833YagOMrAvzfXjRBuhZF2b7UN2FuT4s9AFmbkUqWZdW+gATGwO5QdDoAwxsDOQGQdQH6OAYyAuCwgJgZmMgLwgqC4BpSwCtBcDI5lBeEl0sAHo2h7KSyCSHcpKosAGYtwNQ2wCc2RzKSaLWBmBkcygniXCAiw1AzwZhRhQaBWF6FOIAhRXAzAZhehRWVgDTVgBaK4CRDcL0KMQBLlYAPZvE6VlMA5glcWoWF3YA8zYAajuA8zYAKjuAtGZwZwfwwPai1G7U2AEM2wC42AH02wCIdgDdJgAMm2FaO8QBCkuAeQsAtSXAeQsAlSXAtAWAO0uAB3Y5kLYgwAEaS4BhCwD3lgCP7HokbUWCA0RLgG4LAMFU8IIoZUmEAxS2ALMDvAnw0RbgM7skTFkUOkBlCzA5ALsqT1mX4wCtLcDoAOxtQcqNgQPgAPe2AI8OwN4aptwcOgAOEG0BOgf49nj/AJZitIc2HKS7AAAAAElFTkSuQmCC`)

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
            
            firebase.firestore().collection(String(user?.uid)).doc('profile-image').set({avatar: image})

            navigation.reset({
                index: 0,
                routes: [
                    { name: 'MainNavigation' }
                ]
            })
        })
        .catch((error) => {
            var errorMessage = error.message

            Alert.alert(errorMessage)
        })
    }

    
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