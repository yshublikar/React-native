import React, {Component} from 'react';
import { headerBG, primaryColor, fs25 } from './../../style';
import {View, Text, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid'; 
import Button from './../input_components/button';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddHeader extends Component{
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
						<Col size={90}>
							<Text style={headding} >Add</Text>
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
		fontWeight: 'bold',
		color: primaryColor
	},
	back:{
		paddingTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
	}
}
