import instance from '../utils/api';

export const storeToken = (token) => {
  localStorage.setItem('admintoken', JSON.stringify(token));
  instance.defaults.headers.common.authorization = `Bearer ${token}`;
}

export const getUserListAPI = ()=> (dispatch) => {
	const promise = new Promise((resolve, reject) => {
		instance.get('user')
			.then((res) => {
				dispatch({type: 'GET_USER_LIST', value: 'Get User List'});
				resolve(res);
			}, (err) => {
				reject(err);
			})
	})

	return promise
}

export const deleteUserAPI = (id)=> (dispatch) => {
	const promise = new Promise((resolve, reject) => {
		instance.delete('user/'+id)
			.then((res) => {
				console.log("ASDSD");
				dispatch({type: 'DELETE_USER', value: 'Delete User'});
				resolve(res);
			}, (err) => {
				reject(err);
			})
	})

	return promise
}


