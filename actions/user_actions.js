import { UPDATE_USER_INFOS } from './types';

export const updateUserInfos = (name, phone) => {
	return {
		payload: { name, phone },
		type: UPDATE_USER_INFOS,
	};
}