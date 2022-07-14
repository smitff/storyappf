
import axios from 'axios';
import React, { useState,useEffect,useRef} from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground,SafeAreaView, TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import { ApiUtils,TextFile } from '../Utils/ApiUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { InterstitialAd, TestIds, AdEventType} from '@react-native-firebase/admob';

import TextTicker from 'react-native-text-ticker'

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });


const StoryItem = ({navigation,route}) => {

    const [data, setData] = useState('');
    const {filename,storyname} = route.params;
    const [loading, setLoading] = useState(false);
    const sc = useRef(null);


    const showInterstitialAd = () => { 
        interstitial.onAdEvent((type, error) => { 
            if (type === AdEventType.LOADED) { 
                console.log('Ad loaded');
                interstitial.show(); 
            }}); 
            interstitial.load(); 
        }

    // useEffect(() => {

    //   const eventListener = interstitial.onAdEvent(type => {
    //     if (type === AdEventType.LOADED) {
    //       setLoaded(true);
    //     }
    //   });
  
    //   // Start loading the interstitial straight away
    //   interstitial.load();
  
    //   // Unsubscribe from events on unmount
    //   return () => {
    //     eventListener();
    //   };
    // }, []);
  
    // No advert ready to show yet
    // if (!loaded) {
    //   return null;
    // }
   



    const getStoryContent = async ()=>{
        try {
            setLoading(true);
            const Res = await axios.get(TextFile.storyTxtFile+filename);
            setData(Res.data);
            setLoading(false);
        } catch (error) {

            console.log(error.message);
            console.log(error.response);
        }
    }
    // useEffect(()=>{



    //     if(showad){
    //         showInterstitialAd();
    //     }

    //     if(data === ''){
    //         getStoryContent();
    //     }

    //     getStoryContent()

    //     setTimeout(()=>{
    //         showInterstitialAd()
    //     },3000)

    //     return ()=>{
    //         // interstitial.destroy();
    //         showInterstitialAd()
    //     }



    // },[data])



    useEffect(() => {
        // getAllStory()   
        const willFocusSubscription = navigation.addListener('focus', () => {
          getStoryContent()
        });
    
        return willFocusSubscription;
      }, []);
    

    const generateLink = async () => {
        try {
    var link = await dynamicLinks().buildShortLink({
        // https://innovatestoryapp.page.link/stories
        // link: `https://innovatestoryapp.page.link/stories?filename=${filename}`,
    link:`https://innovatestoryapp.page.link/stories?filename=${filename}&storyname=${storyname}`,
                domainUriPrefix: 'https://innovatestoryapp.page.link',
                android: {
                    packageName: 'com.storyapp',
                    minimumVersion: '18'
                },
            },
                dynamicLinks.ShortLinkType.DEFAULT
            )

            return link
        } catch (error) {
            console.log("error raised", error)
        }
    }

    

    const shareUser = async () => {
        // sc.current.scrollToEnd({
        //     animated: true
        // });
        const getLink = await generateLink()
        // console.log("get linkkk kdjfkdlfdf",getLink)
        const res = await Share.open(({
            title: 'Share Story',
            message: `${data.slice(0,300)}...\nCheck out this story on`,
            url: getLink
        }))
        console.log("res==>>>", res)
    }


    if(loading){
        return(
            <ImageBackground 
            source={require('../assets/images/bg.png')}
            style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {/* <Text>Loading...</Text> */}
                <ActivityIndicator size="large" />
            </ImageBackground>
        )
    }




    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
        <View style={{
            flex: 1,  
        }}>
            <ImageBackground
            style={{
                flex: 1,
            }}
            source={require('../assets/images/bg.png')}
            >
                <View style={{
                    flex: 0.09,
                    // backgroundColor: 'purple',   
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flex: 0.6,
                        flexDirection: 'row',
                        marginLeft: 20,
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        >
                            <Image
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                                source={require('../assets/images/backimg.png')}
                                resizeMode="contain"
                                ></Image>
                        </TouchableOpacity>

                        <View style={{
                            // width: '100%',
                            marginLeft: 10,
                            marginRight: 25,
                        }}>
                            <TextTicker
                            style={{ 
                                fontSize: 18,
                                textTransform: 'uppercase',
                                color: '#FFFFFF',
                                fontFamily:'Inter-Bold'
                            }}
                            duration={16000}
                            >
                                {storyname}
                                {/* fewn;fn fewnnjf fenrfj fewj */}
                            </TextTicker>
                        </View>



                    </View>
                    <View style={{
                        flex: 0.3,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        // backgroundColor: '#fff',
                    }}>
                        
                        {/* <TouchableOpacity
                         onPress={() => 
                            // interstitial.show();
                            showInterstitialAd()}
                        style={{}}
                        >
                            <AntDesign style={{
                            }} name="sound" size={22} color="#fff"
                            />
                        </TouchableOpacity> */}

                        <TouchableOpacity
                        style={{}}
                        onPress={() => shareUser()}
                        >
                            <AntDesign style={{
                                }} name="sharealt" size={22} color="#fff"/>
                        </TouchableOpacity>

                        <TouchableOpacity
                        style={{}}
                        onPress={() => navigation.navigate('Setting')}>
                            <Ionicons style={{
                            }} name="md-settings-sharp" size={22} color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                <ScrollView
                ref={sc}
                indicatorStyle="white"
                style={{
                    flex: 0.9,
                    paddingHorizontal: "4%",
                }}>
                 <Text style={{
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'justify',
                    fontFamily:'Inter-Regular'
                }}>{data}</Text> 




                </ScrollView>
            </ImageBackground>
        </View>
        </SafeAreaView>
    
    );
};

export default StoryItem;
