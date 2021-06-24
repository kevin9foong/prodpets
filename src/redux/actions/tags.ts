export const addTag = (tagName: string) => ({
	type: 'tags/addTag', 
	payload: {
		tagName
	}
});

export const updateTag = (prevTagName, newTagName) => ({
	type: 'tags/updateTag', 
	payload: {
		prevTagName, 
		newTagName
	}
});

export const deleteTag = (tagName: string) => ({
	type: 'tags/deleteTag', 
	payload: {
		tagName
	}
});