import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.secondary10,
        overflow: 'hidden',
        marginBottom: 20
    },
    title:{
        fontSize: adjust(18)
    },
    date:{
        fontSize: adjust(13),
        marginTop: adjust(8)
    },
    memberImage:{
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
        marginTop: 8
    },
    content:{
        flex: 1,
        margin: 10
    },
    handButton:{
        backgroundColor: theme.colors.secondary5,
        width: 85,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderLeftWidth: 1,
        borderLeftColor: theme.colors.secondary10
    },
    participate:{
        fontSize: adjust(13)
    }
})