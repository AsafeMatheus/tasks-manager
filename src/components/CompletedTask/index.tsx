import React from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TouchableOpacityProps 
} from "react-native"

import { FontAwesome5 } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    title: string
}

export function CompletedTask({ title, ...rest } : Props){
    return(
        <View style={styles.container}>
            <Feather name="check" size={24} color={theme.colors.copleted} />

            <Text style={styles.title}>{ title }</Text>

            <TouchableOpacity {...rest}>
                <FontAwesome5 name="trash-alt" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}