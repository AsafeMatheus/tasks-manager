import React, { useEffect, useState } from "react"
import { 
    TouchableOpacity, 
    View, 
    TouchableOpacityProps,
    Text,
    FlatList,
    Image 
} from "react-native"

import firebase from '../../config/firebaseconfig'

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
    members: Array<memberProps>
    groupId: string,
    timestamp: string
}

type Props = TouchableOpacityProps & {
    data: GroupTaskprops,
    setPeople?: () => void,
    participateFunction: any
}

export function GroupTask(
    {
        setPeople,
        data,
        participateFunction,
        ...rest
    } 
    : Props
    ){
    const [participateButton, setParticipateButon] = useState(true)

    const limit = data.amountOfPeople

    return(
        <View style={styles.container}>
            <TouchableOpacity
                //{...rest}
                style={styles.content}
                activeOpacity={0.7}
                onPress={() => console.log(data.members)}
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
                                source={{ uri: `data:image/jpeg;base64,${item.image}` }}  
                            />
                        )
                    }}
                    horizontal
                />
            </TouchableOpacity>

            {
                data.members.length < limit && participateButton ?
                <TouchableOpacity 
                    style={styles.handButton}
                    onPress={participateFunction}
                >
                    <Ionicons name="hand-right-outline" size={40} color="black" />
                    <Text style={styles.participate}>
                        Participar
                    </Text>
                </TouchableOpacity>
                :
                <View />
            }
        </View>
    )
}