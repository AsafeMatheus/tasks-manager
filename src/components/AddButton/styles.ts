import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.highlight,
        padding: adjust(8)
    }
})