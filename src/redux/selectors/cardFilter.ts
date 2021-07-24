import { RootState } from '../store';

export const selectTagFilters = (state: RootState): string[] => state.cardFilter.tagFilters;