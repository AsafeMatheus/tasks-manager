import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { Dimensions } from "react-native"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + 26
    },
    input:{
        width: '100%',
        fontSize: adjust(15),
        padding: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary10
    },
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        paddingHorizontal: 40
    },
    title:{
        fontSize: 30,
        marginBottom: 20,
        color: '#212121'
    },
    button:{
        backgroundColor: theme.colors.highlight,
        padding: 13,
        borderRadius: 15,
        width: 220,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText:{
        color: '#ffffff',
        fontSize: adjust(18)
    },
    header:{
        alignItems: 'center'
    },
    headerTitle:{
        fontSize: adjust(18)
    },
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    footerLeftText:{
        color: theme.colors.secondary15,
        fontSize: adjust(13)
    },
    link:{
        color: theme.colors.link,
        fontSize: adjust(13)
    },
    alertContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText:{
        marginLeft: 5,
        color: '#bdbdbd',
        fontSize: adjust(15)
    }
})