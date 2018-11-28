import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const FAB = (props) => {
    return (
        <TouchableOpacity {...props} >
            <Text style={[props.textStyle, {/*fontFamily: 'polly-bold'*/ }]}>{props.children}</Text>
        </TouchableOpacity>
    );
};

export { FAB };