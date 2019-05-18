import firebase from 'firebase';

var firebaseConfig = {
 apiKey: "AIzaSyBu2GMwpTkavUpWbWTyQvyajE_36u5cuW0",
 authDomain: "forumreactjs.firebaseapp.com",
 databaseURL: "https://forumreactjs.firebaseio.com",
 projectId: "forumreactjs",
 storageBucket: "forumreactjs.appspot.com",
 messagingSenderId: "321385750282",
 appId: "1:321385750282:web:da357810e2167da2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase.firestore().settings({
//  timestampsInSnapshots: true
// });

export default firebase;