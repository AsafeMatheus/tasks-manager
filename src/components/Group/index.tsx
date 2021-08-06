import React from "react"
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    TouchableOpacityProps 
} from "react-native"

import { SimpleLineIcons } from '@expo/vector-icons'

import { styles } from "./styles"

export type GroupProps = {
    id: string,
    name: string,
    amountOfPeople?: number,
    image: string
}

type Props = TouchableOpacityProps & {
    data: GroupProps,
    openOptions: () => void
}

export function Group({ openOptions, data, ...rest } : Props){
    return(
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.7} {...rest}>
                <View style={styles.leftContent}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${data.image}` }}
                        style={styles.image}
                    />
                    <View style={styles.information}>
                        <Text style={styles.title}>{ data.name }</Text>
                        <Text style={styles.members}>membros: {data.amountOfPeople}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openOptions()}>
                <SimpleLineIcons name="options-vertical" size={30} color="black" />
            </TouchableOpacity>
        </View>
    )
}