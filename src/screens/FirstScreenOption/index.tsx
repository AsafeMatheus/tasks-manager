import React, { useState } from "react"
import { 
    SafeAreaView,
    Dimensions,
    Text,
    View 
} from "react-native"

import { AdMobBanner, setTestDeviceIDAsync } from 'expo-ads-admob'

import { Header } from "../../components/Header"
import { Button } from "../../components/Button"

import { styles } from "./styles"

setTestDeviceIDAsync('EMULATOR')

export function FirstScreenOption(){
    const [activated, setActivated] = useState(false)
    const deviceHeight = Dimensions.get('window').height

    return(
        <>
            {
                deviceHeight > 600 ?
                <SafeAreaView style={styles.container}>
                    <Header
                        title='Primeira tela'
                    />

                    <Text style={styles.description}>
                        Ao ativar essa opção, toda vez que você ligar o seu celular,
                        a primeira tela que você vai ver é a tela com as suas tarefas.
                        O objetivo dessa opção é evitar que você esqueça de verificar
                        suas tarefas. (obs: você poderá desativar essa opção a qualquer momento).
                    </Text>

                    <AdMobBanner
                        bannerSize="largeBanner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" 
                        servePersonalizedAds 
                        onDidFailToReceiveAdWithError={(err) => null}
                        style={styles.ad}
                    />

                    <View style={styles.footer}>
                        <Button
                            title={activated ? 'Desativar' : 'Ativar'}
                            onPress={() => setActivated(!activated)}
                        />
                    </View>
                </SafeAreaView>
                :
                <SafeAreaView style={styles.container}>
                    <View
                        style={styles.spacement}
                    >
                        <Header
                            title='Primeira tela'
                        />

                        <Text style={styles.description}>
                            Ao ativar essa opção, toda vez que você ligar o seu celular,
                            a primeira tela que você vai ver é a tela com as suas tarefas.
                            O objetivo dessa opção é evitar que você esqueça de verificar
                            suas tarefas. (obs: você poderá desativar essa opção a qualquer momento)
                        </Text>
                    </View>

                    <AdMobBanner
                        bannerSize="banner"
                        adUnitID="ca-app-pub-3940256099942544/6300978111" 
                        servePersonalizedAds 
                        onDidFailToReceiveAdWithError={(err) => null}
                        style={styles.smallAd}
                    />

                    <View style={[styles.footer, styles.spacement]}>
                        <Button
                            title={activated ? 'Desativar' : 'Ativar'}
                            onPress={() => setActivated(!activated)}
                        />
                    </View>
                </SafeAreaView>
            }   
        </>
    )
}