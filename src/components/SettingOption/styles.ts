import { StyleSheet } from "react-native"

import { adjust } from "../../global/functions"

export const styles =  StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
        padding: 15
    },
    title:{
        fontSize: adjust(18)
    }
})