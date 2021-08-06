import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = {
    title: string,
    marked: boolean,
    set: any,
    size?: number,
    line?: boolean
}

export function MarkOption({ 
    title, 
    marked, 
    set, 
    size,
    line=true 
} : Props){
    return(
        <TouchableOpacity onPress={() => set()} activeOpacity={0.7}>
            <View 
                style={[
                    styles.container,
                    line ? {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.secondary10,
                    } 
                    :
                    {}
                ]}
            >
                <Text style={size ? {fontSize: size} : styles.title}>
                    {title}
                </Text>

                <View
                    style={[
                        styles.markView,
                        {backgroundColor: marked ?
                            '#2B79D6'
                            :
                            '#ffffff'
                        }
                    ]}
                />
            </View>
        </TouchableOpacity>
    )
}