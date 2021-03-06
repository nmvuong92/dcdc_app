import React,{Component} from 'react';
import {StackNavigator,TabNavigator,addNavigationHelpers,NavigationActions} from 'react-navigation';

import {connect} from 'react-redux';
import Home from './tabs/Home';
import Detail from './tabs/pages/Detail';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Image,Platform,Button,BackHandler,BackAndroid,NetInfo} from 'react-native';
import SanPham from './tabs/SanPham';
import KhuyenMai from './tabs/KhuyenMai';
import TaiKhoan from './tabs/TaiKhoan';
import TichDiem from './tabs/TichDiem';
import NganhHang from './tabs/NganhHang';
import GioHang from './tabs/GioHang';
import DonHang from './tabs/DonHang';
import CTDonHang from './tabs/pages/CTDonHang';
import ThanhToanForm from './tabs/pages/ThanhToanForm';
import CTArticle from './tabs/pages/CTArticle';


import CartBadgeIcon from './common/components/cartBadgeIcon';
import DonHangBadgeIcon from './common/components/donHangBadgeIcon';

import {StatusBar,AppState,View,StyleSheet} from 'react-native';


import {addListener} from './redux';
import Login from './tabs/pages/Login';
import Logout from './tabs/pages/Logout';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ChiTietSanPham from './tabs/ChiTietSanPham';

import{cartCRUD} from './actions/cartAction';
import {isIphoneX} from './common/vUtils';
import {getUser} from './common/Storage';
import {initialSyncSetUser} from './actions/authAction';
import {fetchDanhSachDonHang} from './actions/donHangAction';
import {fetchSanPhamTrangChu} from './actions/sanPhamTrangChuAction';
const opt_hide_tabbar={
    //tabBarVisible:false,
    header:null,
   // swipeEnabled:false
}



