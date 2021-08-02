import React from "react"
import { View, Text, TouchableOpacity } from "react-native"

import { styles } from "./styles"

type Props = {
    title: string,
    marked: boolean,
    set: () => void
}

export function MarkOption({ title, marked, set } : Props){
    return(
        <TouchableOpacity onPress={() => set()} activeOpacity={0.7}>
            <View style={styles.container}>
                <Text style={styles.title}>
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