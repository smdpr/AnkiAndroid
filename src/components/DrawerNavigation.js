import React from 'react';
import { View,Text,Image ,StyleSheet, Switch, TouchableNativeFeedback, Alert, Linking} from 'react-native';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import DrawerLogo from '../../assets/images/drawer_logo.png';
import theme from '../../assets/theme';
import { useDispatch, useSelector } from 'react-redux';
import {toggleDarkMode } from '../redux/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home';
import Help from '../pages/Help';
import Statistcs from '../pages/Statistcs';


const Drawer = createDrawerNavigator();
FontAwesome.loadFont();

const DrawerLayout = (props) => {
    const {isDark,mode} = useSelector(selector => selector.nightMode);
    const dispatch=useDispatch();

    return ( 
        <View style={[styles.container,{
            backgroundColor:theme.colors[mode].background,
        }]}>
            <DrawerContentScrollView style={styles.drawerBody} {...props}>
                <Image source={DrawerLogo} style={styles.drawerLogo} />
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={[styles.drawerFooter,{
                borderTopColor:theme.colors[mode].t3
            }]}>
                <View style={styles.itemWrapper}>
                    <FontAwesome name='moon-o' size={20} color={theme.colors[mode].icon} />
                    <Text style={[styles.itemText,{
                        color:theme.colors[mode].t1
                        }]}>Night Mode</Text>
                    <Switch 
                        style={styles.switch} 
                        trackColor={{ false: "#C9C9C9", true: "#767577" }}
                        thumbColor={isDark ? theme.colors.statusBar : "#f4f3f4"}
                        value={isDark} 
                        onValueChange={()=>dispatch(toggleDarkMode())}
                    />
                </View>
                <NativeButton title='Support Simple Anki' icon='support' onPress={()=>Alert.alert("Support","You can also log the problem to us if you've seen something!",[
                    {text:'Cancel',style:'cancel'},
                    {text:'Send Email',onPress:()=>Linking.openURL('mailto:smdpr78@gmail.com')},
                ])} />
            </View>
        </View>
     );
}

const DrawerNavigation=()=>{
    const {mode} = useSelector(selector => selector.nightMode);

    return (
          <Drawer.Navigator initialRouteName='Home' screenOptions={{
              headerStyle: {backgroundColor:theme.colors.header},
              headerTitleStyle:{color:theme.colors.white},
              headerTintColor: theme.colors.white,
              drawerItemStyle: {
                borderRadius: 0,
                width: '100%',
                marginLeft: 0,
                marginVertical:0,
              },
              drawerLabelStyle:{...theme.typo.h3,marginLeft:-10},
              drawerActiveTintColor:theme.colors[mode].t1,
              drawerInactiveTintColor:theme.colors[mode].t1,
            }} 
            drawerContent={(props)=><DrawerLayout {...props} />}>
              <Drawer.Screen name="Simple Anki" component={Home} options={{
                drawerIcon:(props)=><FontAwesome name='list' color={props.color} size={20}  />,
                drawerLabel:'Decks',
                // headerRight:()=><SearchButton onPress={()=>{}}/>
              }}/>
              <Drawer.Screen name="Statistcs" component={Statistcs} options={{
                 drawerIcon:(props)=><FontAwesome name='bar-chart' color={props.color} size={18}  />,
              }} />
              <Drawer.Screen name="Help" component={Help} options={{
                 drawerIcon:(props)=><FontAwesome name='question-circle' color={props.color} size={20}  />,
              }} />
          </Drawer.Navigator>
    );
  }

const NativeButton=({icon,title,onPress})=>{
    const {nightMode} = useSelector(s=>s);
    const {mode} =nightMode;

    return (
        <TouchableNativeFeedback 
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(theme.colors[mode].pressButton, false)}>
            <View style={styles.itemWrapper}>
                <FontAwesome name={icon} size={20} color={theme.colors[mode].icon} />
                <Text style={[styles.itemText,{
                    color:theme.colors[mode].t1
                    }]}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}
 
export default DrawerNavigation;

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    drawerBody:{
        flex:1,
        marginTop:-5,
    },
    drawerFooter:{
        borderTopWidth:1,
        padding:10,
    },
    drawerLogo:{
        width:'100%',
    },
    itemWrapper:{
        flexDirection:'row',
        height:45,
        // paddingHorizontal:5,
        alignItems:'center',
    },
    itemText:{
        ...theme.typo.h3,
        marginLeft:20,
        color:theme.colors.black,
    },
    switch:{
        position:'absolute',
        right:10,
    },
});