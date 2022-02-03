import React from "react"
import {View,Text,TouchableOpacity} from "react-native";
import globals from "../common/globals";
import Ionicons from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import {switchLanguage} from "../redux/app/operations";
import {logout} from "../redux/user/operations";

const mapStateToProps = ({user, app}) => ({
    user,
    language: app.language,

});

@connect(
    mapStateToProps,
    {switchLanguage,logout}
)

export default class Header extends React.Component{
 render() {
     return(
         <View style={{flexDirection:'row',alignItems:'center',backgroundColor:globals.theme_color}}>


             <Ionicons onPress={this.props.navigation}
                       style={{flex:0.1,marginLeft:10,marginVertical:10}}
                       name={this.props.language.rtl?"arrow-forward":"arrow-back"}
                       size={35} color={'#fff'} />

             <Text style={{flex:0.8,textAlign:'center',alignSelf:'center',color:'#fff',fontFamily:globals.coconregularfont,fontSize:20}}>{this.props.title}</Text>
         </View> )
 }


}
