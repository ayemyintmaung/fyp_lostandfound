import instance from '../utils/api';
import { Notification } from 'element-react';
import 'element-theme-default';

export const getFoundItemListAPI = () => (dispatch) => {
	Notification({
		title: 'Success',
		message: 'Get Found Item',
		type: 'success',
		duration: 1500
	  });
	const promise = new Promise((resolve, reject) => {
		instance.get('found')
			.then((res) => {
				dispatch({type: 'GET_FOUND_ITEMS', value: 'Get Found Item'});
				resolve(res);
			}, (err) => {
				reject(err);
			})
	})

	return promise
}

export const getLostItemListAPI = ()=> (dispatch) => {
	Notification({
		title: 'Success',
		message: 'Get Lost Item',
		type: 'success',
		duration: 1500
	  });
	const promise = new Promise((resolve, reject) => {
		instance.get('lost')
			.then((res) => {
				dispatch({type: 'GET_LOST_ITEMS', value: 'Get Lost Item'});
				resolve(res);
			}, (err) => {
				reject(err);
			})
	})

	return promise
}
