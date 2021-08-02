import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 26,
        backgroundColor: theme.colors.background,
        paddingBottom: 10
    }
})