import React, { useState } from "react"
import { View, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"

import { GroupTask } from "../../components/GroupTask"
import { Button } from "../../components/Button"

import { styles } from "./styles"

export function GroupTasks(){
    const navigation = useNavigation()

    const [ tasks, setTasks ] = useState([
        {
            id: '1',
            title: 'Fazer a maquete',
            date: '11/02/2021',
            amountOfPeople: 5,
            members:[
                {
                    id: '1', 
                    username: 'Asafe', 
                    image: 'https://www.github.com/AsafeMatheus.png'
                },
                {
                    id: '2', 
                    username: 'Renam', 
                    image: 'https://www.github.com/r3nanp.png'
                },
                {
                    id: '3',
                    username: 'Ilda',
                    image: 'https://www.github.com/ildaneta.png'
                },
                {
                    id: '4',
                    username: 'Ika',
                    image: 'https://www.github.com/ikatyang.png'
                }
            ]
        },
        {
            id: '2',
            title: 'Fazer o cartaz',
            date: '11/02/2021',
            amountOfPeople: 2,
            members:[
                {
                    id: '1', 
                    username: 'Filipe Deschamps', 
                    image: 'https://www.github.com/filipedeschamps.png'
                },
                {
                    id: '2',
                    username: 'Gilherme',
                    image: 'https://www.github.com/koenpunt.png'
                }
            ]
        },
        {
            id: '3',
            title: 'Decoração',
            date: '11/02/2021',
            amountOfPeople: 8,
            members:[
                {
                    id: '1', 
                    username: 'Aline Bastos', 
                    image: 'https://www.github.com/alinebastos.png'
                },
                {
                    id: '2', 
                    username: 'Borda', 
                    image: 'https://www.github.com/Borda.png'
                },
                {
                    id: '3', 
                    username: 'Guillaume Gomez', 
                    image: 'https://www.github.com/GuillaumeGomez.png'
                },
                {
                    id: '4', 
                    username: 'Izabella Silveira', 
                    image: 'https://www.github.com/bella-silveira.png'
                },
                {
                    id: '5', 
                    username: 'Ana Laura', 
                    image: 'https://www.github.com/isabellalealx.png'
                },
                {
                    id: '6', 
                    username: 'Biatrizs', 
                    image: 'https://www.github.com/isadorastan.png'
                },
            ]
        }
    ])

    return(
        <View style={styles.container}>
            <FlatList 
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return(
                        <GroupTask
                            data={item}
                            onPress={() => {
                                navigation.navigate('TaskMembers', {
                                    data: item.members,
                                    title: item.title
                                })
                            }}
                        />
                    )
                }}
                style={styles.content}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <Button 
                    title='Nova tarefa'
                    onPress={() => {
                        navigation.navigate('CreateGroupTask')
                    }}
                />
            </View>
        </View>
    )
}