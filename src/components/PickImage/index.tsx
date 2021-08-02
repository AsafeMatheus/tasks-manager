import React from "react"
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity,
    TouchableOpacityProps 
} from "react-native"
import { AntDesign } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    imageUrl: string
}

export function PickImage({ imageUrl, ...rest } : Props){
    return(
        <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
            {
                imageUrl ? <Image style={styles.image} source={{ uri: imageUrl}} />
                :
                <View style={styles.image} />
            }

            <Text style={styles.title}>
                Escolher imagem
            </Text>

            <AntDesign name="right" size={24} color={theme.colors.secondary20} />
        </TouchableOpacity>
    )
}