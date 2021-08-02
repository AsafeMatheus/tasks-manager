import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'react-native'

import { Concluded } from '../screens/Concluded'
import { Profile } from '../screens/Profile'
import { Agenda } from '../screens/Agenda'
import { Groups } from '../screens/Groups'
import { Home } from '../screens/Home'

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

export function MainNavigation(){
    return(
        <>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        <Navigator tabBarOptions={{
            showLabel: false, 
            keyboardHidesTabBar: true,
            activeBackgroundColor: 'rgba(52, 52, 52, 0.1)'
        }}>
            <Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" size={24} color="black" />
                    )
                }}
            />
            <Screen
                name='Agenda'
                component={Agenda}
                options={{
                    tabBarLabel: 'Agenda',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="calendar" size={24} color="black" />
                    ),
                }}
            />
            <Screen
                name='Concluido'
                component={Concluded}
                options={{
                    tabBarLabel: 'Concluido',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="check" size={24} color="black" />
                    ),
                }}
            />
            <Screen
                name='Grupos'
                component={Groups}
                options={{
                    tabBarLabel: 'Grupos',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group" size={24} color="black" />
                    ),
                }}
            />
            <Screen
                name='Perfil'
                component={Profile}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={24} color="black" />
                    ),
                }}
            />
        </Navigator>
        </>
    )
}