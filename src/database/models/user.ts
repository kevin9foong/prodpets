import db from '../index';
import 'firebase/firestore';

export type UserModel = { 
    uid: string, 
    displayName: string, 
    email: string, 
    photoURL: string
}

export const saveUser = (user: UserModel): Promise<void> => {
	return db.collection('users').doc(user.uid)
		.set({
			name: user.displayName, 
			email: user.email, 
			photoURL: user.photoURL
		});
};