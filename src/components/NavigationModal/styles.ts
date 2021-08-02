import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    content:{
        width: '100%',
        backgroundColor: theme.colors.background
    }
})