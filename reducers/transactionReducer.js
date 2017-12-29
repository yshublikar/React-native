export default (state = null, action) => {
	switch(action.type){	
		case 'transactions':
			const coin = {
							"summary": action.payload.total, 
							"trans": action.payload.transaction,
							"coin": action.payload.currentRate
						}
			return coin;
		default:
			return state;
	}
}