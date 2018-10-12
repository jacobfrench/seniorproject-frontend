import React from 'react';
import { StyleSheet,View, TextInput,Image} from 'react-native';
import PropTypes from 'prop-types';
import { store } from 'app/src/redux/store';

export default class IconTextInput extends React.Component {
    render(){
        return(
            <View style={[styles.textInput, this.props.style]}>
                <View style={styles.iconContainer}>
                    <Image 
                        source={this.props.src} 
                        style={styles.inputIcon} 
                        resizeMode="contain"
                    />
                </View>
                <TextInput
                    {...this.props}
                    underlineColorAndroid='transparent'
                    style={[styles.input, styles.inputFont]}
                    placeholderTextColor={theme.onPrimary}
                    selectionColor={theme.onPrimary}
                />
            </View>
        );
    }

}

IconTextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
};

const theme = store.getState().settings.theme;
const styles = StyleSheet.create({
    inputFont: {
      color: theme.onPrimary,
    },
    input: {
      fontSize: 18,
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '70%'
    },
    iconContainer: {
      paddingHorizontal: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    textInput: {
        flexDirection: 'row',
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderRadius: 100,
        height: 45,
        elevation: 1
    },
    inputIcon: {
      width: 25,
      height: 25,
    }
  });
  