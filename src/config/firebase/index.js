  //*Import SDK Firebase
  import firebase from 'firebase/app'
  import 'firebase/auth'
  //   import 'firebase/firestore'

  var firebaseConfig = {
      apiKey: "AIzaSyBbVMH-nKBkshRZz4Omv2gkjaG1KrE4Tb0",
      authDomain: "simple-notes-firebase-9cc6c.firebaseapp.com",
      databaseURL: "https://simple-notes-firebase-9cc6c.firebaseio.com",
      projectId: "simple-notes-firebase-9cc6c",
      storageBucket: "simple-notes-firebase-9cc6c.appspot.com",
      messagingSenderId: "944606774426",
      appId: "1:944606774426:web:613974753d716eaeaacb23",
      measurementId: "G-ZM8RFGYDZ3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //   firebase.analytics();

  export default firebase;