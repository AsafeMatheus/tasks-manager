import firebase from "firebase"
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyCOgt62NxhoRa2V2Oh0IraLreDrfraZigE",
    authDomain: "tasks-manager-ea3af.firebaseapp.com",
    projectId: "tasks-manager-ea3af",
    storageBucket: "tasks-manager-ea3af.appspot.com",
    messagingSenderId: "73792236925",
    appId: "1:73792236925:web:9f772d09266007acf4b014",
    measurementId: "G-R2NETMML0N"
}

firebase.initializeApp(firebaseConfig)
//firebase.analytics()
export default firebase