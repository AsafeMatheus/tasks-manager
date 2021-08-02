import { AdMobInterstitial } from "expo-ads-admob"

export const globalFunctions = {
    handleInterstitialAd: async () => {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        await AdMobInterstitial.showAdAsync()
    }
}