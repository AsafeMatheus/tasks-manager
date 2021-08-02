import React from "react"
import { StatusBar } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from "../global/styles/theme"

import { GroupConcluded } from "../screens/GroupConcluded"
import { GroupTabBar } from "../components/GroupTabBar"
import { GroupAgenda } from "../screens/GroupAgenda"
import { GroupTasks } from "../screens/GroupTasks"

const { Navigator, Screen } = createMaterialTopTabNavigator()

export function GroupNavigation(){
    return(
        <>
        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
        <GroupTabBar />
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
                    component={GroupTasks}
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