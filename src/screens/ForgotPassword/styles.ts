import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import { adjust } from '../../global/functions'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: adjust(24),
        paddingTop: getStatusBarHeight() + adjust(26),
        backgroundColor: theme.colors.background,
        paddingBottom: 10
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
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -40
    },
    button:{
        backgroundColor: theme.colors.highlight,
        padding: 10,
        borderRadius: 15,
        width: 220,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText:{
        color: '#ffffff',
        fontSize: adjust(18)
    },
    title:{
        fontSize: 30,
        marginBottom: 20,
        color: '#212121'
    }
})