import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"

import { adjust } from '../../global/functions'

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: adjust(10)
    },
    image:{
        width: adjust(70),
        height: adjust(70),
        borderRadius: adjust(35)
    },
    leftContent:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    title:{
        fontSize: adjust(18)
    },
    information:{
        marginLeft: adjust(10)
    },
    members:{
        fontSize: adjust(15)
    },
    imageWithBorder:{
        width: adjust(70),
        height: adjust(70),
        borderRadius: adjust(35),
        borderWidth: 2,
        borderColor: theme.colors.secondary
    }
})