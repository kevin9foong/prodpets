import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface UserState { 
	userUid: string | null
}

const initialState: UserState = {
	userUid: null
};

// 'slices' of our global redux state
const userSlice =  createSlice({
	name: 'user',
	initialState,
	reducers: {
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
