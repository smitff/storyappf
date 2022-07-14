//import liraries
import React, { useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import navigationRef from './src/navigations/navigationref';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {requestUserPermission,notificationListener} from './src/Utils/notificationService';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import Home from './src/screens/Home';
import Storylist from './src/screens/Storylist';
import StoryItem from './src/screens/StoryItem';
import Splash from './src/screens/Splash';
import Setting from './src/screens/Setting';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotification.localNotification({
        message: remoteMessage.data.message,
        title: remoteMessage.data.title,
        // bigPictureUrl: remoteMessage.notification.android.imageUrl,
        // smallIcon: remoteMessage.notification.android.imageUrl,
      });
    });
    return unsubscribe;
  }, []);

  useEffect(()=>{

    requestUserPermission()
    notificationListener()

    
    dynamicLinks().getInitialLink().then((link) => {
      handleDynamicLink(link)
    })
    const linkingListener = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      linkingListener();
    }
  },[])


  const handleDynamicLink = (link) => {
    console.log("link url++++", link)
    if (!!link?.url) {
     
        console.log(link.url,"heyy-----------------")
        let para = link.url?.split('?filename=').pop()
        let f = para.split('&')
        console.log(f,'-----------------------fff')
        // console.log(storyname.replace("+"," "),'-----------------------gggg')
        let storyname = link.url?.split('&storyname=').pop()
        console.log(storyname,'-----------------------gggg')
        console.log(f[0],storyname.replace('+'," "),'-----------------------hhh')
        // console.log("filename------------------", filename)
        // console.log("storyname-----------------", storyname)
        setTimeout(() => {
          navigationRef.navigate('StoryItem', { filename: f[0], storyname: storyname.replace('+'," ") })
        }, 3000);
    }
  }






  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen 
        name="Splash" 
        component={Splash}
        options={{
          headerShown: false,
        }}
        />

        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
        />

        <Stack.Screen
        name="Storylist"
        component={Storylist}
        options={{
          headerShown: false,
        }}
        />


      <Stack.Screen
          name="StoryItem"
          // options={({navigation}) => ({
          //   title: 'Story 1',
          //   headerTintColor: '#000000',
          //   headerTitleAlign: 'center',
            
          //   headerStyle:{
          //     backgroundColor: "purple",
          //     // backgroundColor: "none",
          //     headerShown: true,
          //     headerTransparent: true,
          //     // height:90  
          //   },
          //   headerTitleStyle: {
          //     fontFamily: 'Montserrat',
          //     fontSize: 22, 
          //     fontWeight: '600',
          //     color:'#2F2F2F',
          //     marginLeft:-60,
              
          //     // position: 'absolute',
          //     // left:2
          //   },
          //   headerRight: () => {
            
          //     return (
          //       <View style={{
          //         flexDirection: 'row',
          //         // backgroundColor: '#fff',
          //       }}>

          //        <TouchableOpacity
          //        style={{
          //          marginRight:24
          //        }}
          //        onPress={() => navigation.navigate('Onboarding1')}>
                  
          //           <AntDesign style={{
          //             marginTop: 12,
          //             }} name="sound" size={22} 
          //             // color={colors.black2}
          //             color="#fff"
          //              />



          //       </TouchableOpacity>

          //       <TouchableOpacity
          //        style={{
          //          marginRight:24
          //        }}
          //        onPress={() => navigation.navigate('Onboarding1')}>
                  
          //           <Ionicons style={{
          //             marginTop: 12,
          //             }} name="md-settings-sharp" size={22} 
          //             // color={colors.black2}
          //             color="#fff"
          //              />



          //       </TouchableOpacity>
          //       </View>
          //     );
          //   },



          //   headerLeft: () => {
          //     return (
          //       <TouchableOpacity
          //       style={{
          //         // marginLeft:24,
          //         // backgroundColor: '#000',
          //       }}
          //       onPress={() => navigation.back()}>
          //         <Image
          //           source={require('./src/assets/images/backimg.png')}
          //           resizeMode="contain"
          //           style={{
          //             height: 18,
          //             width: 22,
          //             // color: 'black',
          //             marginTop: 2,
          //           }}
          //         />
          //       </TouchableOpacity>
          //     );
          //   },
          // })}
          options={{
            headerShown: false,
          }}
          component={StoryItem}
        />

      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
        }}
        />



    



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
