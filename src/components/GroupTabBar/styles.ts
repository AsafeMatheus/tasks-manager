import { StyleSheet } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { theme } from "../../global/styles/theme"

export const styles = StyleSheet.create({
    container:{
        width: '100%'
    },
    image:{
        width: '100%',
        height: 220
    },
    bannerContent:{
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        paddingBottom: 15
    },
    title:{
        color: '#DDE3F0',
        fontSize: 20
    },
    description:{
        color: '#DDE3F0',
        fontSize: 15
    },
    back:{
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() 
    }
})