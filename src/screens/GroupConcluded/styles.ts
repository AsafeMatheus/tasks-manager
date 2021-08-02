import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 20
    },
    footer:{
        width: '100%',
        position: "absolute",
        bottom: 20,
        paddingHorizontal: 24,
        backgroundColor: theme.colors.background
    },
    ad:{
        width: '100%',
        marginBottom: 20
    },
    content:{
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 70
    }
})