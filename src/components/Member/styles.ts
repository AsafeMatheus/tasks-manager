import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    leftContent:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    image:{
        width: 50,
        height: 50,
        borderRadius: 25
    },
    title:{
        marginLeft: 10
    }
})