import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { primaryColor, fs30, menuColor } from './../../style';

export default class Menu_header extends Component{
	render(){
		const {container, gridStyle, align, textStyle} = styles;

		return(
				<View style={container}>
					<Grid style={gridStyle}>
						<Col size={20}>
							<Text style={textStyle}>Coin</Text>
						</Col>
						<Col size={30}>
							<Text style={textStyle}>Holdings</Text>
						</Col>
						<Col size={30}>
							<Text style={textStyle}>Rate</Text>
						</Col>
						<Col size={30}>
							<Text style={align}>Profit</Text>
						</Col>
					</Grid>
				</View>
			)
	}
}

const styles ={
	container: {
		height: fs30,
		backgroundColor: menuColor,
	},
	gridStyle:{
		marginLeft:5,
		alignItems: 'center',
	},
	align: {
		paddingLeft: 15,
		color: primaryColor,
		opacity: 0.8
	},
	textStyle:{
		color: primaryColor,
		opacity: 0.8
	}
}