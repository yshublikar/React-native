import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { headerBG, primaryColor, fs16, btnColor, secondaryColor, valueColor, rupeeColor, add_border_color } from './../../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Grid, Row, Col } from "react-native-easy-grid"; 
import httpService from './../httpProvider';
import * as actions from './../../actions';
import {deviceId} from './../../config';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { View,
        KeyboardAvoidingView, 
        Text,
        TextInput,
        Picker,
        DatePickerAndroid ,
        Button,
        TouchableOpacity,
        Alert
        } from 'react-native';

class Add_Edit_Coin extends Component{
  constructor(props){
    super(props)
    let transType = this.props.navigation.state.params.transType;
    this.state ={
      transactionType: transType === 0 ? 'Buy' : (transType === 1 ? 'Sell' : (transType === 1? 'Watch only': 'Buy')),
      selectRadioBtn : transType || 0,
      date: new Date(),
      currentRate: 0,
      coinType: null,
      quantity: "",
      coin: null,
      notes: "",    
      coins: [],
      rate: "",
      radioBtn: [ {label: "BUY", value: "Buy" }, 
                  {label: "SELL", value: "Sell"}, 
                  {label: "WATCH ONLY", value: "Watch only"}],
    }
  }
  
  componentWillMount(){
    const coinData = this.props.navigation.state.params.coin;
    const coinId = this.props.navigation.state.params.coinId;
    const data = {};
    let index = 0;
    
      httpService.get('getCoins').then(response =>{
            data.coins = response.coins;
            response.coins.forEach(function(coin, inx){
              if(coin.value == coinId){
                index = inx;
              }
            })

            data.coinType = response.coins[index].value;
            data.currentRate = response.coins[index].rate;
            data.coin = response.coins[index].name;
            
            if(coinData){
                  data.coinType = coinData.coinType;
                  data.currentRate = this.props.navigation.state.params.currentRate;
                  data.coin = coinData.coin;
                  data.notes = coinData.notes;
                  data.quantity = coinData.quantity.toString();
                  data.rate = coinData.rate.toString();
                  data.date = new Date(coinData.date);
            }
            this.setState(data)
        });
  }