export const MainScreenNavigator = TabNavigator({
    HomeTab:StackNavigator({
        Home:{
            screen:Home,
            
            navigationOptions: {
                showLabel:true,
                showIcon:true,
                header:null,

                tabBarLabel:'Trang chủ',
                tabBarIcon:  <FontAwesome color="black" size={28} name="home"/>,
            }
        },
        Detail:{
            screen:Detail,
            navigationOptions:opt_hide_tabbar
        },
     
    
        ScreenNotOnTabbar:{
            screen:SanPham,
            navigationOptions:opt_hide_tabbar
        },
        ScreenNotOnTabbar2:{
            screen:TichDiem,
            navigationOptions:opt_hide_tabbar
        },
        Home_KhuyenMai_Wrap:StackNavigator({
            Home_KhuyenMaiScreen:{
                screen:KhuyenMai,
                navigationOptions:opt_hide_tabbar
            },
            Home_KhuyenMai_ChiTietSanPham_Wap:StackNavigator({
                Home_KhuyenMai_ChiTietSanPham_Screen:{
                    screen:ChiTietSanPham,
                    navigationOptions:opt_hide_tabbar,
                },
                Home_KhuyenMai_ChiTietSanPham_GioHang_Wrap:StackNavigator({
                    Home_KhuyenMai_ChiTietSanPham_GioHang_Screen:{
                        screen:GioHang,
                        navigationOptions:opt_hide_tabbar
                    },
                    Home_KhuyenMai_ChiTietSanPham_GioHang_ThanhToan_Screen:{
                        screen:ThanhToanForm,
                        navigationOptions:opt_hide_tabbar
                    },
                    Home_KhuyenMai_ChiTietSanPham_GioHang_ChiTietSanPham_Screen:{
                        screen:ChiTietSanPham,
                        navigationOptions:opt_hide_tabbar
                    },
                },{
                    navigationOptions:{
                        initialRouteName:"Home_KhuyenMai_ChiTietSanPham_GioHang_Screen",
                  }
                }), //Home_KhuyenMai_ChiTietSanPham_ChiTietSanPham_GioHang_Wrap 
            },{
                navigationOptions:{
                    initialRouteName:"Home_KhuyenMai_ChiTietSanPham_Screen",
                }
            }), //end Home_KhuyenMai_ChiTietSanPham_Wap
            
        },{
            navigationOptions:{
                initialRouteName:"Home_KhuyenMaiScreen",
                headerStyle:{
                    //marginTop:24
                }
            }
        }),
        LogoutScreen:{
            screen:Logout
        },
        TichDiem_Wrap:StackNavigator({
            TichDiem_Screen:{
                screen:TichDiem,
                navigationOptions: opt_hide_tabbar
            },
            TichDiem_CTDonHang_Screen:{
                screen:CTDonHang,
                navigationOptions: opt_hide_tabbar
            },
        },{
            navigationOptions:{
                initialRouteName:"TichDiem_Screen",
          }
        }), //Home_ChiTietSanPham_GioHang_Wrap {
           
        NganhHangScreen:{
            screen:NganhHang,
            navigationOptions:opt_hide_tabbar
        },

        Home_ChitietSanPham_Wrap:StackNavigator({
            Home_ChitietSanPham_Screen:{
                screen:ChiTietSanPham,
                navigationOptions: opt_hide_tabbar
            },
            Home_ChiTietSanPham_GioHang_Wrap:StackNavigator({
                Home_ChitietSanPham_GioHang_Screen:{
                    screen:GioHang,
                    navigationOptions: opt_hide_tabbar
                },
                Home_ChitietSanPham_GioHang_ThanhToan_Screen:{
                    screen:ThanhToanForm,
                    navigationOptions: opt_hide_tabbar
                },
                Home_ChitietSanPham_GioHang_ChiTietSanPham_Screen:{
                    screen:ChiTietSanPham,
                    navigationOptions:opt_hide_tabbar
                },
            },{
                navigationOptions:{
                    initialRouteName:"Home_ChitietSanPham_GioHang_Screen",
              }
            }), //Home_ChiTietSanPham_GioHang_Wrap 
        },{
            navigationOptions:{
                initialRouteName:"Home_ChitietSanPham_Screen",
          }
        }), //Home_ChitietSanPham_Wrap 

    },{
        navigationOptions:{
            headerStyle:{
                marginTop:24
            },
            tabBarLabel:'Trang chủ',
            tabBarIcon:  <FontAwesome color="black" size={28} name="home"/>,
        }
    }), //end home stack
    NganhHang:StackNavigator({
        SanPham:{
            screen:NganhHang,
            navigationOptions: {
                showLabel:true,
                showIcon:true,
                tabBarLabel:'Sản phẩm',
                
                header:null,
                tabBarIcon:<MaterialIcons color="black" size={28} name="view-comfy"/>,
            },
        },
        SanPham_Screen:{
            screen:SanPham,
            navigationOptions: {
                showLabel:true,
                showIcon:true,
                tabBarLabel:'Sản phẩm',
                
                header:null,
                tabBarIcon:<MaterialIcons color="black" size={28} name="view-comfy"/>,
            },
        },
        SanPham_NganhHang_Screen:{
            screen:NganhHang,
            navigationOptions:{
                header:null,
                tabBarLabel:'Sản phẩm',
                tabBarIcon:<MaterialIcons color="black" size={28} name="view-comfy"/>,
            }
        },
        SanPham_ChitietSanPham_Wrap:StackNavigator({
            SanPham_ChitietSanPham_Screen:{
                screen:ChiTietSanPham,
                navigationOptions: opt_hide_tabbar
            },
            SanPham_ChiTietSanPham_GioHang_Wrap:StackNavigator({
                SanPham_ChiTietSanPham_GioHang_Screen:{
                    screen:GioHang,
                    navigationOptions: opt_hide_tabbar
                },
                SanPham_ChiTietSanPham_GioHang_ThanhToanForm_Screen:{
                    screen:ThanhToanForm,
                    navigationOptions:opt_hide_tabbar
                },
                SanPham_ChiTietSanPham_GioHang_ChiTietSanPham_Screen:{
                    screen:ChiTietSanPham,
                    navigationOptions:opt_hide_tabbar
                },
            },{
                navigationOptions:{
                    initialRouteName:"SanPham_ChiTietSanPham_GioHang_Screen",
                    tabBarLabel:'Sản phẩm',
                    tabBarIcon:<MaterialIcons color="black" size={28} name="view-comfy"/>,
              }
            }), //end ChiTietSanPham_GioHang_Screen
        },{
            navigationOptions:{
                initialRouteName:"SanPham_ChitietSanPham_Screen",
                headerStyle:{
                    //marginTop:24
                },
                tabBarLabel:'Sản phẩm',
                tabBarIcon:<MaterialIcons color="black" size={28} name="view-comfy"/>,
            }
        }),
    }), //end san pham stack
    GioHangTab:StackNavigator({
        GioHangScreen:{
            screen:GioHang,
            navigationOptions: {
                showLabel:true,
                showIcon:true,
                header:null,

                tabBarLabel:'Giỏ hàng',
                tabBarIcon: <CartBadgeIcon/>,
            }
        },
        GioHang_ThanhToanForm_Screen:{
            screen:ThanhToanForm,
            navigationOptions:opt_hide_tabbar
        },
        GioHang_ChiTietSanPham_Screen:{
            screen:ChiTietSanPham,
            navigationOptions:opt_hide_tabbar
        },
        GioHang_ThanhToan_DonHang_Screen:{
            screen:DonHang,
            navigationOptions:opt_hide_tabbar
        },
        ThanhToan_Screen:{
            screen:ThanhToanForm,
            navigationOptions:opt_hide_tabbar
        },
    },{
        navigationOptions:{
            initialRouteName:"GioHangScreen",
           tabBarLabel:'Giỏ hàng',
            tabBarIcon: <CartBadgeIcon/>,
        }
    }), //end ChiTietSanPham_GioHang_Screen
    DonHangTab:StackNavigator({
        DonHangScreen:{
            screen:DonHang,
            navigationOptions: {
                showLabel:true,
                showIcon:true,
                header:null,
                tabBarLabel:'Đơn hàng',
                tabBarIcon: <DonHangBadgeIcon/>,
            },
        },
        DonHang_CTDonHang_Screen:{
            screen:CTDonHang,
            navigationOptions:opt_hide_tabbar
        },
    },{
        navigationOptions:{
            initialRouteName:"DonHangScreen",
            tabBarLabel:'Đơn hàng',
            tabBarIcon: <DonHangBadgeIcon/>,
        }
    }), //end don hang tab
    TaiKhoanTab:StackNavigator({
        TaiKhoan_Screen:{
            screen:TaiKhoan,
            navigationOptions: {
                showLabel:true,
                showIcon:true,
                //tabBarLabel:'Tài khoản',

                //
                header:null,
                tabBarLabel: 'Tài khoản',
                tabBarIcon:  <FontAwesome color="black" size={28} name="user"/>
            }
        },
        CTArticle_Screen:{
            screen:CTArticle,
            navigationOptions:opt_hide_tabbar
        },
    },{
        navigationOptions:{
            initialRouteName:"TaiKhoan_Screen",
            tabBarLabel: 'Tài khoản',
            tabBarIcon:  <FontAwesome color="black" size={28} name="user"/>
        }
    }), //end don hang tab
},{
   
    initialRouteName: 'HomeTab',
    tabBarPosition:'bottom',
    //swipeEnabled:true,
    swipeEnabled:false,
    showIcon:true,
    showLabel:true,
    tabBarOptions:{
        style:{
            backgroundColor:"white",
        },
        
        activeTintColor: 'red',
        //activeBackgroundColor :'yellow',  //Doesn't work
        inactiveTintColor:"gray",
        showIcon:true,
        showLabel:true,
        tabStyle: {
            padding: 0, margin:0,  //Padding 0 here
        },
        iconStyle: {
            padding:0,
           
        },
        labelStyle:{
            fontSize:11
        },
      

    },
   
    cardStyle:{
       // paddingTop:isIphoneX()?100:Platform.OS==="ios"?20:0,//StatusBar.currentHeight
    },

});

