import React, { Component } from 'react';
import {ScrollView,View, Image, Text, AsyncStorage} from 'react-native';
import { primaryColor, valueColor, borderColor, fs12, fs16 } from './../../style';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import {apiURL} from './../../config';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Koinex_body extends Component{
	constructor(props){
		super(props)
		this.state ={
			coins: []
		}
	}
	percentage(per){
		if(per){
			return(
				<Text style={styles.profitPerText}>
					({Math.abs(per).toFixed(2)}%)
				</Text>
				)
		}
	}
	renderCoins(){
		const {	row,
				coinContainer, 
				coinImage, 
				coinText,
				holdings,
				rate,
				profit,
				profitText,
				valueStyle,
				profitPerText} = styles;
				
			const coins = this.props.coinsDetail&&this.props.coinsDetail.currentRate || [];

			return coins.map((coin) =>{
				return(
						<Row style={row} key={coin._id} onPress={() => this.props.navigation.navigate('Coin', {id: coin._id, title: coin.label })}>
							<Col size={18} style={coinContainer}>
								<Image style={coinImage} source={{uri: apiURL + coin.img}} />
								<Text style={coinText}>({coin.label})</Text>
							</Col>
							<Col size={30} style={holdings}>
								{
									coin.holding > 0? 
										<Text style={valueStyle}>
											<Icon name="rupee" size={13} />
											{(coin.rate * coin.holding).toFixed(2) }
										</Text>
									:null
									
								}
								<Text>{coin.holding}</Text>
							</Col>
							<Col size={25} style={rate}>
								<Text style={valueStyle}>
									<Icon name="rupee" size={13} />
									 {coin.rate}
								</Text>
							</Col>
							<Col size={38} style={coinContainer}>
								<Text style={profitText}>
									<Icon name="rupee" size={13} />
									{Math.abs(coin.profit.toFixed(2))}
									{
										coin.profit < 0 ?
											<Icon name="arrow-down" size={13} color="red"/>
										:
										coin.profit > 0?
											<Icon name="arrow-up" size={13} color="green"/>	
										: null
										
									}
									</Text>
								{this.percentage(coin.percentage)}
							</Col>
						</Row>
					)
       		 });

	}

	render(){
		return(
				<View>
					{this.renderCoins()}
				</View>
			)
	}
}
const styles= {
	row: {
		paddingTop: 5,
		backgroundColor: primaryColor,
 		paddingBottom: 2,
 		borderBottomWidth:1,
 		borderBottomColor: borderColor
	},
	coinContainer: {
		alignItems: 'center',
    	justifyContent: 'flex-start',
	},
	
	coinImage: {
		height: 35,
		width: 35,	
	},
	coinText: {
		fontSize: fs12
	},
	holdings: {
		marginTop: 5,
		marginLeft: 15,
	},
	rate: {
		marginTop: 5,
		marginLeft: 15
	},
	profit: {
		marginTop: 5,
		marginLeft:5
	},
	profitText: {
		fontSize: fs16,
		color: valueColor
	},
	profitPerText: {
		fontSize: fs12,
		marginLeft: 3
	},
	valueStyle:{
		color: valueColor
	}
}

const mapStateToProps = (state) => {
	return { 
		coinsDetail: state.coinsDetail 
	}
};

export default connect(mapStateToProps, actions) (Koinex_body)