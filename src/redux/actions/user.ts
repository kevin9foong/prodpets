export const login = (userUid: string) => ({
	type: 'user/login', 
	payload: { 
		userUid
	}
});

export const logout = () => ({
	type: 'user/logout', 
});