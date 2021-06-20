import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState { 
	userUid: string | null
}

const initialState: UserState = {
	userUid: null
	// userToken: null,
	// userId: null,
	// userName: null,
	// userAvatar: null
};

// 'slices' of our global redux state
const userSlice =  createSlice({
	name: 'user',
	initialState,
	reducers: {
		// RETRIEVE_TOKEN: (state, action: PayloadAction<UserState>) => {
		// 	state.userToken = action.payload.userToken;
		// }, 
		// LOGIN: (state, action: PayloadAction<UserState>) => {
		// 	state.userToken = action.payload.userToken,
		// 	state.userId = action.payload.userId,
		// 	state.userName = action.payload.userName,
		// 	state.userAvatar = action.payload.userAvatar;
		// }, 
		// LOGOUT: state => {
		// 	state.userToken = null,
		// 	state.userId = null,
		// 	state.userName = null,
		// 	state.userAvatar = null;
		// }
		LOGIN: (state, action: PayloadAction<UserState>) => {
			state.userUid = action.payload.userUid; 
		}, 
		LOGOUT: (state) => {
			state.userUid = null; 
		}
	}
});

export const selectUserUid = (state: RootState) => state.user.userUid;

// actions are auto-generated for us based on the reducers
export const { LOGIN, LOGOUT } = userSlice.actions; 
export default userSlice.reducer;
