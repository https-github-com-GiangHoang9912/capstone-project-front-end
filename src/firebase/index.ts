import firebase from 'firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAzFqM1rS1KcwT_-vHW2nfox6oYEbi38RU',
  authDomain: 'ddsgq-65c46.firebaseapp.com',
  projectId: 'ddsgq-65c46',
  storageBucket: 'ddsgq-65c46.appspot.com',
  messagingSenderId: '114876078861',
  appId: '1:114876078861:web:fe3e86640e873f6d32ee44',
  measurementId: 'G-JDD01KVVV1',
}

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default }
