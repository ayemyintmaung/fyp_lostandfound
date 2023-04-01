import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));

const instance = axios.create({
	baseURL: 'http://localhost:8081/api/',
	headers: {
		'Authorization': `Bearer ${token}`
	}
});

instance.interceptors.response.use((response) => {
	return response;
}, (error) => {

	if(error.response.status === 500 && error.response.data.error.message === 'Token has expired and can no longer be refreshed') {
		console.log('the token is deleted and the login page is logged out');
		console.log(error.response);
		localStorage.removeItem('token');

		return new Promise((resolve, reject) => {

			console.log('redirect to the login page')
			return window.location.href = '/login';
			// reject(error);
		})
	}

	console.log(error.response);

	if(error.response.status === 401 && error.response.data.error.message === 'Token has expired') {
		console.log('the token must be refreshed');
		return instance.post('auth/refresh', null)
			.then((res) => {
				const config = error.config;			
				localStorage.removeItem('token');
				localStorage.setItem('token', JSON.stringify(res.data.token));
				config.headers['Authorization'] = `Bearer ${res.data.token}`; 

				return new Promise((resolve, reject) => {
					axios.request(config).then(response => {
						resolve(response);
					}).catch((error) => {
						reject(error);
					})
				})
			})
			.catch((error) => {
				Promise.reject(error);
			})
	}

	return Promise.reject(error);
})

export default instance;