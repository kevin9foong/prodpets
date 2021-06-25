type filterTypes = 'all' | 'active' | 'completed'; 

export const changeCardFilter = (filterBy: filterTypes) => ({
	type: 'cardFilter/changeCardFilter', 
	payload: { 
		filterBy
	}
});

export const changeCardTagFilters = (tagFilters: string[]) => ({
	type: 'cardFilter/changeCardTagFilters', 
	payload: { 
		tagFilters
	}
}); 