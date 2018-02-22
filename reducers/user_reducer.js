import { UPDATE_USER_INFOS } from '../actions/types';

const INITIAL_STATE = {
	name: '',
	phone: '',
}

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case UPDATE_USER_INFOS:
			return action.payload;
		default: 
			return state;
	}
}