import { Tags } from '../reducers/tags';
import { RootState } from '../store';

export const selectAllTags = (state: RootState): Tags => state.tags; 

export const selectAllTagNames = (state: RootState): string[] => Object.keys(state.tags);