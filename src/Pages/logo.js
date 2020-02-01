import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

import logo from '../Images/ham-icon.png';

const LogoTitle = () => (
    <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.openDrawer()} >
 
         <Image source={logo} style={{width: 30, height: 30}}></Image>
 
       </TouchableOpacity>
  
);

export default LogoTitle;
