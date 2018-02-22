import { FETCH_SOS_TYPES, 
	ADD_SOS, 
	HOST, 
	FETCH_LIST_NAMES,
	DELETE_SOS,
	FETCH_PLANNING,
} from './types';
import axios from 'axios';

export const fetchListNames = () => async dispatch => {
	try {
		let { data } = await axios.get(`${HOST}/listNames`);
		dispatch({
			type: FETCH_LIST_NAMES,
			payload: data,
		});
	} catch(err) {
	}
}

export const fetchPlanning = () => async dispatch => {
	try {
		let { data } = await axios.get(`${HOST}/planning`);
		dispatch({
			type: FETCH_PLANNING,
			payload: data[0].items,
		});
	} catch(err) {
	}
}

export const fetchSOSTypes = () => async dispatch => {
	try {
		let { data } = await axios.get(`${HOST}/sosTypes`);
		dispatch({
			type: FETCH_SOS_TYPES,
			payload: data,
		});
	} catch(err) { 
		console.log(err);
	}
}

export const addSos = (sos) => async dispatch => { 
	try {
		let { data } = await axios.post(`${HOST}/newSos`, sos);
		dispatch({
			type: ADD_SOS,
			payload: data,
		});
	} catch(err) {
	}
}

export const deleteSOS = (id) => async dispatch => {
	try {
		let { data } = await axios.post(`${HOST}/deleteSos`, {id});
		dispatch({
			type: DELETE_SOS,
			payload: id,
		});
	} catch(err) {
	}
}