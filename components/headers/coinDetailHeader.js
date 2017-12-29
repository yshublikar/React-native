import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { headerBG, primaryColor, fs25 } from './../../style';
import { Col, Row, Grid } from 'react-native-easy-grid'; 
import Button from './../input_components/button';
import Icon from 'react-native-vector-icons/FontAwesome';

class CoinHeader extends Component{
	render(){
		const title = this.props.title;
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
							<Text style={headding} >{title}</Text>
						</Col>
						<Col size={5} onPress={()=> null}>
							<Button name="plus" onPress={()=> this.props.navigation.navigate('Add_Coin', {action: 'Add', page: 'coinDetail', coinId: this.props.navigation.state.params.id })}/>
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

export default CoinHeader;