class MainScreenNavigatorState extends Component{
   

       constructor(props){  
           super(props);
           //
           this.state={
                appState: AppState.currentState
           }
       }

        shouldCloseApp(nav) {
            return nav.index == 0;
        }
        componentDidUpdate(){
            console.log(this.props.navigation);
        }
        //Handling the Hardware Back Button in Android
        componentDidMount() {
            console.log("---------componentDidMount");
            //setup first setting

            /*const {dispatch,navReducer} = this.props;
            dispatch({type:'KhuyenMaiScreen'});*/
            const {dispatch} = this.props;
            dispatch(cartCRUD("sync"));
            dispatch(fetchSanPhamTrangChu());
            //login
            getUser().then((user)=>{
                dispatch(initialSyncSetUser(user))
                if(user!=null){
                    dispatch(fetchDanhSachDonHang(user,1,10));
                }
            });


           // BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

            //
            AppState.addEventListener('change', this._handleAppStateChange);

            BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));


            NetInfo.isConnected.addEventListener(
                'connectionChange',
                this._handleConnectivityChange
            );
            NetInfo.isConnected.fetch().done(
                (isConnected) => { this.setState({isConnected}); }
            );


        }
       
        componentWillUnmount() {
            NetInfo.isConnected.removeEventListener(
                'change',
                this._handleConnectivityChange
            );


            BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
           
            console.log("---------componentWillUnmount");
            //
            AppState.removeEventListener('connectionChange', this._handleAppStateChange);
        }
        _handleConnectivityChange = (isConnected) => {
            console.log("isConnected: "+isConnected);
        };

        onBackPress () {
      
            const { dispatch, navReducer } = this.props;
            console.log("Back pressed", navReducer);
            const activeRoute = navReducer.routes[navReducer.index];
            if (activeRoute.index === 0) {
              return false;
            }
            dispatch(NavigationActions.back());
            return true;
        }


         _handleAppStateChange = (nextAppState) => {
                if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
                    console.log('1.--------------------App has come to the foreground!')

                }
                console.log("2.-----------------"+nextAppState);
                this.setState({appState: nextAppState});
        }
        render(){
            const {dispatch,navReducer} = this.props;
            return(
              
                    <MainScreenNavigator
                        navigation={addNavigationHelpers({
                            dispatch,
                            state:navReducer,
                            addListener
                        })}
                    />
            );
        }
}

const mapStateToProps = state => ({
    navReducer:state.navReducer,
    cardReducer:state.cardReducer,
    authReducer:state.authReducer,
});

export default connect(mapStateToProps)(MainScreenNavigatorState);