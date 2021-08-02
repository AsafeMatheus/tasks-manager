import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 35
    },
    leftContent:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    title:{
        fontSize: 18
    },
    information:{
        marginLeft: 10
    },
    members:{
        fontSize: 15
    }
})