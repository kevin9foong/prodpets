export const addTag = (tagName: string, cardUids: string[]) => ({
	type: 'tags/addTag', 
	payload: {
		tagName, 
		cardUids
	}
});

export const updateTag = (prevTagName, newTagName, newCardUids: string[]) => ({
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