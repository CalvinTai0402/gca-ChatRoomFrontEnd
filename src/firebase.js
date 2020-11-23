import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIzMpzeCawi6mAquueHHo8jxFfEy2i_XI",
  authDomain: "whatsapp-6a677.firebaseapp.com",
  databaseURL: "https://whatsapp-6a677.firebaseio.com",
  projectId: "whatsapp-6a677",
  storageBucket: "whatsapp-6a677.appspot.com",
  messagingSenderId: "896350603374",
  appId: "1:896350603374:web:fd79f05ecd9a00be383e7f",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
