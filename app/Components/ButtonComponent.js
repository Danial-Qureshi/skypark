import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import globals from '../common/globals';


export default function ButtonComponent({title, children, onPress, extrastyle, extraTextStyle, disabled = false}) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{
            backgroundColor: globals.theme_color,
            width: '100%',
            paddingVertical: 14,
            flexDirection: 'row',
            justifyContent: 'center',
        }, extrastyle]}>
            {children}
            <Text style={[{
                alignSelf: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
            }, extraTextStyle]}>{title}</Text>
        </TouchableOpacity>);
}
