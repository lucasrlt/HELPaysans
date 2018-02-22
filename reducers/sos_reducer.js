import { FETCH_PLANNING, FETCH_SOS_TYPES, ADD_SOS, FETCH_LIST_NAMES, DELETE_SOS } from '../actions/types';

const INITIAL_STATE = { 
	types: [],
	listNames: [],
	all: [],
	planning: {},
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_SOS_TYPES:
			return Object.assign({}, state, {
				types: action.payload,
			});
		case FETCH_LIST_NAMES:
			return Object.assign({}, state, {
				listNames: action.payload,
			});
		case FETCH_PLANNING: 
			return Object.assign({}, state, {
				planning: action.payload,
			})
		case ADD_SOS:
			return Object.assign({}, state, {
				all: [...state.all, action.payload],
			});
		case DELETE_SOS:
			let tmp = [];
			for(let i = 0; i < state.all.length; i++) {
				if (action.payload !== state.all[i]._id)
					tmp.push(state.all[i])
			}
			return Object.assign({}, state, {
				all: tmp,
			});
		default:
			return state;
	};
}