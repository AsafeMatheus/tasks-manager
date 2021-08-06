import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + 26
    },
    footer:{
    },
    content:{
        paddingHorizontal: 24
    },
    ad:{
        marginTop: -10,
        marginBottom: 10
    },
    mark:{
        marginTop: 35
    }
})