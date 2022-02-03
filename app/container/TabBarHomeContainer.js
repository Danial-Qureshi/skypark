import React, {PureComponent} from 'react';

import {View, StyleSheet, Text, Image} from 'react-native';
import globals from '../../app/common/globals';
import connect from 'react-redux/lib/connect/connect';

const mapStateToProps = ({user, app}) => ({
  app,
  user,
});
@connect(mapStateToProps)
export default class TabBarHomeContainer extends PureComponent {
  _renderNumberWrap = (number = 0) => {
    return (
      <View style={styles.numberWrap}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );
  };

  render() {
    const {icon, tintColor, SelectedStyle, isFocused} = this.props;

    return (
      <Image
        source={require('../Images/home.png')}
        style={{
          height: 30,
          width: 30,
          alignSelf: 'center',
          tintColor: isFocused ? globals.theme_color : globals.darkBlackgrey,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  numberWrap: {
    position: 'absolute',
    top: -10,
    right: -10,
    height: 18,
    minWidth: 18,
    backgroundColor: 'white',
    borderRadius: 9,
  },
  number: {
    color: 'white',
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3,
  },
});
