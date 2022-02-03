const React = require('react-native');
var {AppRegistry, Dimensions} = React;
import memoize from 'lodash.memoize';
import I18n from 'react-native-i18n';

const strings = memoize(
  (key, config) => I18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const merchant_id = 1;

const theme_color = '#294B7D';
const dark_theme_color = '#032d61';
const facebook_color = '#367FC0';
const gmail_color = '#DD4B39';
const lightgrey = '#E8E8E8';
const lightWhitegrey = 'rgb(239,231,231)';
const grey = 'rgba(186,185,185,0.84)';
const darkgrey = 'rgba(101,99,99,0.84)';
const darkBlackgrey = '#4A4B4D';

const GOOGLE_API_KEY = 'AIzaSyAnq1zs88nqRdpeMZ-L5czSm4r7p5mr7Z8';
const coconregularfont = 'Cocon';

const APP_KEY = '91bbe5da8d5af91f0ea8';
const APP_CLUSTER = 'ap2';

exports.theme_color = theme_color;
exports.lightgrey = lightgrey;
exports.grey = grey;
exports.dark_theme_color = dark_theme_color;
exports.facebook_color = facebook_color;
exports.gmail_color = gmail_color;
exports.darkgrey = darkgrey;
exports.coconregularfont = coconregularfont;
exports.lightWhitegrey = lightWhitegrey;
exports.darkBlackgrey = darkBlackgrey;
exports.merchant_id = merchant_id;
exports.strings = strings;
exports.GOOGLE_API_KEY = GOOGLE_API_KEY;
exports.APP_KEY = APP_KEY;
exports.APP_CLUSTER = APP_CLUSTER;
