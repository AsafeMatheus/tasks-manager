import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: adjust(15),
        marginBottom: 20
    },
    title:{
        fontSize: adjust(18)
    },
    information:{
        fontSize: adjust(13)
    },
    content:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    remember:{
        color: theme.colors.activeable
    }
})