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

export function GroupTabBar(){
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <ImageBackground
                source={{uri: 'https://certificadocursosonline.com/wp-content/uploads/2017/09/curso-de-ingles-online-gratis-1280x720.jpg'}}
                style={styles.image}
            >
                <View style={styles.back}>
                    <TouchableOpacity onPress={() => navigation.navigate('Grupos')}>
                        <AntDesign name="arrowleft" size={24} color={theme.colors.heading} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Turma de inglês
                    </Text>
                    <Text style={styles.description}>
                        Eventos e trabalhos da turma número 8 do CCAA
                    </Text>
                </View>
            </ImageBackground>
        </View>
    )
}