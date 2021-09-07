import React from "react"
import {
    View
} from "react-native"

import { View as MotiView } from 'moti'

import { SimpleLineIcons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

import { theme } from "../../global/styles/theme"
import { styles } from './styles'

export function LoadingHome(){
    return(
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.leftContent}>
                        <MotiView
                            style={styles.image}
                            from={{ opacity: 0.2 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: 'timing' }}
                        />
                        <View style={styles.greeting}>
                            <View style={styles.title1} />
                            <View style={styles.title2} />
                        </View>
                    </View>
                    <SimpleLineIcons
                        name="menu"
                        size={30}
                        color={theme.colors.secondary}
                    />
                </View>
                <View
                    style={styles.botton}
                >
                    <View style={styles.inputWraper}>
                        <View
                            style={styles.input}
                        />
                        <AntDesign name="pluscircle" size={45} color={theme.colors.secondary} />
                    </View>
                </View>
            </View>
        </>
    )
}