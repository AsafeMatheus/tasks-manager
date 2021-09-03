import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + adjust(26),
        paddingBottom: 80,
        backgroundColor: theme.colors.background
    },
    footer:{
        width: '100%',
        position: 'absolute',
        bottom: adjust(24),
        marginHorizontal: 24
    },
    title:{
        fontSize: adjust(15),
        marginBottom: 4
    },
    smallInputs:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator:{
        marginHorizontal: 5
    },
    time:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    alarm:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: adjust(30),
        marginTop: adjust(20),
        justifyContent: 'center'
    },
    alarmText:{
        fontSize: 15,
        marginLeft: 10
    },
    colorView:{
        flex: 1
    },
    pickColor:{
        flexDirection: 'row',
        width: '100%',
        height: 40,
        borderRadius: 8,
        borderColor: theme.colors.secondary10,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 40,
        marginTop: 40
    },
    colorPickerTextContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    colorPickerText:{
        fontSize: 15
    }
})