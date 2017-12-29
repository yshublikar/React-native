import React, { Component } from 'react';
import {View} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Koinex from './components/koinex';
import Coins from './components/coin_details';
import Add_Edit_Coin from './components/add_coin';
import AddHeader from './components/headers/addHeader';
import EditHeader from './components/headers/editHeader';
import { connect } from 'react-redux';
import * as actions from './actions';


const Nav = StackNavigator({
	Koinex: {
	  	screen: Koinex,
	  	navigationOptions: {
		 	header: null
  		}
	},
	
	Coin:{
		screen: Coins,
		navigationOptions: {
			header: null
		}
	},
	Add_Coin: {
		screen: Add_Edit_Coin,
		navigationOptions: ({navigation}) => ({
			header: <AddHeader navigation={navigation} />	
		})
	},
	Edit_Coin: {
		screen: Add_Edit_Coin,
		navigationOptions: ({navigation}) => ({
			header: <EditHeader navigation={navigation} />	
		})
	}
});

class Navigation extends Component{

	render(){
		return(
				<Nav />
			)
	}
}


const mapStateToProps = (state) => {
	return { 
		head: state.head
	}
};

export default connect(mapStateToProps, actions) (Navigation)





