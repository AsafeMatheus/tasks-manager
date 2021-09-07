import React from 'react'
import { StatusBar } from 'react-native'

import { LoadingHome } from './src/screens/LoadingHome'

import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { Quicksand_400Regular } from '@expo-google-fonts/quicksand'

import { Routes } from './src/routes'

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular
  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes />
    </>
  )
}