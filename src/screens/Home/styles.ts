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
        borderRadius: 35
    },
    title:{
        fontSize: adjust(18),
        fontFamily: theme.fonts.title400
    },
    greeting:{
        marginLeft: adjust(20)
    },
    inputWraper:{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: adjust(24),
        alignItems: 'center'
    },
    input:{
        flex: 1,
        padding: adjust(10),
        borderRadius: 25,
        borderWidth: 1, 
        borderColor: theme.colors.secondary10,
        textAlign: 'center',
        fontSize: adjust(18),
        marginRight: 10,
        backgroundColor: '#ffffff'
    },
    tasksList:{
        marginBottom: 65
    }
})