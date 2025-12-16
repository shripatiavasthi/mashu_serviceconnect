import React from 'react';
import { Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export default function ApplicationText({ style:customStyle, children, ...props }) {
    return (
        <Text style={[styles.text, customStyle]} {...props}>{children}</Text>
    );
};

const styles = ScaledSheet.create({
    text: {
        //fontFamily: 'Lato',
        fontSize: '17@ms',
        color: '#333333'
    }
});
