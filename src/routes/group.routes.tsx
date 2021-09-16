import React, { useState, useEffect } from "react"
import { 
    PixelRatio,
    StatusBar
} from "react-native"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import firebase from '../config/firebaseconfig'

import  { GroupConcluded }  from "../screens/GroupConcluded"
import { GroupTabBar } from "../components/GroupTabBar"
import { GroupAgenda } from "../screens/GroupAgenda"
import { GroupTasks } from "../screens/GroupTasks"

import { theme } from "../global/styles/theme"
import { adjust } from '../global/functions'

const { Navigator, Screen } = createMaterialTopTabNavigator()

export function GroupNavigation({navigation, route} : any){
    const { groupId, creatorId } = route.params

    const pixelRatio = PixelRatio.get()

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    
    useEffect(() => {
        const mainFunction = () => {
            const reference = firebase.firestore().collection('groups')
            .doc(groupId)

            reference.get().then(doc => {   
                setDescription(doc.data()?.description)
                setImage(doc.data()?.image)
                setName(doc.data()?.name)
            }).catch((err) => console.log(err))
        } 

        return mainFunction()
        
    }, [])

    function GroupTasksComponent(){
        return(
            <GroupTasks 
                groupId={groupId}
                groupCreator={creatorId}
            />
        )
    }

    function GroupAgendaComponent(){
        return(
            <GroupAgenda 
                groupId={groupId}
                groupCreator={creatorId}
            />
        )
    }

    return(
        <>
        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
            <GroupTabBar
                name={name}
                description={description}
                image={image}
            />
            <Navigator
                initialRouteName='GroupTasks'
                tabBarOptions={{
                    indicatorStyle:{
                        backgroundColor: theme.colors.secondary10
                    },
                    activeTintColor: theme.colors.secondary10,
                    labelStyle:{
                        fontSize: pixelRatio <= 2 ? adjust(11) : adjust(18)
                    }
                }}
            >
                <Screen
                    name='GroupTasks'
                    component={GroupTasksComponent}
                    options={{
                        tabBarLabel: 'Tarefas'
                    }}
                />
                <Screen
                    name='GroupAgenda'
                    component={GroupAgendaComponent}
                    options={{
                        tabBarLabel: 'Agenda'
                    }}
                />
                <Screen
                    name='GroupConcluded'
                    component={GroupConcluded}
                    options={{
                        tabBarLabel: 'Concluido'
                    }}
                />
            </Navigator>
        </>
    )
}