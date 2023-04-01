import instance from '../utils/api';
import { Notification } from 'element-react';
import 'element-theme-default';

export const storeToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
  instance.defaults.headers.common.authorization = `Bearer ${token}`;
}

export const postFoundItemAPI = (data) => (dispatch) => {
	console.log(data);
	Notification({
		title: 'Success',
		message: 'Post Found Item Successful',
		type: 'success',
		duration: 1500
	  });
	const promise = new Promise((resolve, reject) => {
		instance.post('found/post', data)
			.then((res) => {
				dispatch({type: 'SET_POST_FOUND', value: 'Post Found Item'});
				resolve(res);
			}, (err) => {
				reject(err);
			})
	})

	return promise
}

export const postLostItemAPI = (data) => (dispatch) => {
	console.log(data);
	Notification({
		title: 'Success',
		message: 'Post Lost Item Successful',
		type: 'success',
		duration: 1500
	  });
	const promise = new Promise((resolve, reject) => {
		instance.post('lost/post', data)
			.then((res) => {
				console.log(res);
				dispatch({type: 'SET_POST_LOST', value: 'Post Lost Item'});
				resolve(res);
			}, (err) => {
				reject(err);
			})
	})

	return promise
}
