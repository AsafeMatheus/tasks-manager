import React, { useState, useEffect } from "react"
import { 
    TouchableOpacity,
    SafeAreaView, 
    Image,
    Alert,
    Text,
    View
} from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { MaterialIcons } from '@expo/vector-icons'

import { styles } from "./styles"

export function Profile(){
    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')

    const currentUser = firebase.auth().currentUser

    useEffect(() => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid)).doc("profile-image")
        .onSnapshot((doc) => {
            let data =  doc.data()
            setImage(data?.avatar)
        })

        setUsername(String(firebase.auth().currentUser?.displayName))
        setEmail(String(firebase.auth().currentUser?.email))
    }, [])

    const logOut = () => {
        Alert.alert("Alerta!", `Deseja mesmo sair de ${currentUser?.displayName}?`, [
            {
                text: "Não",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Sim", onPress: () => {
                    firebase.auth().signOut().then(() => {
                        navigation.navigate('SignIn', {justLogOut: true})
                    })      
                }
            }
        ])
    }

    return(
        <SafeAreaView style={styles.container}>
            <Header
                title='Perfil'
            />

            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: `data:image/jpeg;base64,${image}` }}
                    style={styles.image}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>Nome de usuário:</Text>
                <Text style={styles.text}>{username}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>Email:</Text>
                <Text style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {email}
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>Seu código:</Text>
                <Text 
                    style={styles.text}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {currentUser?.uid}
                </Text>
            </View>

            <TouchableOpacity 
                onPress={() => logOut()}
                style={styles.logout}
            >
                <MaterialIcons name="logout" size={24} color="black" />
                <Text style={styles.logoutText}>sair</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Button
                    title='Editar'
                    onPress={() => {
                        navigation.navigate('EditProfile')
                    }}
                />
            </View>
        </SafeAreaView>
    )
}