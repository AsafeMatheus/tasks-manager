import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + adjust(26)
    },
    Button:{
        width: '100%',
        position: 'absolute',
        bottom: 10,
        marginHorizontal: 24
    },
    inputs:{
        marginTop: 20
    },
    editPassword:{
        alignItems: 'center',
        marginTop: adjust(40),
        marginBottom: adjust(20)
    },
    editPasswodText:{
        color: '#dc2f02'
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})