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
    footer:{
        width: '100%',
        paddingHorizontal: adjust(24),
        position: 'absolute',
        bottom: 10
    },
    content:{
        paddingHorizontal: adjust(24)
    },
    ad:{
        marginTop: -10,
        marginBottom: 10
    },
    mark:{
        marginTop: adjust(35)
    }
})