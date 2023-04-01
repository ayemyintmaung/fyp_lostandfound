import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'
import App from './containers/App';

import { i18n } from 'element-react'
import locale from 'element-react/src/locale/lang/en'

i18n.use(locale);


const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
)

if(localStorage.token) {
	console.log('localStorage is there')
	const token = JSON.parse(localStorage.token);
	store.dispatch({type: 'SET_LOGIN', value: token});
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));

serviceWorker.unregister();