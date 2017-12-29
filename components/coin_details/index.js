import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { primaryColor } from './../../style';
import CoinHeader from './../headers/coinDetailHeader';
import Coin_summary from './../headers/coin_summary';
import Coin_detail_body from './coin_detail_body';
import Fab from './../footers/fab';
import {deviceId} from './../../config';
import httpService from './../httpProvider';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import Loader from './../loader';

class Coins extends Component {
    constructor(props){
        super(props)
        this.state ={}
    }
    componentWillMount(){
        const id = this.props.navigation.state.params.id;
        const url = `koinex/${deviceId}?coinId=${id}`;
            httpService.get(url).then(response =>{
               this.props.transaction(response);
        });
    }
    
    render() {
        const {fabStyle} = styles;
        const coin_data = this.props.navigation.state.params;
        return ( 
          <View style={{flex: 1, backgroundColor: primaryColor}}>
                <View>
                    <CoinHeader navigation={this.props.navigation} title={this.props.navigation.state.params.title} />
                    <Coin_summary />
                </View>
                	{
                        this.props.transactions&&this.props.transactions.trans.length> 0 || this.props.transactions&&this.props.transactions.trans.length == 0 ?
                        <ScrollView style={{flex: 1}}>
                            <Coin_detail_body navigation={this.props.navigation}/>
                            <Text style={fabStyle}></Text>
                            <Fab page="coinDetail" navigation={this.props.navigation}/>   
                         </ScrollView>
                        : 
                        <Loader />
                    }
        </View>

        )
    }
}

const styles = {
    fabStyle: {
        marginBottom : 60
    }
}

const mapStateToProps = (state) => {
    return { 
        transactions: state.transactions 
    }
};

export default connect(mapStateToProps, actions) (Coins)