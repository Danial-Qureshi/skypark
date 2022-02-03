import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Image, Modal, Text, View,TouchableOpacity} from 'react-native';
import globals from '../../common/globals';
import ButtonComponent from '../ButtonComponent';
import {Provider, TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAddress} from '../../redux/user/operations';
import CustomDropdown from '../../Components/CustomDropdown'

const list=[
    { label: 'Home', value: 'home' },
    { label: 'Office', value: 'office' },
    { label: 'Other', value: 'other' },
]

const mapStateToProps = ({user, app}) => ({
    app,
    user,
});


@connect(mapStateToProps, {createAddress})
class AddAddressModal extends PureComponent {
    constructor(props) {
        super(props);


        this.state = {
            isVisible: false,
            type:'',
            address: '',
            lat:null,
            lng:null,
        };
        this.updateData = this.updateData.bind(this)
    }

    updateData(data){
        console.log(JSON.stringify(data))
    }

    validation(){
        var check = false
        if (this.state.type===''){
            alert('Select Type')
        }else if (this.state.address===''){
            alert('Enter Address ')
        }else {
            check = true
        }
        return check;


    }




    createAddress(){
        if (this.validation()){
            let params = {
                type:this.state.type,
                address:this.state.address,
            }
            this.props.createAddress(params,this.props.user.accessToken).then((data)=>{
                if (data){
                    this.props.SetVisibilty()
                }
            })

        }

    }


    render() {
        const {data} = this.props;
        const {navigation} = this.props;
        //alert(JSON.stringify(project.freelancer))

        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                onRequestClose={this.props.SetVisibilty}
                visible={this.props.Visibility}>
                <Provider>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        paddingHorizontal: 15,
                    }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            paddingBottom: 10,
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: globals.theme_color,
                            justifyContent: 'space-between',
                            marginBottom: 20,
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5
                        }}>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                                paddingVertical: 10,
                                paddingHorizontal: 5,
                                marginLeft: 10
                            }}>Add Address</Text>
                            <Ionicons name={'close'} onPress={() => {
                                this.props.SetVisibilty(false)
                            }} style={{alignSelf: 'center', paddingHorizontal: 5, marginRight: 5}} size={24} color={'white'}/>

                        </View>
                        <View style={{backgroundColor: '#fff', margin: 10}}>
                        <CustomDropdown
                            label={'Type'}
                            mode={'outlined'}
                            value={this.state.type}
                            setValue={(value)=>{
                                this.setState({type:value})
                            }}
                            list={list}
                            visible={this.state.isVisible}
                            showDropDown={() => this.setState({isVisible:true})}
                            onDismiss={() => this.setState({isVisible:false})}
                            inputProps={{
                                right: <TextInput.Icon name={'menu-down'} />,
                            }}
                            theme={{colors: {primary: globals.theme_color,text:'black'}}}
                        />
                        </View>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate("MapScreen",{updateData:this.updateData})
                        }}>
                        <TextInput

                            left={
                                <TextInput.Icon
                                    name={() => (
                                        <Image resizeMode={'cover'}
                                               source={require('../../Images/password.png')}/>
                                    )}
                                />
                            }
                            editable={false}
                            placeholder={'Enter location'}
                            label="Location"
                            style={{backgroundColor: '#fff',marginBottom:20, marginHorizontal: 10}}
                            value={this.state.address}
                            mode={'outlined'}
                            theme={{colors: {primary: globals.theme_color}}}
                            onChangeText={(text) => this.setState({address: text})}
                        />
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center'}}>
                            <ButtonComponent onPress={() => {
                                this.createAddress()

                            }} extrastyle={{
                                width: '80%',
                                alignSelf: 'center',
                                marginBottom: 20,
                                borderRadius: 40,
                                backgroundColor: globals.theme_color,
                            }} title={'Save'}/>
                        </View>
                    </View>
                </View>
                </Provider>
            </Modal>
        );
    }
}

export default AddAddressModal;
