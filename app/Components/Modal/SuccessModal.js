import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Image, Modal, Text, View} from 'react-native';
import globals from '../../common/globals';

import {EventRegister} from 'react-native-event-listeners';
import ButtonComponent from '../ButtonComponent';
import I18n from 'react-native-i18n';

const mapStateToProps = ({user, app}) => ({
    app,
    user,
});

// import {} from '../../redux/operations'

@connect(mapStateToProps, {})
class SuccessModal extends PureComponent {
    constructor(props) {
        super(props);


        this.state = {
            isVisible: false,
            description: '',
        };
    }


    render() {
        const data = this.props.data;

        //alert(JSON.stringify(project.freelancer))

        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={this.props.SetVisibilty}
                visible={this.props.Visibility}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        paddingHorizontal: 30,
                    }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            paddingVertical: 20,
                        }}><Text
                        style={{
                            fontWeight: 'bold',
                            marginTop: 10,
                            color: globals.theme_color,
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Thank You!
                    </Text>
                        <Text
                            style={{
                                marginVertical: 10,
                                color: globals.theme_color,
                                textAlign: 'center',
                                marginHorizontal:15,
                                fontSize:12
                            }}>
                            Your order is now being processed.We will let you
                            know once the order is picked from outlet.
                        </Text>

                        <View style={{justifyContent: 'center'}}>
                            <ButtonComponent onPress={() => {
                                this.props.SetVisibilty()
                                this.props.navigation.navigate("MyOrders")
                            }} extrastyle={{
                                width: '80%',
                                alignSelf: 'center',
                                marginBottom: 20,
                                borderRadius: 40,
                                backgroundColor: globals.theme_color,
                            }} title={'View Order'}/>
                            <ButtonComponent onPress={() => {
                                this.props.SetVisibilty()
                                this.props.navigation.navigate("Home")
                            }} extrastyle={{
                                width: '80%',
                                alignSelf: 'center',
                                borderRadius: 40,
                                borderWidth: 1,
                                borderColor: globals.theme_color,
                                backgroundColor: '#fff',
                            }} extraTextStyle={{color: globals.theme_color}}
                                             title={'Back To Home'}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default SuccessModal;
