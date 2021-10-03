import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

import { adjust } from "../../global/functions"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: adjust(24),
        paddingTop: getStatusBarHeight() + adjust(26),
        backgroundColor: theme.colors.background
    },
    footer:{
        width: '100%',
        position: 'absolute',
        marginHorizontal: adjust(24),
        bottom: 10
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mark:{
        marginTop: adjust(35)
    }
})