import React, { Component } from 'react';
import { fs14, fs16, borderColor, valueColor } from './../../style';
import {ScrollView,View, Image, Text} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import { connect } from 'react-redux';
import * as actions from './../../actions';

class Coin_detail_body extends Component{
	constructor(props){
		super(props)
	}
	renderCoins(){
		const {	firstRow,
				secondRow,
				labelStyle,
				valueStyle,
				dateContainer,
				sellStyle,
				buyStyle
				} = styles;

		return this.props.transactions&&this.props.transactions.map((coin) =>{	

			return(
					<Row key={coin._id}  onPress={() => 
											this.props.navigation.navigate('Edit_Coin', {
												action: "Edit",
												coin: coin, 
												coinId: coin.coinType,
												currentRate: this.props.currentRate ,
												page: "coinDetail",
												transType: coin.transactionType == 'Buy'? 0 : (coin.transactionType == 'Sell' ? 1 :2)
											})
										}>
						<Col>
							<Grid>
								<Row style={firstRow}>
									<Col size={30}>
										<Text style={labelStyle}>{coin.transactionType}</Text>
										<Text style={coin.transactionType ==='Sell'? sellStyle : buyStyle}>
											{coin.quantity}
										</Text>
									</Col>
									<Col size={30}>
										<Text style={labelStyle}>Price</Text>
										<Text style={valueStyle}>
											<Icon name="rupee" size={13} />
											{coin.rate}
										</Text>
									</Col>
									<Col size={20}>
										<Text style={labelStyle}>{coin.transactionType ==='Sell'?'Proceeds':'Cost'}</Text>
										<Text style={valueStyle}>
											<Icon name="rupee" size={13} />
											{coin.rate * coin.quantity}
										</Text>
									</Col>
								</Row>
								<Row style={secondRow}>
									<Col>
										<View style={dateContainer}>
											<Text>Date:  <Text style={valueStyle}>{Moment(coin.date).format('MMM DD YYYY')}</Text></Text>
										</View>
									</Col>
								</Row>
							</Grid>
						</Col>
					</Row>
				)
		})
	}

	render(){
		return(
				<Grid>
					{this.renderCoins()}		
				</Grid>
			)
	}
}
const rowColor = '#f4f6f7'
const styles= {
	firstRow: {
		paddingTop: 8,
		paddingLeft: 15,
 		
	},
	secondRow: {
 		borderBottomWidth:1,
 		paddingLeft: 15,
 		borderBottomColor: borderColor,
 		paddingBottom: 15,
	},
	labelStyle: {
		fontSize: fs14
	},
	valueStyle: {
		color: valueColor,
		fontSize: fs14
	},
	dateContainer: {
		paddingTop: 10
	},
	buyStyle:{
		color: 'green'
	},
	sellStyle:{
		color: 'red'
	}

}

const mapStateToProps = (state) => {
    return { 
        transactions: state.transactions&&state.transactions.trans,
        currentRate: state.transactions&&state.transactions.coin[0].rate 
    }
};

export default connect(mapStateToProps, actions) (Coin_detail_body)