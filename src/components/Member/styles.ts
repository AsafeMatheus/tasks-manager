import { StyleSheet } from "react-native"
import { adjust } from "../../global/functions"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    leftContent:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 25
    },
    informations:{
        marginLeft: 10
    },
    adminText:{
        fontSize: 10,
        color: theme.colors.activeable
    },
    adminBox:{
        borderColor: theme.colors.activeable,
        borderWidth: 0.5,
        alignItems: 'center',
        width: 65,
        justifyContent: 'center'
    },
    title:{
        fontSize: adjust(18)
    }
})