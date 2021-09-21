import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'

import firebase from './src/config/firebaseconfig'
import * as Linking from 'expo-linking'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { Quicksand_400Regular } from '@expo-google-fonts/quicksand'

import { Routes } from './src/routes'

export default function App() {
  //const navigation = useNavigation()

  const [data, setData] : any = useState(null)

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular
  })

  /*useEffect(() => {
    Linking.getInitialURL().then((ev) => {
      if (ev){
        let dataFromLinking = Linking.parse(ev)
        
        if (dataFromLinking.queryParams.group == 'true'){
          if (firebase.auth().currentUser?.uid){
            navigation.navigate('Grupos')
          }
        } 
      }
    }).catch((err) => console.log('An error ocurred: ' + err))
  }, [])*/

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes />
    </>
  )

  /*return(
    <View style={styles.container}>
      <Text>
        {data ? JSON.stringify(data.queryParams.group) : 'App not opened from a deep linking'}
      </Text>
    </View>
  )*/
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})