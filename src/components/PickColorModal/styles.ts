import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.overflow,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content:{
        backgroundColor: '#ffffff',
        width: 250,
        //alignItems: 'center',
        //paddingVertical: 20,
        borderRadius: 8
    },
    title:{ 
        fontSize: 18
    },
    divider:{
        width: '100%',
        height: 1,
        backgroundColor: theme.colors.secondary10
    },
    button:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15
    }
})