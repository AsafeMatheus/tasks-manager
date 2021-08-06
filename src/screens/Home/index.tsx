import React, { useState, useEffect } from "react"
import { 
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
    Alert,
    Text,
    View
} from "react-native"

import firebase from '../../config/firebaseconfig'

import { NavigationModal } from "../../components/NavigationModal"
import { SmallModal } from "../../components/SmallModal"
import { Task } from "../../components/Task"

import { SimpleLineIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { theme } from "../../global/styles/theme"
import { styles } from "./styles"

export function Home({ navigation, route } : any){  
    const [image, setImage] = useState('')  
    const [username, setUserName] = useState('')

    const [greeting, setGreeting] = useState('Hello')

    const [navigationModalVisible, setNavigationModalVisible] = useState(false)
    const [finishedModalVisible, setFinishedModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)

    const [newTask, setNewTask] = useState('')
    const [tasks, setTasks] : any = useState([])

    useEffect(() => {
        const today = new Date()
        const hour = today.getHours()

        if (hour < 12){
            setGreeting('Bom dia,')
        } else if (hour < 18){
            setGreeting('Boa tarde,')
        } else{
            setGreeting('Boa noite,')
        }

        firebase.firestore().collection(String(firebase.auth().currentUser?.uid)).doc("profile-image")
        .onSnapshot((doc) => {
            let data =  doc.data()
            setImage(data?.avatar)
        })

        setUserName(String(firebase.auth().currentUser?.displayName))

        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc("tasks")
        .collection('tasks-list')
        .orderBy('timestamp', 'desc')
        .onSnapshot((query) => {
            const list : any = []

            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })

            setTasks(list)
        })
    }, [])

    const addNewTask = () => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('tasks')
        .collection('tasks-list')
        .add({
            desc: newTask,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setNewTask('')
    }

    const deleteTask = (index:any) => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('tasks')
        .collection('tasks-list')
        .doc(index.id).delete()

        setDeleteModalVisible(true)
        setTimeout(() => setDeleteModalVisible(false), 1000)
    }

    const finishTask = (item : any) => {
        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('concluded-tasks')
        .collection('concluded-list')
        .add({
            title: item.desc,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        firebase.firestore().collection(String(firebase.auth().currentUser?.uid))
        .doc('tasks')
        .collection('tasks-list')
        .doc(item.id).delete()

        setFinishedModalVisible(true)
        setTimeout(() => setFinishedModalVisible(false), 1000)
    }

    

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.leftContent}>
                    <Image
                        style={styles.image}
                        
                        source={{ uri: `data:image/jpeg;base64,${image}` }}
                    />
                    <View style={styles.greeting}>
                        <Text style={styles.title}>
                            {greeting}
                        </Text>
                        <Text style={styles.title}>
                            {username}!
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => setNavigationModalVisible(true)}>
                    <SimpleLineIcons name="menu" size={30} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Task item={item} finished={() => finishTask(item)} deleted={() => deleteTask(item)}/>}
                style={styles.tasksList}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.inputWraper}>
                <TextInput
                    value={newTask}
                    placeholder='Nova tarefa'
                    onChangeText={text => setNewTask(text)}
                    style={styles.input}
                />

                <TouchableOpacity activeOpacity={0.7} onPress={addNewTask}>
                    <AntDesign name="pluscircle" size={45} color={theme.colors.highlight} />
                </TouchableOpacity>
            </View>

            <SmallModal
                title='deletado'
                textColor='red'
                visible={deleteModalVisible}
            />

            <SmallModal
                title='concluido'
                textColor='#388e3c'
                visible={finishedModalVisible}
            />

            <NavigationModal 
                closeView={() => setNavigationModalVisible(false)} 
                visible={navigationModalVisible} 
            />
        </SafeAreaView>
    )
}