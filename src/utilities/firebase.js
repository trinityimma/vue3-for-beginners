import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBmSH8x2gOKYJg4VJJbGb0YqjJkl_k47-c",
    authDomain: "vue-full-course-3f413.firebaseapp.com",
    projectId: "vue-full-course-3f413",
    storageBucket: "vue-full-course-3f413.appspot.com",
    messagingSenderId: "1068847998017",
    appId: "1:1068847998017:web:ab3b11c6071ea09ce392c0"
};
 
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export const chatsRef  = db.ref('chats');

export default firebase;
