import React from 'react';
import ApplicationText from '../ApplicationText';
import { ScaledSheet } from 'react-native-size-matters';

export default function ApplicationParagraphText({ style, children, ...props }) {
    return (
        <ApplicationText 
            style={[styles.text, style]}
            {...props}>
            {children}
        </ApplicationText>
    );
};

const styles = ScaledSheet.create({
    text: {
        fontSize: '12@ms',
        color: '#666666',
    }
});