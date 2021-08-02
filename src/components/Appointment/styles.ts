import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        padding: 15,
        marginBottom: 20
    },
    title:{
        fontSize: 18
    },
    information:{
        fontSize: 13
    },
    content:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    remember:{
        color: theme.colors.activeable
    }
})