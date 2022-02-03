'use strict';

import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  View,
  Text,
  Platform,
} from 'react-native';
import globals from '../common/globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../Components/ButtonComponent';
import {connect} from 'react-redux';
import {finishIntro, getCities} from '../redux/app/operations';
import I18n from 'react-native-i18n';
import Geocoder from 'react-native-geocoding';

const mapStateToProps = ({user, app}) => ({
  app,
  user,
});

I18n.fallbacks = true;

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../locales/en'),
  ar: () => require('../locales/ar'),
};

@connect(mapStateToProps, {finishIntro, getCities})
class Splash extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.getCitiesApi();
    }, 1500);
  }

  getCitiesApi() {
    if (this.props.user.accessToken)
      this.props.navigation.replace('HomeScreen');
    else this.props.navigation.replace('LoginScreen');
  }

  selectedLanguage(lang, isRTl) {
    const fallback = {languageTag: lang, isRTL: isRTl};
    const {languageTag, isRTL} = fallback;
    // clear translation cache
    globals.strings.cache.clear();
    // update layout direction
    // I18nManager.forceRTL(isRTL);
    // set i18n-js config
    I18n.translations = {[languageTag]: translationGetters[languageTag]()};
    I18n.locale = languageTag;
  }

  componentDidUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any,
  ): void {
    this.selectedLanguage(
      nextProps.app.language.lang,
      nextProps.app.language.rtl,
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image resizeMode={'contain'} source={require('../Images/logo.png')} />
      </View>
    );
  }
}

export default Splash;
