import { StyleSheet } from "react-native"
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + adjust(26)
    },
    ad:{
        marginBottom: adjust(30),
        width: '100%',
        alignItems: 'center'
    },
    spacement:{
        marginHorizontal: adjust(24)
    },
    membersList:{
        marginBottom: 135
    }
})