import React, { useState } from "react"
import { 
    ActivityIndicator,
    View,  
    Text
} from "react-native"

import firebase from '../../config/firebaseconfig'

import { Button } from "../../components/Button"

import { AntDesign } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function Removed({ navigation, route } : any){
    const { 
        groupId,
        load,
        setLoad
    } = route.params

    const [loading, setLoading] = useState(false)

    const deleteGroup = () => {
        const currentUserId = String(firebase.auth().currentUser?.uid)

        setLoading(true)

        firebase.firestore().collection(currentUserId)
        .doc('groups')
        .collection('my-groups')
        .doc(groupId)
        .delete()

        setTimeout(() => {
            setLoad(!load)
            navigation.navigate('Grupos')
            setLoading(false)
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
        <View style={styles.container}>
            <AntDesign name="warning" size={100} color={theme.colors.highlight} />

            <Text style={styles.title}>
                Você foi removido(a) do grupo
            </Text>

            <View style={styles.footer}>
                <Button 
                    title='Excluir grupo'
                    onPress={deleteGroup}
                />
            </View>
        </View>
    )
    }
}