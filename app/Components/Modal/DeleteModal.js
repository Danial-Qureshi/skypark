import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, Modal, Text, TouchableOpacity, View} from 'react-native';
import globals from '../../common/globals';

import {EventRegister} from 'react-native-event-listeners';
import ButtonComponent from '../ButtonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mapStateToProps = ({user, app}) => ({
    app,
    user,
});

// import {} from '../../redux/operations'

@connect(mapStateToProps, {})
class DeleteModal extends PureComponent {
    constructor(props) {
        super(props);


        this.state = {
            isVisible: false,
            description: '',
        };
    }


    componentWillMount() {
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
                        backgroundColor: 'rgba(15,0,7,0.49)',
                        paddingHorizontal: 30,
                    }}>
                    <View style={{backgroundColor: '#fff', borderRadius: 20}}>
                        <Ionicons
                            onPress={() => {
                            }}
                            style={{margin: 20, marginBottom: 10, alignSelf: 'center'}}
                            name={'alert-circle-outline'}
                            color={globals.dark_grey}
                            size={27}
                        />
                        <Text
                            style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>
                            Are You sure you want to
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: 'red',
                                textAlign: 'center',
                            }}>

                            Delete
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    color: 'black',
                                }}>
                                {' '}
                                {this.props.name}
                            </Text>
                        </Text>

                        {this.props.user.isFetching || this.props.isFetching? (
                            <ActivityIndicator color="red" size="small"/>
                        ) : null}

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                                marginVertical: 10,
                                padding: 10,
                            }}>
                            <TouchableOpacity onPress={this.props.cancel}>
                                <Text
                                    style={{
                                        textDecorationLine: 'underline',
                                        color: globals.dark_grey,
                                    }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <ButtonComponent
                                extratextstyle={{fontSize: 13}}
                                onPress={this.props.yes}
                                title={'Yes'}
                                extraTouchableOpacitystyle={{
                                    width: '30%',
                                    backgroundColor: 'red'
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default DeleteModal;
