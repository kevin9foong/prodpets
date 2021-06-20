import firebase from 'firebase/app';
import { firebaseConfig } from '../config/secrets';

firebase.initializeApp(firebaseConfig);

export default firebase; 