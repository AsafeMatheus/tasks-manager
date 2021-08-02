import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
        backgroundColor: theme.colors.background,
        paddingTop: 100
    },
    title:{
        fontSize: 30
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})