import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        backgroundColor: theme.colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.secondary10,
        marginBottom: 20
    },
    actionWraper:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 57
    },
    action:{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    }
})