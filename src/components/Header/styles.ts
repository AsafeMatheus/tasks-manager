import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust, adjustSpace } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        marginBottom: adjustSpace(45)
    },
    title:{
        fontSize: adjust(18)
    }
})