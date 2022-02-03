import React, {Component} from 'react';
import {ActivityIndicator, Image, ImageBackground, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import globals from '../../common/globals';
import {connect} from 'react-redux';
import ButtonComponent from '../../Components/ButtonComponent';
import {forgetPassword} from '../../redux/operations';
import I18n from 'react-native-i18n';
import {TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AvatarIcon from 'react-native-paper/src/components/Avatar/AvatarIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = ({user, app}) => ({
    user, app,
});


@connect(
    mapStateToProps,
    {forgetPassword},
)


class PhoneVerification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phone: '',
        };

    }

    validation() {
        var check = false;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.phone === '') {
            alert('Enter phone number');
        } else {
            check = true;
        }
        return check;

    }

    forgetPassword() {
        if (this.validation()) {
            var params = {
                // merchant_id: globals.merchant_id,
                phone: this.state.phone,
            };
            this.props.forgetPassword(params).then((data) => {
                if (data) {
                    this.setState({phone:''})
                    this.props.navigation.navigate('VerifyOTPScreen', {
                        isPassword: true,
                        phone: params.phone,

                    });
                }
            });
        }
    }


    render() {
        return (


            <ImageBackground style={{flex: 1}} resizeMode={'stretch'}
                             source={require('../../Images/background_image.png')}>
                <View style={{flex: 1}}>
                    <View>
                        <Ionicons
                            name={'chevron-back'}
                            size={30}
                            color={globals.theme_color}
                            style={{margin: 10}}
                            onPress={() => {
                                this.props.navigation.pop();
                            }}
                        />

                        <Text style={{
                            color: globals.theme_color,
                            fontSize: 28,
                            marginHorizontal: 20,
                            marginTop: 10,
                            marginBottom: 10,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                        }}>{'Phone Verification'}</Text>
                        <Text style={{
                            color: globals.theme_color,
                            fontSize: 16,
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}>{'Please enter your phone number to receive\n OTP'}</Text>
                    </View>
                    <View
                        style={{flex: 1, marginVertical: 10, marginHorizontal: 20}}>

                        <TextInput
                            keyboardType={'phone-pad'}
                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image resizeMode={'cover'}
                                               source={require('../../Images/phone.png')}/>
                                    )}
                                />
                            }
                            placeholder={'Enter your Phone Number'}
                            label="Phone #"
                            style={{backgroundColor: '#fff', marginVertical: 10}}
                            value={this.state.phone}
                            mode={'outlined'}
                            theme={{colors: {primary: globals.theme_color}}}
                            onChangeText={(text) => this.setState({phone: text})}
                        />

                        {this.props.user.isFetching ? <ActivityIndicator size={'large'} color={'red'}/> : null}

                        <ButtonComponent onPress={() => {
                            // this.forgetPassword();

                        }} extrastyle={{
                            width: '90%',
                            alignSelf: 'center',
                            marginVertical: 20,
                            borderRadius: 40,
                            backgroundColor: globals.theme_color,
                        }} title={'Send'}/>

                    </View>

                </View>

            </ImageBackground>


        );
    }
}

export default PhoneVerification;

