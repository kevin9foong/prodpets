import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const store = configureStore({
	// fun fact! reducers are called reducers after the same idea of accumulate/reduce function (state + list of vals) => single val! 
	reducer: {
		// maps to final state value
		user: userReducer
	}
});

export default store; 
// for type docs for redux: https://redux.js.org/recipes/usage-with-typescript
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch