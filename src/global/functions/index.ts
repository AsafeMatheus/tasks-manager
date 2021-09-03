import { PixelRatio, Dimensions} from 'react-native'
import { AdMobInterstitial } from "expo-ads-admob"

export const globalFunctions = {
    handleInterstitialAd: async () => {
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true })
        await AdMobInterstitial.showAdAsync()
    }
}

// ADJUST FUNCTION 

const pixelRatio = PixelRatio.get()
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export const adjust = (size : number) => {
    if (pixelRatio <= 2){
        return size * 0.80
    }

    if (pixelRatio >= 2 && pixelRatio < 3) {
        if (deviceWidth < 360) {
            return size * 0.95
        }

        if (deviceHeight < 667) {
            return size

        } if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.15
        }
        
        return size * 1.25
    } 
    
    if (pixelRatio >= 3 && pixelRatio < 3.5) {
        if (deviceWidth <= 360) {
            return size
        }
        
        if (deviceHeight < 667) {
            return size * 1.15
        }

        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.2
        }
        
        return size * 1.27
    } 
    if (pixelRatio >= 3.5) {
        if (deviceWidth <= 360) {
            return size
        }

        if (deviceHeight < 667) {
            return size * 1.2
        }

        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 1.25
        }
        
        return size * 1.4
    } return size
}

export const adjustSpace = (space: number) => {
    if (deviceHeight <= 600){
        return space * 0.20
    } else{
        return space
    }
}