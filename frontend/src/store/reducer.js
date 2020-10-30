const initialState = {
	user : {
		is_authenticated : false
	}
}

const reducer = (state = initialState, action)=> {
	switch(action.type){
		case 'LOGIN':
			return {
				user: action.payload
			}
	}
	return state;
}

export default reducer;