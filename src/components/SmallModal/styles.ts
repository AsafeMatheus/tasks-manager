import { StyleSheet } from "react-native"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        position: 'absolute',
        top: adjust(80),
        padding: 10,
        alignItems: 'center'
    },
    title:{
        fontSize: adjust(18)
    }
})