  async renderCalender(){
    try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date()
        });
        if (action !== DatePickerAndroid.dismissedAction) {
            month++;
            this.setState({date: `${month<10? '0'+month : month}-${day<10? '0'+day : day}-${year}`});
        }

      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
    }
  }
  renderData(title, mesg){
    
    const url = `koinex/${deviceId}`;
            httpService.get(url).then(response =>{
              this.props.loadCoins(response);

            if(this.props.navigation.state.params.page === 'coinDetail'){
                const id = this.props.navigation.state.params.coinId;
                console.log("coinId", id)
                const url = `koinex/${deviceId}?coinId=${id}`;
                    httpService.get(url).then(res =>{
                      console.log("got the details", res)
                        this.props.transaction(res);
                        this.showAlert(title, mesg)
              });
            }else{
              this.showAlert(title, mesg)
            }
    });
  }
  showAlert(title, mesg){
      Alert.alert(
        title,
        mesg,
          [
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ],
          { onDismiss : ()=>  this.props.navigation.goBack()}
      )
  }

  addTransaction(){

      const transactionData = { coin: this.state.coin,
                      coinType : this.state.coinType,
                      currentRate: this.state.currentRate, 
                      transactionType: this.state.transactionType,
                      rate: this.state.rate,
                      quantity: this.state.quantity,
                      date: this.state.date,
                      notes: this.state.notes
                    } 
      if( transactionData.coinType != undefined && transactionData.currentRate != undefined 
          &&  transactionData.transactionType != undefined && transactionData.rate != undefined
          && transactionData.quantity != 0 && transactionData.date != undefined){

         /* if(transactionData.transactionType === 'Sell'){
              transactionData.quantity = parseInt(`-${transactionData.quantity}`); 
          }*/

          if(this.props.navigation.state.params.action === "Add"){
            const url = `add-transaction/${deviceId}`;
              httpService.post(url, transactionData).then(response =>{
                if(response.status == 'success'){
                  this.renderData('Transaction','Added succssfully');
                }
            });
          }else{
            const transId = this.props.navigation.state.params.coin._id;
            const url = `update-transaction/${deviceId}/${transId}`;
              httpService.put(url, transactionData).then(response =>{
                if(response.status == 'success'){
                  this.renderData('Transaction','Updated succssfully');
                }
            });
          }
          
      }else{
        Alert.alert(
          "Warning",
          "Fields are missing",
            [
              {text: 'OK', onPress: () => null},
            ],
            { onDismiss : ()=>  null}
        )
      }
  }

  render(){
    const buttonText = this.props.navigation.state.params.action == 'Add'? 'Save' : 'Update';
    const textUnderLineColor = 'green';
    const {itemStyle, 
            trading_container,
            label_style,
            radioBtn,
            static_value_style,
            valueStyle,
            inputBox,
            btnStyle,
            btnText
          } = styles;

    return(
          <KeyboardAvoidingView behavior="position">
            <Row style={itemStyle}>
                <Col size={60} style={trading_container}> 
                  <Text style={label_style}>Trading Pair</Text>
                </Col>
                <Col size={40}> 
                  <Picker
                    style = {{color: valueColor}}
                    selectedValue={this.state.coinType}
                    onValueChange={(itemValue, itemIndex) => this.setState({
                          coinType: itemValue,
                          coin: this.state.coins[itemIndex].name, 
                          currentRate: this.state.coins[itemIndex].rate 
                    })}>
                    {
                      this.state.coins.map((type)=> {
                        return (
                          <Picker.Item label={type.label} value={type.value} key={type.label}/>
                        )
                      })
                    }
                  </Picker>
                </Col>
            </Row>
            <View style={radioBtn}>
              <RadioForm 
                style={{marginLeft:5,marginTop: 10,marginBottom: 5 }}
                labelStyle={{paddingRight:35, color: valueColor}}
                buttonSize={10}
                buttonOuterSize ={20}
                formHorizontal={true}
                radio_props={this.state.radioBtn}
                initial={this.state.selectRadioBtn}
                onPress={(value) => {this.setState({transactionType: value})}}
              />
            </View>
            <Row style={itemStyle}>
                <Col size={60}>
                  <Text style={label_style}>Current Price</Text>
                </Col>
                <Col size={40} style={valueStyle}>
                  <Text style={static_value_style}>
                    <Icon name="rupee" size={15} color={rupeeColor} />
                    {this.state.currentRate}</Text>
                </Col>
            </Row>
            <Row style={itemStyle}>
                <Col size={60}>
                  <Text style={label_style}>Trade Price</Text>
                </Col>
                <Col size={40} style={valueStyle}>
                  <TextInput 
                    style={inputBox} 
                    name="rate"
                    placeholder="0"
                    underlineColorAndroid= {textUnderLineColor}
                    keyboardType="numeric"
                    onChangeText={(rate) => this.setState({rate})}
                    value={this.state.rate} />
                </Col>
            </Row>
            <Row style={itemStyle}>
                <Col size={60}>
                  <Text style={label_style}>Quantity</Text>
                </Col>
                <Col size={40} style={valueStyle}>
                  <TextInput 
                    style={inputBox} 
                    placeholder="0"
                    keyboardType="numeric"
                    underlineColorAndroid= {textUnderLineColor}
                    type="TextInput" 
                    name="quantity"
                    onChangeText={(quantity) => this.setState({quantity})}
                    value={this.state.quantity} />
                </Col>
            </Row>
            <Row style={itemStyle}>
                <Col size={60}>
                  <Text style={label_style}>Date</Text>
                </Col>
                <Col size={40} style={valueStyle}>
                  <Text style={static_value_style} onPress={()=> this.renderCalender()}>{Moment(this.state.date).format('MMMM DD YYYY')}</Text>
                </Col>
            </Row>
            <Row style={itemStyle}>
                <Col size={60}>
                  <Text style={label_style}>Total Value</Text>
                </Col>
                <Col size={40} style={valueStyle}>
                    <Text style={static_value_style}>
                      <Icon name="rupee" size={15} color={rupeeColor} />
                      {this.state.rate * this.state.quantity}
                    </Text>
                </Col>
            </Row>
              <TextInput 
                style={{borderWidth:1, height: 90, borderColor: add_border_color, borderTopWidth: 0}}
                placeholder="Notes..."
                underlineColorAndroid= 'transparent'
                type="TextInput" 
                multiline={true}
                numberOfLines={5}
                name="notes"
                onChangeText={(notes) => this.setState({notes})}
                value={this.state.notes}
                 />
                <TouchableOpacity style={btnStyle} onPress={() => {this.addTransaction()}}>
                  <Text style={btnText}>{buttonText}</Text>
                </TouchableOpacity>
         </KeyboardAvoidingView>
      )
  }
}

const styles = {
  itemStyle: {
    paddingLeft: 5,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: add_border_color,
    alignItems: 'center',
  },
  trading_container: {
    
  },
  label_style: {
    fontSize: fs16,
    color: valueColor
  },
  radioBtn: {
    borderBottomWidth: 1,
    borderBottomColor: add_border_color
  },
  static_value_style: {
    fontSize: fs16,
    color: valueColor
  },
  valueStyle:{
    marginRight: 10,
    alignItems: 'flex-start'
  },
  inputBox: {
    height: 45, 
    width: 150,
  },
  btnStyle: {
    height: 50,
    backgroundColor: btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  btnText:{
    color: primaryColor
  }
 
}

const mapStateToProps = (state) => {
  return { 
    getId: state.transactionId 
  }
};

export default connect(mapStateToProps, actions) (Add_Edit_Coin)