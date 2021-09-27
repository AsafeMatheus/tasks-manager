import React from "react"
import {
    View
} from "react-native"

import { Skeleton } from '@motify/skeleton'

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
                        <Skeleton
                            colorMode='light'
                            width={70}
                            height={70}
                            radius={35}
                        />
                        
                        <View style={styles.greeting}>
                            <View style={styles.title1}>
                                <Skeleton
                                    colorMode='light'
                                    width={100}
                                    height={15}
                                />
                            </View>

                            <Skeleton
                                colorMode='light'
                                width={80}
                                height={15}
                            />
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
                        <View style={styles.input}>
                            <Skeleton
                                colorMode='light'
                                width='100%'
                                height={47}
                                radius={25}
                            />
                        </View>

                        <AntDesign name="pluscircle" size={45} color={theme.colors.secondary} />
                    </View>
                </View>
            </View>
        </>
    )
}