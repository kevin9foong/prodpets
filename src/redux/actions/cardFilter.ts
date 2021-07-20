export type statusFilterTypes = 'all' | 'active' | 'completed'; 

export type changeCardFilterAction = {
	type: 'cardFilter/changeCardFilter', 
	payload: {
		statusFilter: statusFilterTypes
	}
}

export type changeCardTagFiltersAction = {
	type: 'cardFilter/changeCardTagFilters', 
	payload: {
		tagFilters: string[]
	}
}

export const changeCardFilter = (statusFilter: statusFilterTypes): changeCardFilterAction => ({
	type: 'cardFilter/changeCardFilter', 
	payload: { 
		statusFilter
	}
});

export const changeCardTagFilters = (tagFilters: string[]): changeCardTagFiltersAction => ({
	type: 'cardFilter/changeCardTagFilters', 
	payload: { 
		tagFilters
	}
}); 