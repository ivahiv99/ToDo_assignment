import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAJfUymq_ZBOXeNaItfeon8jN8bs_eoa6Y",
    authDomain: "stafftodo-4ef6c.firebaseapp.com",
    databaseURL: "https://stafftodo-4ef6c.firebaseio.com",
    projectId: "stafftodo-4ef6c",
    storageBucket: "stafftodo-4ef6c.appspot.com",
    messagingSenderId: "61743514430"
};
firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;