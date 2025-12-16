import React from 'react';
import { View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
//import EntypoIcon from 'react-native-vector-icons/Entypo.js';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IoniconIcon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useTheme } from 'react-native-elements';

export default function EventsIcon({ 
    icon, 
    fontType,
    style ,
}) {
    const size = moderateScale(20);    
    const { colors } = useTheme().theme;

    // if(fontType === 'EntypoIcon') {
    //     Icon = EntypoIcon;
    // }
    // if(fontType === 'FontAwesome') {
    //     Icon = FontAwesomeIcon;
    // }
    // if(fontType === 'FontAwesome5') {
    //     Icon = FontAwesome5Icon;
    // }
    // if(fontType === 'MaterialCommunityIcons') {
    //     Icon = MaterialCommunityIcon;
    // }
    // if(fontType === 'MaterialIcons') {
    //     Icon = MaterialIcon;
    // }
    // if(fontType === 'Ionicons') {
    //     Icon = IoniconIcon;
    // }
    // if(fontType === 'AntDesign') {
    //     Icon = AntDesignIcon;
    // }

    return (
        <View style={[styles.container, style]}>
            <Entypo size={2} name="cross" style={{ color: 'black' }} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '34@ms',
        height: '34@ms',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
