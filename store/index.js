import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// AsyncStorage.clear();
const middleware = [];

const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(thunk),
		autoRehydrate()
	)	
);

export default store;	