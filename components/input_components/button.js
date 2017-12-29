import React, { Component } from 'react';
import {View, TouchableOpacity } from 'react-native';
import { iconSize, primaryColor } from './../../style';
import Icon from 'react-native-fa-icons';
//import Icon from 'react-native-vector-icons/FontAwesome';

export default class Button extends Component{
  render(){
    return(
          <TouchableOpacity style={styles.container} onPress={this.props.onPress} >
           		<Icon name={this.props.name} style={styles.iconStyle} />
          </TouchableOpacity >
      )
    }
}

const styles ={
	container: {
		paddingTop: 12,
		paddingRight: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
  iconStyle:{ 
    fontSize: iconSize, 
    fontWeight: 'normal', 
    color: primaryColor
  }
  
}