import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 63,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.secondary10,
        overflow: 'hidden',
        paddingRight: 15,
        marginTop: 40
    },
    title:{
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: theme.colors.secondary20
    },
    image:{
        width: 63,
        height: 63,
        backgroundColor: theme.colors.secondary,
        borderRadius: 8,
        borderRightWidth: 1,
        borderColor: theme.colors.secondary10
    }
})