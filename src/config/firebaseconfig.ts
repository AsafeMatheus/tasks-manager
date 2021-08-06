import firebase from "firebase"
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCAONc2I0a3eEljncYO1ZcI1QI91TVRjVw",
    authDomain: "tasks-manager-4eb20.firebaseapp.com",
    projectId: "tasks-manager-4eb20",
    storageBucket: "tasks-manager-4eb20.appspot.com",
    messagingSenderId: "151317838131",
    appId: "1:151317838131:web:c35134752d62a07f2be646"
}

firebase.initializeApp(firebaseConfig)
//firebase.analytics()
export default firebase