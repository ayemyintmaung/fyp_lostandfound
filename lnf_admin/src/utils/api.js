import axios from 'axios';

const token = JSON.parse(localStorage.getItem('admintoken'));

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
		localStorage.removeItem('admintoken');

		return new Promise((resolve, reject) => {

			return window.location.href = '/admin/dashboard';
		})
	}

	if(error.response.status === 401 && error.response.data.error.message === 'Token has expired') {
		return instance.post('auth/refresh', null)
			.then((res) => {
				const config = error.config;		
				localStorage.removeItem('admintoken');
				localStorage.setItem('admintoken', JSON.stringify(res.data.token));
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