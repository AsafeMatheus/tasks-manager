import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 26
    },
    description:{
        fontSize: adjust(18)
    },
    footer:{
        width: '100%',
        position: "absolute",
        bottom: 20,
        marginHorizontal: 24,
        backgroundColor: theme.colors.background
    },
    ad:{
        position: "absolute",
        bottom: 150,
        marginLeft: 24
    }
})