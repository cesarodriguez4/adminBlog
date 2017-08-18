export function newTitle(text) {
	return { type: 'NEW_TITLE', text }
}

export function newContent(content) {
	return { type: 'MARKDOWN_CONTENT', content }
}

export function newCover(cover) {
	return { type: 'COVER', cover }
}