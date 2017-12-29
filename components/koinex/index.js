import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { primaryColor } from './../../style';
import MainHeader from './../headers/mainHeader';
import Portfolio_Details from './../headers/portfolio';
import Menu_header from './../menus/coins_header';
import Koinex_body from './koinex_body';
import Fab from './../footers/fab';
import {deviceId} from './../../config';
import httpService from './../httpProvider';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import Loader from './../loader';

class Koinex extends Component {
    constructor(props){
        super(props)
        this.state ={}
    }
    componentWillMount(){
        const url = `koinex/${deviceId}`;
            httpService.get(url).then(response =>{
                this.props.loadCoins(response)
        });
    }

    render() {
        const {fabStyle} = styles;
        return ( 
            <View style={{flex: 1, backgroundColor: primaryColor}}>

                <View>
                 	<MainHeader navigation={this.props.navigation} title="Koinex"/>
                   	<Portfolio_Details />
                   	<Menu_header />
                </View>
                <ScrollView style={{flex: 1}}>
                    {
                        this.props.coinsDetail&&this.props.coinsDetail.currentRate.length>0?
                        <Koinex_body navigation={this.props.navigation}/> :
                        <Loader />
                    }
                    <Text style={fabStyle}></Text>
                    <Fab navigation={this.props.navigation} page='main'/>   
                </ScrollView>
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
        coinsDetail: state.coinsDetail 
    }
};

export default connect(mapStateToProps, actions) (Koinex)