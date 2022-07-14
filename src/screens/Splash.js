//import liraries
import React, {useState,useEffect} from 'react';
import { Image, SafeAreaView,Dimensions,StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Splash = ({navigation}) => {

    useEffect(()=>{
        setTimeout(()=>{
            navigation.replace('Home');
        },3000);
    },[])


    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" 
            hidden
            />
            <Image 
            style={{
                width: "100%",
                height: "100%",

            }}
            resizeMode="cover"
            source={require('../assets/images/splashimg.png')}>

            </Image>
        </SafeAreaView>
    );
};

export default Splash;
