import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globals from '../../common/globals';
import ButtonComponent from '../ButtonComponent';

const BuyModal = ({isVisible, setVisibility, onPressYes, onPressNo}) => {
  return (
    <Modal
      animationType="slide"
      onRequestClose={setVisibility}
      transparent={true}
      visible={isVisible}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: 'rgba(21,20,20,0.8)',
        }}>
        <View
          style={{
            marginHorizontal: 40,
            paddingVertical: 20,
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingBottom: 20,
          }}>
          <Feather
            style={{margin: 20, marginBottom: 10, alignSelf: 'center'}}
            name={'box'}
            color={'#676767'}
            size={25}
          />

          <Text style={{fontSize: 14, textAlign: 'center', marginVertical: 5}}>
            Are You sure you want buy this{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              color: globals.theme_color,
            }}>
            Product?
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 30,
              marginTop: 20,
            }}>
            <ButtonComponent
              onPress={onPressNo}
              title={'No'}
              extrastyle={{width: '30%', backgroundColor: 'white'}}
              extraTextStyle={{color: 'black', fontSize: 12}}
            />

            <ButtonComponent
              onPress={onPressYes}
              title={'Yes'}
              extrastyle={{
                width: '30%',
                backgroundColor: globals.theme_color,
              }}
              extraTextStyle={{color: '#fff', fontSize: 12}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BuyModal;
