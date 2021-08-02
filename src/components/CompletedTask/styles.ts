import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    title:{
        flex: 1,
        color: theme.colors.copleted,
        paddingLeft: 10,
        fontSize: 18
    }
})