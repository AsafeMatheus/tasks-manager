import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + adjust(26)
    },
    ad:{
        marginBottom: 40,
        width: '100%',
        alignItems: 'center'
    },
    spacement:{
        marginHorizontal: adjust(24)
    }
})