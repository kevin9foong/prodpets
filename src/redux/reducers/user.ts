export interface UserState { 
	userUid: string | null
}

const initialState: UserState = {
	userUid: null
};

// define a slice reducer for our global state
const userReducer = (state = initialState, action): UserState => {
	switch(action.type) {
	case 'user/login': {
		return {
			userUid: action.payload.userUid
		};        
	} 
	case 'user/logout': {
		return {
			userUid: null
		};        
	}
	default: {
		return state; 
	}
	}
};

export default userReducer; 