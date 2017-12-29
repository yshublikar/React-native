export default (state = null, action) => {
	switch (action.type){
		case 'setId':
			return action.payload;
		default:
			return state;
	}
}