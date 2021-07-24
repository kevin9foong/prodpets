export type loginAction = {
	type: 'user/login', 
	payload: { 
		userUid: string
	}
}

export type logoutAction = {
	type: 'user/logout'
}

export const login = (userUid: string): loginAction => ({
	type: 'user/login', 
	payload: { 
		userUid
	}
});

export const logout = (): logoutAction => ({
	type: 'user/logout'
});