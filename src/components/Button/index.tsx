import React from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    dark?: boolean,
    title: string
}

export function Button({
    dark = true,
    title,
    ...rest
} : Props){
    const { highlight, secondary, heading } = theme.colors

    return(
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: dark ? highlight : secondary }
            ]}
            {...rest}
            activeOpacity={0.9}
        >
            <Text style={[
                styles.title,
                {color: dark ? heading : '#000000'}
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}