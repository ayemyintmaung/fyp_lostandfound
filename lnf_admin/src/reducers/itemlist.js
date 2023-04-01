const initialState = {
	isAuthenticated: false,
	loading: false,
	user: {},
	message: ''
};

const itemList = (state = initialState, action = {}) => {
	switch(action.type) {
		case 'GET_LOST_ITEMS':
			return {
				...state,
				message: action.value
			}
		case 'GET_FOUND_ITEMS':
			return {
				...state,
				message: action.value
			}
		case 'DELETE_FOUND_ITEM':
			return {
				...state,
				message: action.value
			}
		case 'DELETE_LOST_ITEM':
			return {
				...state,
				message: action.value
			}
		default: return state;
	}
}

export default itemList;