import React from "react"
import { 
    TouchableOpacity, 
    View, 
    TouchableOpacityProps,
    Text,
    FlatList,
    Image 
} from "react-native"

import { Ionicons } from '@expo/vector-icons'

import { styles } from "./styles"

type memberProps = {
    id: string
    username: string,
    image: string
}

type GroupTaskprops = {
    id: string,
    title: string,
    date: string,
    amountOfPeople: number,
    members?: Array<memberProps>
}

type Props = TouchableOpacityProps & {
    data: GroupTaskprops,
    setPeople?: () => void
}

export function GroupTask({ setPeople, data, ...rest } : Props){
    const limit = data.amountOfPeople

    return(
        <View style={styles.container}>
            <TouchableOpacity
                {...rest}
                style={styles.content}
                activeOpacity={0.7}
            >
                <Text style={styles.title}>
                    {data?.title}
                </Text>

                <Text style={styles.date}>
                    Prazo: {data?.date}
                </Text>

                <FlatList 
                    data={data.members}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return(
                            <Image 
                                style={styles.memberImage}
                                source={{ uri: item.image }}  
                            />
                        )
                    }}
                    horizontal
                />
            </TouchableOpacity>

            {
                data.members ?
                data.members.length < limit ?
                <TouchableOpacity 
                    style={styles.handButton}
                >
                    <Ionicons name="hand-right-outline" size={40} color="black" />
                    <Text style={styles.participate}>
                        Participar
                    </Text>
                </TouchableOpacity>
                :
                <View />
                : <View />
            }
        </View>
    )
}