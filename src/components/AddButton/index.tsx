import React from "react"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { Entypo } from '@expo/vector-icons'

import { styles } from "./styles"

export function AddButton({ ...rest } : TouchableOpacityProps){
    return(
        <TouchableOpacity 
            style={styles.container} 
            activeOpacity={0.7} 
            {...rest}
        >
            <Entypo name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
    )
}