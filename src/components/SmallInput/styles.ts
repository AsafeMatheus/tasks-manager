import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: 48,
        height: 48,
        backgroundColor: theme.colors.secondary,
        textAlign: 'center',
        padding: 10,
        borderRadius: 8,
        fontSize: adjust(15)
    }
})