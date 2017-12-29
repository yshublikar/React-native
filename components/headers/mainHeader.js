import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { headerBG, primaryColor, fs25 } from './../../style';
import { Col, Row, Grid } from 'react-native-easy-grid'; 
import Button from './../input_components/button';
import { connect } from 'react-redux';

class MainHeader extends Component{
	render(){
		const title = this.props.title;
		const {container, headding} = styles;

		return(
			<View style={container} >
				<Grid>
					<Row>
						<Col size={90}>
							<Text style={headding} >{title}</Text>
						</Col>
						<Col size={5} onPress={()=> null}>
							<Button name="plus" onPress={()=> this.props.navigation.navigate('Add_Coin', {action: 'Add', page: 'main' })}/>
						</Col>
						<Col size={5} onPress={()=> null}>
							<Button name="ellipsis-v" onPress={()=> console.log("hell2")}/>
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
		backgroundColor : headerBG
	},
	headding: {
		fontSize : fs25,
		margin: 5,
		color: primaryColor
	}
}

const mapStateToProps = (state) => {
	return { 
		head: state.head
	}
};

export default connect(mapStateToProps) (MainHeader)