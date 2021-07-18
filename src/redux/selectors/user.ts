import { UserState } from '../reducers/user';
import { RootState } from '../store';

export const selectUser = (state: RootState): UserState => state.user; 