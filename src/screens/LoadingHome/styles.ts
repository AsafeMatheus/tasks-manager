import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: adjust(24),
        paddingTop: getStatusBarHeight() + adjust(6.25)
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: adjust(40),
        justifyContent: 'space-between'
    },
    leftContent:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: theme.colors.secondary
    },
    title1:{
        marginBottom: 3
    },
    title2:{
        backgroundColor: theme.colors.secondary,
        width: 70,
        height: 15
    },
    greeting:{
        marginLeft: adjust(20)
    },
    inputWraper:{
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: adjust(24),
        alignItems: 'center'
    },
    input:{
        flex: 1,
        marginRight: 10,
    },
    botton:{
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    navigation:{
        backgroundColor: theme.colors.secondary,
        width: '100%',
        height: 48
    }
})