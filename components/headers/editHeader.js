import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import { headerBG, primaryColor, fs25 } from './../../style';
import { Col, Row, Grid } from 'react-native-easy-grid'; 
import Button from './../input_components/button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {deviceId} from './../../config';
import httpService from './../httpProvider';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class EditHeader extends Component{

	deleteTransaction(){

		Alert.alert(
	  		'Delete Transaction',
	  		'Do you want to delete?',
	  		[
	    		{text: 'Delete', onPress: () => {	
					const transId = this.props.navigation.state.params.coin._id;
					const url = `delete-transaction/${deviceId}/${transId}`;
						const id= this.props.navigation.state.params.coin.coinType;
			            httpService.delete(url).then(response =>{
			            	const url = `koinex/${deviceId}?coinId=${id}`;
					            httpService.get(url).then(response =>{
					               this.props.transaction(response);
					               this.props.navigation.goBack();
					      	});
			        });
	    		}, style: {backgroundColor: 'red'}},
	    		
	    		{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
	  		],
	  		{ cancelable: false }
		)
  	}
	


	render(){
	
		const {container, headding} = styles;
		return(
			<View style={container} >
				<Grid>
					<Row>
						<Col size={10}>
							<TouchableOpacity style={styles.back} onPress={()=> this.props.navigation.goBack()} >
				           		<Icon name="arrow-left" size={22} color="white" />
				          	</TouchableOpacity >
						</Col>
						<Col size={80}>
							<Text style={headding} >Edit</Text>
						</Col>
						<Col size={10}>
							<TouchableOpacity style={styles.back} onPress={()=> this.deleteTransaction()} >
				           		<Icon name="trash-o" size={22} color="white" />
				          	</TouchableOpacity >
						</Col>
					</Row>
				</Grid>
			</View>
			)
	}
}

const styles ={
	container:{
		height : 40,
		backgroundColor : headerBG,
	},
	headding: {
		fontSize : fs25,
		margin: 5,
		color: primaryColor
	},
	back:{
		paddingTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
	}
}


export default connect(null, actions) (EditHeader)