import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.overflow,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content:{
        backgroundColor: '#ffffff',
        width: 250,
        borderRadius: 8
    },
    title:{ 
        fontSize: adjust(18)
    },
    divider:{
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.secondary10
    },
    button:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15
    }
})