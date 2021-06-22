import firebase from '../firebase';
import 'firebase/firestore';

const db = firebase.firestore();
// unfortunately, firebase is an offline-second database.
// we may want to change the database to mongodb realm in the future.
// db.enablePersistence(); does not work.

export default db; 