import React from "react"
import { 
    View, 
    Text,
    ImageBackground,
    TouchableOpacity 
} from "react-native"
import { useNavigation } from "@react-navigation/native"

import { AntDesign } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = {
    name: string,
    description: string,
    image: string
}

export function GroupTabBar({name, description, image} : Props){
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <ImageBackground
                source={{uri: `data:image/jpeg;base64,${image}` }}
                style={styles.image}
            >
                <View style={styles.back}>
                    <TouchableOpacity onPress={() => navigation.navigate('Grupos')}>
                        <AntDesign name="arrowleft" size={24} color={theme.colors.heading} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {name}
                    </Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}