import React from "react"
import { StatusBar } from "react-native"
import { createStackNavigator } from '@react-navigation/stack'

import { GroupNavigation } from "./group.routes"
import { MainNavigation } from "./main.routes"

import { CreateGroupAgenda } from "../screens/CreateGroupAgenda"
import { FirstScreenOption } from "../screens/FirstScreenOption"
import { RemindersSettings } from "../screens/RemindersSettings"
import { CreateGroupTask } from "../screens/CreateGroupTask"
import { ForgotPassword } from "../screens/ForgotPassword"
import { CreateAgenda } from "../screens/CreateAgenda"
import { GroupMembers } from "../screens/GroupMembers"
import { GroupInvite } from "../screens/GroupInvite"
import { TaskMembers } from "../screens/TaskMembers"
import { EditAccount } from "../screens/EditAccount"
import { CreateGroup } from "../screens/CreateGroup"
import { EditAgenda } from "../screens/EditAgenda"
import { EditGroup } from "../screens/EditGroup"
import { Opening } from "../screens/Opening"
import { Removed } from "../screens/Removed"
import { SignUp } from "../screens/SignUp"
import { SignIn } from "../screens/SignIn"

const {Navigator, Screen} = createStackNavigator()

export function AuthRoutes(){
    return(
        <>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
        <Navigator
            headerMode='none'
            initialRouteName='Opening'
        >
            <Screen
                name='Opening'
                component={ Opening }
            />
            <Screen
                name='SignUp'
                component={ SignUp }
            />
            <Screen
                name='MainNavigation'
                component={ MainNavigation }
            />
            <Screen
                name='CreateAgenda'
                component={ CreateAgenda }
            />
            <Screen
                name='GroupNavigation'
                component={ GroupNavigation }
            />
            <Screen
                name='CreateGroupAgenda'
                component={ CreateGroupAgenda }
            />
            <Screen
                name='CreateGroupTask'
                component={ CreateGroupTask }
            />
            <Screen
                name='CreateGroup'
                component={ CreateGroup }
            />
            <Screen
                name='GroupMembers'
                component={ GroupMembers }
            />
            <Screen
                name='SignIn'
                component={ SignIn }
            />
            <Screen
                name='EditGroup'
                component={ EditGroup }
            />
            <Screen
                name='EditAgenda'
                component={ EditAgenda }
            />
            <Screen
                name='EditProfile'
                component={ EditAccount }
            />
            <Screen
                name='TaskMembers'
                component={ TaskMembers }
            />
            <Screen
                name='FirstScreenOption'
                component={ FirstScreenOption }
            />
            <Screen
                name='RemindersSettings'
                component={ RemindersSettings }
            />
            <Screen
                name='ForgotPassword'
                component={ ForgotPassword }
            />
            <Screen
                name='GroupInvite'
                component={ GroupInvite }
            />
            <Screen
                name='Removed'
                component={ Removed }
            />
        </Navigator>
        </>
    )
}