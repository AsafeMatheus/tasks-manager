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
    description:{
        fontSize: 18,
        marginBottom: 40
    },
    footer:{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        marginHorizontal: 24
    }
})