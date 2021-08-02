import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 26
    },
    footer:{
        width: '100%',
        backgroundColor: theme.colors.background,
        marginTop: 45
    },
    ad:{
        marginTop: 35
    }
})