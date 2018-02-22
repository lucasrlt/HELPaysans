import { combineReducers } from 'redux';
import user from './user_reducer';
import sos from './sos_reducer';

export default combineReducers({
	user,
	sos,
});