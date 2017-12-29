import { combineReducers } from 'redux';
import loadCoins from './loadCoinReducer';
import transaction from './transactionReducer';
import getId from './transactionIdReducer';

export default combineReducers({
	coinsDetail: loadCoins,
	transactions: transaction,
	transactionId: getId
});