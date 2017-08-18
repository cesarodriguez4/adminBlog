import { combineReducers } from 'redux';

function markdown(state = [], action) {
	switch (action.type) {
		case 'NEW_TITLE':
		  return Object.assign({}, state, {
		  	title: action.text
		  });
		case 'MARKDOWN_CONTENT':
		  return Object.assign({}, state, {
		  	content: action.content
		  });
		case 'COVER':
		  return Object.assign({}, state, {
		  	cover: action.cover
		  });
		default:
		  return state;
	}
}

export default combineReducers({ markdown });
