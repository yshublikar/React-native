import React, {Component} from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Fab extends Component {
	render(){
		const Id = null;
		if(this.props.navigation.state.params&&this.props.navigation.state.params.id){
			this.Id = this.props.navigation.state.params.id;
		}
		
		return(
				<ActionButton
			          position="center"
			          offsetX={10}
			          offsetY={5}
			          verticalOrientation="up"
			          buttonColor="#E64886"
			          onPress={() => {this.props.navigation.navigate('Add_Coin', {action: "Add", page: this.props.page, coinId: this.Id })}}
			        />
			)
		}
}

