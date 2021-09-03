import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: getStatusBarHeight() + adjust(26),
        backgroundColor: theme.colors.background,
        paddingBottom: 10
    },
    ad:{
        width: '100%',
        marginBottom: 20
    },
    content:{
        paddingHorizontal: 24,
        flex: 1
    },
    header:{
        paddingHorizontal: 24
    },
    list:{
        marginBottom: 2
    }
})