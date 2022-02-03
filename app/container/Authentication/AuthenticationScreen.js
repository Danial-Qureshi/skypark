import React, {Component} from 'react';
import {ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {login} from '../../redux/operations';
import I18n from 'react-native-i18n';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AvatarIcon from 'react-native-paper/src/components/Avatar/AvatarIcon';

const mapStateToProps = ({user, app}) => ({
    user, app,
});


@connect(
    mapStateToProps,
    {login},
)


class AuthenticationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

        };

    }


    render() {
        return (


            <ImageBackground resizeMode={'stretch'} source={require('../../Images/imageLogoBackground.png')}
                             style={{flex: 1,}}>
                <View style={{flex: 1}}>

                    <View style={{flex: 1}}/>

                    <View style={{flex: 0.57, justifyContent: 'center'}}>

                        <Text style={{marginHorizontal: 30, alignSelf: 'center', textAlign: 'center', fontSize: 16}}>
                            Discover the best foods from over 100 dishes
                            and fast delivery to your doorstep
                        </Text>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <ButtonComponent onPress={() => {
                                this.props.navigation.navigate('LoginScreen');
                            }} extrastyle={{
                                width: '80%',
                                alignSelf: 'center',
                                marginBottom: 20,
                                borderRadius: 40,
                                backgroundColor: globals.theme_color,
                            }} title={I18n.t('SIGNIN')}/>
                            <ButtonComponent onPress={() => {
                                this.props.navigation.navigate("SignUpScreen")
                            }} extrastyle={{
                                width: '80%',
                                alignSelf: 'center',
                                borderRadius: 40,
                                borderWidth:1,
                                borderColor: globals.theme_color,
                                backgroundColor:'#fff'
                            }} extraTextStyle={{color:globals.theme_color}} title={'Create an Account'}/>
                        </View>

                    </View>

                </View>

            </ImageBackground>


        );
    }
}

export default AuthenticationScreen;

