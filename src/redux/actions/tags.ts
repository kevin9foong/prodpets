import { Tags } from '../reducers/tags';

export type upsertTagAction = { 
	type: 'tags/upsertTag', 
	payload: {
		tagName: string, 
		cardUids: string[]
	}
}

export type updateTagNameAction = {
	type: 'tags/updateTagName', 
	payload: {
		prevTagName: string, 
		newTagName: string
	}
}

export type addCardToTagAction = { 
	type: 'tags/addCardToTag', 
	payload: {
		tagName: string, 
		addedCardUid: string
	}
}

export type deleteCardFromTagAction = {
	type: 'tags/deleteCardFromTag', 
	payload: {
		tagName: string, 
		deleteCardUid: string
	}
}

export type deleteTagAction = { 
	type: 'tags/deleteTag', 
	payload: {
		tagName: string
	}
}

export type saveCardTagsAction = {
	type: 'tags/overwriteTags', 
	payload: {
		tags: Tags
	}
}

export const overwriteTags = (tags: Tags): saveCardTagsAction => ({
	type: 'tags/overwriteTags', 
	payload: {
		tags
	}
});

export const addCardToTag = (tagName: string, addedCardUid: string): addCardToTagAction => ({
	type: 'tags/addCardToTag',
	payload: {
		tagName, 
		addedCardUid
	}
});

export const deleteCardFromTag = (tagName: string, deleteCardUid: string): deleteCardFromTagAction => ({
	type: 'tags/deleteCardFromTag',
	payload: {
		tagName, 
		deleteCardUid
	}
});

export const upsertTag = (tagName: string, cardUids: string[]): upsertTagAction => ({
	type: 'tags/upsertTag', 
	payload: {
		tagName, 
		cardUids
	}
});

export const updateTagName = (prevTagName: string, newTagName: string): updateTagNameAction => ({
	type: 'tags/updateTagName', 
	payload: {
		prevTagName, 
		newTagName
	}
});

export const deleteTag = (tagName: string): deleteTagAction => ({
	type: 'tags/deleteTag', 
	payload: {
		tagName
	}
});