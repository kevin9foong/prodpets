/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const defaultVal = { 
	login: () => {}, 
	logout: () => {}
};

const AuthContext = createContext(defaultVal);

export default AuthContext;
