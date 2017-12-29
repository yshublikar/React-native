export default (state = null, action) => {
	switch (action.type){
		case 'load_coins':
			return action.payload;
		default:
			return state;
	}
}