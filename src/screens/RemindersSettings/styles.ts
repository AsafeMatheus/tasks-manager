import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: adjust(24),
        paddingTop: getStatusBarHeight() + adjust(26) 
    },
    description:{
        fontSize: adjust(18),
        marginBottom: 40
    },
    footer:{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        marginHorizontal: adjust(24)
    }
})