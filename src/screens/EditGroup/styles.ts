import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 26
    },
    ad:{
        marginTop: 40
    }
})