import React, { useState, useEffect } from "react"
import { View, FlatList } from "react-native"

import { useNavigation } from "@react-navigation/native"
import firebase from '../../config/firebaseconfig'

import { GroupTask } from "../../components/GroupTask"
import { Button } from "../../components/Button"

import { styles } from "./styles"

type Props = {
    groupId: string
}

export function GroupTasks({ groupId } : Props){
    const navigation = useNavigation()

    const [userImage, setUserImage] = useState('')

    const [ tasks, setTasks ] : any = useState([])

    const username = String(firebase.auth().currentUser?.displayName)
    const userId = String(firebase.auth().currentUser?.uid)

    const ref = firebase.firestore().collection('groups')
    .doc(groupId)

    useEffect(() => {
        ref.collection('group-tasks')
        .orderBy('timestamp', 'desc')
        .onSnapshot((task) => {
            let list : any = []

            task.forEach((taskDoc) => {
                const membersList : any = []

                ref.collection('group-tasks')
                .doc(taskDoc.id)
                .collection('task-members')
                .onSnapshot((members: any) => {
                    
                    members.forEach((member : any) => {
                        firebase.firestore().collection(member.data().userId)
                        .doc('profile-image')
                        .onSnapshot((memberDoc) => {
                            let memberImage = memberDoc.data()?.avatar
                            let memberName = member.data()?.username
                            let memberId = member?.id

                            membersList.push({
                                image: memberImage,
                                username: memberName,
                                id: memberId
                            })
                        })  
                    })
                })

                list.push({
                    id: taskDoc.id, 
                    ...taskDoc.data(),
                    members: membersList
                })
            })

            setTasks(list)
        })
        
        firebase.firestore().collection(userId)
        .doc('profile-image')
        .onSnapshot((doc) => {
            setUserImage(String(doc.data()?.avatar))
        })
    }, [])

    const participate = (index : string) => {
        ref.collection('group-tasks')
        .doc(index)
        .collection('task-members')
        .add({
            userId,
            username
        })
    }

    return(
        <View style={styles.container}>
            <FlatList 
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return(
                        <GroupTask
                            data={item}
                            participateFunction={() => participate(item.id)} 
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
                        navigation.navigate('CreateGroupTask', {
                            groupId
                        })
                    }}
                />
            </View>
        </View>
    )
}