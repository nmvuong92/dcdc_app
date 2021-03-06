
import React,{Component} from 'react';
import { Text, Image, View,Platform } from 'react-native';
import { connect } from 'react-redux';


import FontAwesome from 'react-native-vector-icons/FontAwesome';


class CartBadgeIcon extends Component {

  render() {
    const { cartReducer } = this.props;
    //đếm số lượng sản phẩm trong giỏ hàng
    let count_cart_notification= cartReducer.cartItems.length;
    // below is an example notification icon absolutely positioned 
        return (
        <View style={{
            zIndex: 0,
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'space-around',
            alignItems: 'center',
            position:'relative',}}>
             <FontAwesome color="black" size={28} name="shopping-cart"/>
        {/* <Image source={require('./../../assets/images/icons/shopping_cart_32.png')}/> */}
        {count_cart_notification > 0 ?
            <View style={{
            position: "absolute",
            top: 0,
            right: Platform.OS==="ios"?20:0,
            borderRadius: 10,
            backgroundColor: 'red',
            paddingRight:3,
            paddingLeft:3,
          
            zIndex: 2}}>
            <Text style={{color:"white",fontSize:10}}>{count_cart_notification}</Text>
            </View>
            : undefined}
        </View>
        );
    }
}
export default connect((state)=>{
    return {cartReducer} = state;
})(CartBadgeIcon);