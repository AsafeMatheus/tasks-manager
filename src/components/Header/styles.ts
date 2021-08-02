import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        marginBottom: 45
    },
    title:{
        fontSize: 18
    }
})