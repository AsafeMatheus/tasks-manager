import { StyleSheet } from "react-native"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%'
    },
    title:{
        fontSize: adjust(15),
        marginBottom: 4
    },
    input:{
        width: '100%',
        borderRadius: 8,
        fontSize: adjust(15),
        padding: 10,
        height: 95,
        textAlignVertical: 'top'
    }
})