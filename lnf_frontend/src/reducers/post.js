const initialState = {
	isAuthenticated: false,
	loading: false,
	user: {},
	message: ''
};

const post = (state = initialState, action = {}) => {
	switch(action.type) {
		case 'SET_POST_LOST':
			return {
				...state,
				message: action.value
			}
		case 'SET_POST_FOUND':
			return {
				...state,
				message: action.value
			}
		default: return state;
	}
}

export default post;