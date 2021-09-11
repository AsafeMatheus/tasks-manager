import React, { useState } from "react"
import { 
    TouchableOpacity, 
    TextInputProps,
    TextInput,
    Text, 
    View 
} from "react-native"

import { adjust } from "../../global/functions"

import { Ionicons } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TextInputProps & {
    title: string,
    set: any,
    hiddenPassword ?: any,
    password ?: boolean,
    setHiddenPassword ?: any
}

export function InputWithLabel({ 
    set, 
    title, 
    hiddenPassword,
    password,
    setHiddenPassword, 
    ...rest } : Props){
    const [written, setWritten] = useState(false)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
            {
                password ?
                <View
                    style={[styles.inputPassword, {
                        backgroundColor: written  ? '#ffffff' : theme.colors.secondary,
                        borderWidth: written ? 1 : 0,
                        borderColor: '#2B79D6' 
                    }]}
                >
                    <TextInput
                        style={styles.textInputPassword}
                        {...rest}
                        onChangeText={text => {
                            if (text.length != 0){
                                setWritten(true)
                            } else{
                                setWritten(false)
                            }
                            set(text)
                        }}
                    />
                    {
                        written ?
                        <TouchableOpacity
                            onPress={() => {
                                setHiddenPassword(!hiddenPassword)
                            }}
                        >
                            {
                                hiddenPassword ?
                                    <Ionicons name="eye-off" size={adjust(24)} color="black" />
                                :
                                    <Ionicons name="eye" size={adjust(24)} color="black" />
                            }
                        </TouchableOpacity>
                        :
                        <View />
                    }
                </View>
                :
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
            }
            
            
        </View>
    )
}