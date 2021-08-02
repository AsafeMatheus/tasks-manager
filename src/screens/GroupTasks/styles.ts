import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 24
    },
    footer:{
        width: '100%',
        position: "absolute",
        bottom: 20,
        marginHorizontal: 24,
        backgroundColor: theme.colors.background
    },
    content:{
        marginBottom: 85
    }
})