import React from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TouchableOpacityProps 
} from "react-native"

import { styles } from './styles'

type Props = TouchableOpacityProps & {
    title: string
}

export function SettingOption({ title, ...rest } : Props){
    return(
        <TouchableOpacity 
            {...rest}
            style={styles.container}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}