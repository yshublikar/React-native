import React, { Component } from 'react';
import { headerBG, primaryColor, profitColor, lossColor, fs16 } from './../../style';
import {View, Text} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class Coin_summary extends Component{
	render(){
		const {container, 
				profitCol,
				summaryLabel,
				profitLabel,
				profit,
				loss,
				profitText,
				textStyle,
				netCol,
				headStyle} = styles;

		const coin = this.props.transactions&&this.props.transactions.coin[0] || {
			"holding": 0,
			"rate": 0,
			"buyRate": 0,
			"sellRate": 0
		}
		const summary =  this.props.transactions&&this.props.transactions.summary || {"profit": 0};
		
		return(
				<View style={container}>
					<Row>
						<Col size={50}>
							<Text style={summaryLabel}>{coin.name} Summary</Text>
						</Col>
						<Col size={50} style={profitCol}>
							<Text style={profitLabel}>Profit / Loss</Text>
							<View style={summary.profit < 0 ? loss : profit}>	
								<Text style={profitText}>
									<Icon name="rupee" size={13} />
									{(Math.abs(summary.profit)).toFixed(2)}
								</Text>
							</View>
						</Col>
					</Row>
					<Row>
						<Col size={30}>	
							<Text style={headStyle}>Holdings</Text>
							<Text style={textStyle}>{coin.holding}</Text>
						</Col>
						<Col size={25}>
							<Text style={headStyle}>Market Value</Text>
							<Text style={textStyle}>
								<Icon name="rupee" size={13} />
								{((coin.holding) * (coin.rate)).toFixed(2)}
							</Text>
						</Col>
						<Col size={30} style={netCol}>
							<Text style={headStyle}>Net Cost*</Text>
							<Text style={textStyle}>
								<Icon name="rupee" size={13} />
								{(Math.abs(coin.buyRate - coin.sellRate))}
							</Text>
						</Col>
					</Row>
				</View>
			)
	}
}

const styles ={
	container:{
		height: 120,
		paddingLeft: 15,
		paddingTop: 10,
		backgroundColor: headerBG,
	},
	profitCol: {
		alignItems: 'flex-end',
		paddingRight: 10
	},
	netCol: {
		alignItems: 'flex-end',
		paddingRight: 20
	},
	summaryLabel: {
		fontSize: fs16,
		color: primaryColor,
		opacity: 0.6
	},
	profitLabel: {
		fontSize: fs16,
		color: primaryColor,
		opacity: 0.6
	},
	profit: {
		backgroundColor: profitColor,
		padding: 6,
		borderRadius:5
	},
	loss: {
		backgroundColor: lossColor,
		padding: 6,
		borderRadius:5
	},
	profitText: {
		color: primaryColor
	},
	textStyle: {
		color: primaryColor,
	},
	headStyle: {
		color: primaryColor, 
		opacity: 0.6
	}

	
}

const mapStateToProps = (state) => {
    return { 
        transactions: state.transactions 
    }
};

export default connect(mapStateToProps) (Coin_summary)