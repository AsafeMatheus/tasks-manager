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
    title: string,
    amountOfPeople: number,
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
                        source={{ uri: data.image }}
                        style={styles.image}
                    />
                    <View style={styles.information}>
                        <Text style={styles.title}>{ data.title }</Text>
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