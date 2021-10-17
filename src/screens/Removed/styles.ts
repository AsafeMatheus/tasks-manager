import { StyleSheet } from 'react-native'
import { theme } from '../../global/styles/theme'

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background
    },
    title:{
        fontSize: 15,
        marginTop: 5
    },
    footer:{
      position: 'absolute',
      width: '100%',
      paddingHorizontal: 50,
      bottom: 100
    },
    loading:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})