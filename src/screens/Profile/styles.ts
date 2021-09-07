import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: getStatusBarHeight() + adjust(26),
        paddingHorizontal: adjust(24),
        paddingBottom: 70
    },
    image:{
        width: adjust(80),
        height: adjust(80),
        borderRadius: adjust(40)
    },
    imageContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        height: adjust(130)
    },
    text:{
        fontSize: adjust(15)
    },
    content:{
        marginBottom: adjust(20)
    },
    footer:{
        position: 'absolute',
        bottom: 10,
        width: '100%',
        marginHorizontal: adjust(24)
    },
    logout:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    logoutText:{
        fontSize: adjust(18),
        marginLeft: 5
    }
})