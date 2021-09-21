import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + adjust(26),
    },
    ad:{
        marginBottom: adjust(40)
    },
    spacement:{
        marginHorizontal: adjust(24)
    },
    footer:{
        width: '100%',
        position: 'absolute',
        bottom: adjust(24),
        paddingHorizontal: adjust(24)
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})