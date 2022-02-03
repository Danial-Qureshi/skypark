import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import globals from '../common/globals';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function TextWithIcon({onPress, disabled, extratextstyle, extraTouchableOpacitystyle, title, children}) {

    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 10,
            borderBottomWidth: 0.5,
            borderColor: 'lightgrey',
            paddingBottom: 2.5,
        }, extraTouchableOpacitystyle]}>
            {children}
            <Text style={[{
                flex: 1,
                fontWeight: 'bold',
                marginHorizontal: 20,
                fontSize: 15,
                marginVertical:2.5,
                color: globals.theme_color,
            }, extratextstyle]}>{title}</Text>

        </TouchableOpacity>
    );

}

