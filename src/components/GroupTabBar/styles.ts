import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

import { adjust } from "../../global/functions"

export const styles = StyleSheet.create({
    container:{
        width: '100%'
    },
    image:{
        width: '100%',
        height: adjust(220)
    },
    bannerContent:{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        paddingHorizontal: adjust(24),
        justifyContent: 'flex-end',
        paddingBottom: 15
    },
    title:{
        color: '#DDE3F0',
        fontSize: adjust(20)
    },
    description:{
        color: '#DDE3F0',
        fontSize: adjust(15)
    },
    header:{
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        paddingHorizontal: adjust(24),
        paddingTop: getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center' 
    }
})