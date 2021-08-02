import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + 26,
        paddingHorizontal: 24,
        paddingBottom: 70
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    imageContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 150
    },
    text:{
        fontSize: 15
    },
    content:{
        marginBottom: 20
    },
    warn:{
        marginTop: 70,
        fontSize: 15,
        textAlign: 'center',
        color: 'red',
    },
    footer:{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        marginHorizontal: 24
    },
    logout:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logoutText:{
        fontSize: 18,
        marginLeft: 5
    }
})