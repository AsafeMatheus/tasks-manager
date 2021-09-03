import { StyleSheet } from "react-native"

import { adjust, adjustSpace } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        padding: adjust(15)
    },
    title:{
        fontSize: adjust(18)
    }
})