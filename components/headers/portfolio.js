import React,{ Component } from 'react';
import { View, Text } from 'react-native';
import { headerBG, primaryColor, secondaryColor, thridColor, fs16, fs30 } from './../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Portfolio_Details extends Component{
		constructor(props){
			super(props)
		
		}
	render(){
		const { container, 
				TotalValue, 
				Profit, 
				Profit_Title,
				Portfolio,
				Profit_Pre,
				profitStyle } = styles;
				
			const {portfolio, profit, percentage} = this.props.coinsDetail&&this.props.coinsDetail.total || {
				"portfolio": 0.00,
				"profit": 0.00,
				"percentage": 0.00
			};	

		return(
				<View style={container}>
					<Grid>
						<Col style={{marginLeft:5}} size={60}>
							<Text style={ Portfolio }>Total Portfolio Value</Text>
							<Text style={ TotalValue }>
								<Icon name="rupee" size={27} color={primaryColor} /> 
						  		{(portfolio).toFixed(2)}
							</Text>
						</Col>
						<Col size={30} style={profitStyle}>
							<Text style={Profit_Title}>Profit</Text>
							<Text style={ Profit }>
						  		<Icon name="rupee" size={16} color={primaryColor} /> 
						  		{(profit).toFixed(2)}
						  		{
						  			profit < 0 ?
										<Icon name="arrow-down" size={15} color="red" /> 
						  			:
						  				<Icon name="arrow-up" size={15} color="green" /> 
						  		}
						 
							</Text>
							<Text style={Profit_Pre}>
								({(percentage).toFixed(2)}%)
							</Text>
						</Col>
					</Grid>
				</View>
			)
	}
}
const styles={
	container:{
		backgroundColor: headerBG,
		height: 75
	},
	Portfolio:{
		fontSize: fs16,
		color: primaryColor,
		opacity: 0.6
	},
	TotalValue:{
		fontSize: fs30,
		color: primaryColor,

	},
	Profit:{
		fontSize:18,
		marginTop: 5,
		color: primaryColor,
		alignItems: 'flex-start',
		flex: 1
	},
	Profit_Title:{
		fontSize: fs16,
		color: primaryColor,
		opacity: 0.6
	},
	Profit_Pre:{
		marginBottom: 2,
		color: primaryColor,
		flex: 1
	},
	profitStyle:{
		alignItems: 'flex-start'
	}
}

const mapStateToProps = (state) => {
	return { 
		coinsDetail: state.coinsDetail 
	}
};

export default connect(mapStateToProps, actions)(Portfolio_Details)