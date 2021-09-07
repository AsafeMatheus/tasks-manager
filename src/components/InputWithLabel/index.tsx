import React, { useState } from "react"
import { 
    TextInputProps, 
    TextInput,
    Text, 
    View 
} from "react-native"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TextInputProps & {
    title: string,
    set: any
}

export function InputWithLabel({ set, title, ...rest } : Props){
    const [written, setWritten] = useState(false)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            
            <TextInput
                {...rest}
                style={[styles.input, {
                    backgroundColor: written  ? '#ffffff' : theme.colors.secondary,
                    borderWidth: written ? 1 : 0,
                    borderColor: '#2B79D6' 
                }]}
                onChangeText={text => {
                    if (text.length != 0){
                        setWritten(true)
                    } else{
                        setWritten(false)
                    }
                    set(text)
                }}
            />
        </View>
    )
}