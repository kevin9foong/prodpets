import { createStore, compose, applyMiddleware } from 'redux'; 
import { offline } from '@redux-offline/redux-offline';
// thunk is middleware used to delay eval/return until the promise has been resolved
// before passing to reducer
import thunkMiddleware from 'redux-thunk'; 
import offlineConfig from '@redux-offline/redux-offline/lib/defaults'; 
import rootReducer from './reducers';

const offlineEnhancer = offline(offlineConfig);

// stores application global state
// norifies subscribers about state updates
// can add enhancers to modify the stores dispatch, getState and subscribe methods. 
// middleware allow us to modify the dispatch function and chain functionality between 
// dispatching action & when the action reaches the reducer. 
// use middleware to deal with types of actions and perform side effects eg. async functionality  
// see: https://redux.js.org/tutorials/fundamentals/part-4-store for details on writing custom middleware.
const store = createStore(rootReducer, undefined, 
	compose(
		applyMiddleware(thunkMiddleware), 
		offlineEnhancer));



export default store; 
// for type docs for redux: https://redux.js.org/recipes/usage-with-typescript
export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch