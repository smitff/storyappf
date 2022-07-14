//import liraries
import React, { useState,useEffect,useRef } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,FlatList,SafeAreaView,StatusBar,ImageBackground,Image,ActivityIndicator,Dimensions } from 'react-native';
import Line from './Line';
import { ApiUtils,ImageService,AdsUrl } from '../Utils/ApiUtils';
import axios from 'axios';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import { InterstitialAd, AdEventType} from '@react-native-firebase/admob';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

// const adUnitId = TestIds.BANNER;
const Storylist = ({navigation,route}) => {


    
    const [data, setData] = useState([]);   
    const [counter, setCounter] = useState(0);
    const [banneradid, setBannerAdId] = useState('');
    const [interstitialadid, setInterstitialAdId] = useState('');
    const [rewardedadid, setRewardedAdId] = useState('');
    const [showbanneradsarray, setShowBannerAdsarray] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id,imguri} = route.params;

    const interstitial = InterstitialAd.createForAdRequest(interstitialadid , {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });

    const showInterstitialAd = (item) => { 
        interstitial.onAdEvent((type, error) => { 
            if (type === AdEventType.LOADED) { 
                console.log('Ad loaded');
                interstitial.show(); 
                navigation.navigate('StoryItem',{
                    filename:item.file,
                    storyname:item.name,
                    // showad:true
                })



            }}); 
            interstitial.load(); 
        }

    const getAllStory = async ()=>{
        try {
            setLoading(true);
            const Res = await axios.get(ApiUtils.getallstoriesbycatid+id);
            console.log(Res.data.result);
            let f = Res.data.result.map(item => {
                item.count = 1;
                return item;
            })
            setData(f);
            console.log(f,"--------------------ff")
            console.log(Res.data.result,"This is result");
            


            // setData(Res.data.result);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            console.log(error.response);
        }
    } 

    const getAdsItem = async () => {
        try {
            setLoading(true);
            const Res = await axios.get(AdsUrl.adsurl);
            // console.log(Res.data['json_object']['show_ads_counter'],"------------------ad")
            // setAddata(Res.data);
            console.log(Res.data);
            console.log(Res.data.json_object);
            // setAdJsonData(Res.data['json_object']);
            // setAdJsonData(Res.data)
            console.log(Res.data.json_object.admob_banner,"okkkk")
            setBannerAdId(Res.data.json_object.admob_banner);
            console.log(banneradid,"okkkk")

            setInterstitialAdId(Res.data.json_object.admob_inter);
            setRewardedAdId(Res.data.json_object.admob_rewarded);
            setCounter(Res.data['json_object']['show_ads_counter']);
            setShowBannerAdsarray(Res.data['json_object']['showbannerads']);
            // console.log(counter,"--------------------addata")
            // console.log(Res.data['json_object'],"--------------------adJsondata")
            // console.log(adJsonData,"--------------------adJsondataf")
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            console.log(error.response);
        }
    }

    const _keyExtractor = (item, index) => item._id;


    useEffect(()=>{
        
        getAdsItem()

    },[])


    // useEffect(()=>{
    //     // if(data.length===0){
    //     //     getAllStory()
    //     // }
    //     getAllStory()

    // },[])



 useEffect(() => {
    // getAllStory()   
    const willFocusSubscription = navigation.addListener('focus', () => {
      getAllStory()
    });

    return willFocusSubscription;
  }, []);




    const _renderItem = ({item, index}) => {

        


       if(showbanneradsarray.includes(index)){
            return(
                <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}>

                    {
                        banneradid.length>0 ?
                        <BannerAd
                        // unitId={TestIds.BANNER}
                        unitId={banneradid}
                        size={BannerAdSize.FULL_BANNER}                    
                        requestOptions={{
                        requestNonPersonalizedAdsOnly: true,}}
                        onAdLoaded={() => {
                        console.log('Advert loaded');}}
                        onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);}}
                        /> 



                        :
                        <View style={{
                            height:50,
                            backgroundColor:'#FFFFFF',
                        }}>
                        </View>
                        

                        
                    }




                    <TouchableOpacity
            style={{
                // backgroundColor: '#fff',
                marginHorizontal: 20,
                marginTop:"4.5%",
                // alignSelf: 'center',
                flexDirection: 'row',
                // borderColor: '#FFFFFF',
                // borderWidth: 5,
                // borderRadius: 15,
                // borderTopLeftRadius: 15,
                // borderBottomRightRadius: 15,
                // overflow: 'hidden',
                height: 90,
                elevation: 40,
                shadowColor: '#fff',
 
                // padding: 10,
            }}

            onPress={()=>{

                // let array = [{id:1,name:'One'}, {id:2, name:'Two'}, {id:3, name: 'Three'}];

                // let array2 = array.map(a => {
                // var returnValue = {...a};

                // if (a.id == 2) {
                //     returnValue.name = "Not Two";
                // }

                // return returnValue
                // })


                // console.log(array);
                // console.log(array2);




                    if(item.count%counter===0){
                    let arr2 = data.map(a =>{
                        var returnValue = {...a};
                        if(a._id === item._id){
                            returnValue.count = item.count+1;
                        }
                        return returnValue
                    })
                    setData(arr2)


                    // setData([...data,data[]item.count+1]);
                    // console.log(data,"--------------------data")
                        navigation.navigate('StoryItem',{
                            filename:item.file,
                            storyname:item.name
                        })
                        showInterstitialAd(item);
            
                }
                else{
                    // setData([...data,item.count=item.count+1]);
                    // console.log(item,"----------------------count")
                    // console.log(data,"--------------------data")

                    let arr2 = data.map(a =>{
                        var returnValue = {...a};
                        if(a._id === item._id){
                            returnValue.count = item.count+1;
                        }
                        return returnValue
                    })
                    setData(arr2)


                    navigation.navigate(
                        'StoryItem',
                        {
                            filename:item.file,
                            storyname:item.name
                        }
                        )
                    }
              }}
            
            >

            <View style={{
                // backgroundColor:'#D9D9D9',
                width: '30%',
                // height: '40%',
                // justifyContent:"center",
                // alignItems:"center",
                // paddingVertical:19,
                // overflow: 'hidden',
                // borderTopRightRadius: 15,
                // borderBottomRightRadius: 15,
                marginRight:5

                }}>
                    <Image 
                        source={{
                            uri: ImageService.storyImg +  item.image
                        }}
                        // source={require('../assets/images/lovestory.png')}

                        style={{
                            // width:120,
                            // height:120
                            width: '100%',
                            height: '100%',
                            borderRadius:10
                        }}
                        resizeMode="stretch"
                    />
            </View>


            <View style={{
                // marginTop:10,
                // backgroundColor:"yellow",
                backgroundColor:'#D9D9D9',
                borderRadius:10,
                justifyContent:"center",
                alignItems:"center",
                width: '70%',
                paddingHorizontal:8,
                borderColor: '#FFFFFF',
                borderWidth: 1,
                borderStyle:"solid"
                // elevation:20,
                // shadowColor: '#fff'
                // borderRadius: 15,

                // overflow: 'hidden',
                }}>
                {/* <Text style={{
                    fontSize:16,
                    color:'#FFFFFF',
                }}>{item.name}</Text> */}

                <Text style={{
                    fontSize:16 ,
                    // color:'#FFFFFF',
                    color:"#000",
                    textAlign:'justify',
                    fontFamily:"Inter-Regular",
                    
                    // fontWeight:"bold",
                }}>{item.name}</Text>
                

            </View>

                    </TouchableOpacity>

                </View>
    
            )
        }
      else{
        return (
            <TouchableOpacity
            style={{
                // backgroundColor: '#fff',
                marginHorizontal: 20,
                // alignSelf: 'center',
                flexDirection: 'row',
                // borderColor: '#FFFFFF',
                // borderWidth: 5,
                // borderRadius: 15,
                // borderTopLeftRadius: 15,
                // borderBottomRightRadius: 15,
                // overflow: 'hidden',
                height: 90,
                elevation: 40,
                shadowColor: '#fff',
 
                // padding: 10,
            }}

            onPress={()=>{
                if(item.count%counter===0){
                    // setData([...data,item.count=item.count+1]);
                    let arr2 = data.map(a =>{
                        var returnValue = {...a};
                        if(a._id === item._id){
                            returnValue.count = item.count+1;
                        }
                        return returnValue
                    })
                    setData(arr2)

                    console.log(data,"----------------------data")

                    navigation.navigate('StoryItem',{
                        filename:item.file,
                        storyname:item.name
                    })
                    showInterstitialAd(item);
            
                }
                else{
                    // setData([...data,item.count=item.count+1]);
                    let arr2 = data.map(a =>{
                        var returnValue = {...a};
                        if(a._id === item._id){
                            returnValue.count = item.count+1;
                        }
                        return returnValue
                    })
                    setData(arr2)

                    console.log(data,"----------------------data")
                    navigation.navigate(
                        'StoryItem',
                        {
                            filename:item.file,
                            storyname:item.name
                        }
                        )
                    }
              }}
            
            >

            <View style={{
                // backgroundColor:'#D9D9D9',
                width: '30%',
                // height: '40%',
                // justifyContent:"center",
                // alignItems:"center",
                // paddingVertical:19,
                // overflow: 'hidden',
                // borderTopRightRadius: 15,
                // borderBottomRightRadius: 15,
                marginRight:5

                }}>
                    <Image 
                        source={{
                            uri: ImageService.storyImg +  item.image
                        }}
                        // source={require('../assets/images/lovestory.png')}

                        style={{
                            // width:120,
                            // height:120
                            width: '100%',
                            height: '100%',
                            borderRadius:10
                        }}
                        resizeMode="stretch"
                    />
            </View>


            <View style={{
                // marginTop:10,
                // backgroundColor:"yellow",
                backgroundColor:'#D9D9D9',
                borderRadius:10,
                justifyContent:"center",
                alignItems:"center",
                width: '70%',
                paddingHorizontal:8,
                borderColor: '#FFFFFF',
                borderWidth: 1,
                borderStyle:"solid"
                // elevation:20,
                // shadowColor: '#fff'
                // borderRadius: 15,

                // overflow: 'hidden',
                }}>
                {/* <Text style={{
                    fontSize:16,
                    color:'#FFFFFF',
                }}>{item.name}</Text> */}

                <Text style={{
                    fontSize:16 ,
                    // color:'#FFFFFF',
                    color:"#000",
                    textAlign:'justify',
                    fontFamily:"Inter-Regular",
                    
                    // fontWeight:"bold",
                }}>{item.name} </Text>
                

            </View>

            </TouchableOpacity>
        );
            }   
        
      };
    
      const _flatListItemSeparator = () => {
        console.log("Called")

        return(
            <View style={{
                // width:70,
                // margin: 5,
                height:20,
                // justifyContent:"center",
                // alignItems:"center",
                // backgroundColor:"yellow"
            }}>
                

            </View>
        )
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

    
        // console.log(adJsonData,"--------------------adJsondattest")





    return (
        <SafeAreaView style={{
            // paddingHorizontal:10
            flex:1,

        }}>
            <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" 
            hidden
            />
            
        
            <ImageBackground
            style={{
                flex:1,
                paddingBottom:10,
            }}
            source={require('../assets/images/bg.png')}>


            
            <ImageBackground 
            source={{
                uri: imguri,
            }}
            // source={require('../assets/images/Love.png')}
            resizeMode="stretch"
            style={{
                width:windowWidth,
                height:windowHeight/4,
                borderBottomEndRadius:windowWidth/1.1,
                borderBottomStartRadius:windowWidth/1.1,
                // marginTop:-40,
                overflow:'hidden',
                transform:[{
                    scaleX:1.5,
                },

                // {
                //     // scaleY:3,
                // }
                ],
                // borderWidth:2,
                marginBottom:10,
                backgroundColor:"yellow",
                // height:50,
            }}>

                {/* <Text></Text> */}

            
            </ImageBackground> 
            

{   data &&
            <FlatList
            style={{
                // flex:1,
                marginTop: 24,
                width: '100%',
                // backgroundColor:'green',
            }}
            // extraData={data}
            data={data}
            
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            // columnWrapperStyle={{
            //     justifyContent: "space-around",
            //   }}
            ItemSeparatorComponent={_flatListItemSeparator}
            // showsHorizontalScrollIndicator={false}
            />
        }
            </ImageBackground>
            {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.FULL_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
            /> */}


        </SafeAreaView>
    );
};

export default Storylist;
