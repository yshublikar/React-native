export const loadCoins = (coinDetails) =>{
	return{
		type: 'load_coins',
		payload: coinDetails
	};
};

export const transaction = (data) =>{
	return{
		type: 'transactions',
		payload: data
	};
};

export const setId = (id) =>{
	return{
		type: 'setId',
		payload: id
	};
};
