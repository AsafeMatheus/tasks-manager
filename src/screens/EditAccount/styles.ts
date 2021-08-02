import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 26
    },
    Button:{
        width: '100%',
        marginTop: 50
    },
    inputs:{
        marginTop: 20
    },
    editPassword:{
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    editPasswodText:{
        color: '#dc2f02'
    }
})