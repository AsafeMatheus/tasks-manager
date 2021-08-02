import React, { useState } from "react"
import { TextInput, TextInputProps } from "react-native"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TextInputProps & {
    set: any
}

export function SmallInput({ set, ...rest } : Props){
    const [written, setWritten] = useState(false)

    return(
        <TextInput 
            {...rest}
            style={[styles.container, {
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
            maxLength={2}
            keyboardType='numeric'
        />
    )
}