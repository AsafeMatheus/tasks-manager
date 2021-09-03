import React from "react"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

import { adjustSpace } from "../../global/functions"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    dark?: boolean,
    title: string,
    space?: boolean
}

export function Button({
    dark = true,
    title,
    space = false,
    ...rest
} : Props){
    const { highlight, secondary, heading } = theme.colors

    return(
        <TouchableOpacity
            style={[
                styles.container,
                { 
                    backgroundColor: dark ? highlight : secondary,
                    marginTop: space ? adjustSpace(20) : 20
                }
            ]}
            {...rest}
            activeOpacity={0.9}
        >
            <Text 
                style={[
                    styles.title,
                    {color: dark ? heading : '#000000'}
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}