import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        marginBottom: 40
    },
    title:{
        fontSize: adjust(20)
    },
    markView:{
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: theme.colors.secondary10
    }
})