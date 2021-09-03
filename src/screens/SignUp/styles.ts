import { StyleSheet } from "react-native"
import { theme } from "../../global/styles/theme"
import { getStatusBarHeight } from "react-native-iphone-x-helper"
import { Dimensions} from 'react-native'

const deviceHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
        paddingTop: getStatusBarHeight() + 26,
        flexGrow: 1
    },
    Button:{
        width: '100%',
        marginTop: deviceHeight < 590 ? 28 : 40
    },
    inputs:{
        marginTop: 20
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText:{
        fontSize: 28
    }
})