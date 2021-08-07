import React, { useState, useEffect } from "react"
import { 
    StatusBar
} from "react-native"

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import firebase from '../config/firebaseconfig'

import  { GroupConcluded }  from "../screens/GroupConcluded"
import { GroupTabBar } from "../components/GroupTabBar"
import { GroupAgenda } from "../screens/GroupAgenda"
import { GroupTasks } from "../screens/GroupTasks"

import { theme } from "../global/styles/theme"

const { Navigator, Screen } = createMaterialTopTabNavigator()

export function GroupNavigation({navigation, route} : any){
    const { groupId } = route.params

    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    
    useEffect(() => {
        const userId = String(firebase.auth().currentUser?.uid)
        const reference = firebase.firestore().collection(userId)
        .doc('groups')
        .collection('my-groups')
        .doc(groupId)

        reference.get().then(doc => {
            setDescription(doc.data()?.description)
            setImage(doc.data()?.image)
            setName(doc.data()?.name)
        })
    }, [])

    function GroupTasksComponent(){
        return(
            <GroupTasks 
                groupId={groupId}
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
                    activeTintColor: theme.colors.secondary10
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
                    component={GroupAgenda}
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