//import liraries
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,FlatList,Image, ImageBackground,StatusBar, SafeAreaView,ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import { ApiUtils,ImageService,AdsUrl    } from '../Utils/ApiUtils';
import { TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import { InterstitialAd, AdEventType} from '@react-native-firebase/admob';



const Home = ({navigation}) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState([]);
    const [counter, setCounter] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [banneradid, setBannerAdId] = useState('');

    const [interstitialadid, setInterstitialAdId] = useState('');
    const [rewardedadid, setRewardedAdId] = useState('');

    const interstitial = InterstitialAd.createForAdRequest(interstitialadid , {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });

    const showInterstitialAd = (item) => { 
        interstitial.onAdEvent((type, error) => { 
            if (type === AdEventType.LOADED) { 
                console.log('Ad loaded');
                interstitial.show(); 
                // navigation.navigate('StoryItem',{
                //     filename:item.file,
                //     storyname:item.name,
                //     // showad:true
                // })
                navigation.navigate('Storylist',{
                    id:item._id,
                    imguri:ImageService.categoryImg +  item.image
                })




            }}); 
            interstitial.load(); 
        }

    const getAllCategory = async () => {
        try {
            setLoading(true);
            const Res = await axios.get(ApiUtils.getallcatgories,{
                // timeout: 3000,
            });
            // setData(Res.data.result);
            let f = Res.data.result.map(item => {
                item.count = 1;
                return item;
            })
            setData(f);
            setRefresh(false)
            console.log(f,"--------------------ff")
            console.log(Res.data.result,"This is result");
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error.message);
            console.log(error.response);
        }
    }

    // const getAdLink = async () => {
    //     try {
    //         setLoading(true);
    //         const Res = await axios.get(AdsUrl.adsurl);
    //         setCount(Res.data.result);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error.message);
    //         console.log(error.response);
    //     }
    // }

    const getAdsItem = async () => {
        try {
            setLoading(true);
            const Res = await axios.get(AdsUrl.adsurl);
            setCounter(Res.data['json_object']['show_ads_counter']);
            setBannerAdId(Res.data.json_object.admob_banner);
            setInterstitialAdId(Res.data.json_object.admob_inter);
            setRewardedAdId(Res.data.json_object.admob_rewarded);
            // console.log(banneradid,"okkkk")
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            console.log(error.response);
        }
    }

    useEffect(()=>{
        
        getAdsItem()

    },[])






 useEffect(() => {
    // getAllStory()   
    const willFocusSubscription = navigation.addListener('focus', () => {
      getAllCategory()
    });

    return willFocusSubscription;
  }, []);


    const _keyExtractor = (item, index) => item._id;

    const _renderItem = ({item, index}) => {


        return (
          <TouchableOpacity style={{
            // width: '45%',
            // margin:6,
            // justifyContent: 'center',
            // alignItems: 'center',
            width: '95%',
            height: 82,
            // borderRadius:5,
            alignSelf:'center',
            // justifyContent: 'center',
            alignItems: 'center',
            // overflow:'hidden',
            // flexDirection: 'column',
          }}
        //   onPress={()=>{
        //     setCount(count+1);
        //     navigation.navigate('Storylist',{id:item._id}
        //     )
        //   }}

          onPress={()=>{
            if(item.count%counter===0){

                let arr2 = data.map(a =>{
                    var returnValue = {...a};
                    if(a._id === item._id){
                        returnValue.count = item.count+1;
                    }
                    return returnValue
                })
                setData(arr2)

                // setData([...data,item.count=item.count+1]);
                console.log(item,"----------------------item")
                showInterstitialAd(item);


                // navigation.navigate('StoryItem',{
                //     filename:item.file,
                //     storyname:item.name,
                //     showad:true
                // })
        
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
                console.log(item,"----------------------count")

                navigation.navigate('Storylist',{
                    id:item._id,
                    imguri:ImageService.categoryImg +  item.image
                    
                })


            }

                
        }}
          >
            {/* <View style={{
                backgroundColor:'#D9D9D9',
                width: '100%',
                justifyContent:"center",
                alignItems:"center",
                paddingVertical:19,
                // paddingHorizontal:21,
                borderRadius:16


            }}>
                <Image 
                source={{
                    uri:  ImageService.categoryImg +  item.image
                }}
                defaultSource={require('../assets/images/categoryimg.png')}
                style={{width:120,height:120}}
                />
            </View>

            <View style={{
                marginTop:10,
                // backgroundColor:'yellow',
                // justifyContent:"center",
                // alignItems:"center",
            }}>
                <Text style={{
                    fontSize:16,
                    fontFamily:'Inter-Regular',
                    color:'#FFFFFF',
                }}>{item.name}</Text>
            </View> */}

            <ImageBackground 
            style={{
                width: '100%',
                height: '100%',
                // backgroundColor:'yellow',
                // justifyContent:"center",
            }}
            resizeMode="stretch"
            source={{
                uri:  ImageService.categoryImg +  item.image
            }}
            // source={require('../assets/images/romantic.png')}
            defaultSource={require('../assets/images/romantic.png')}
            
            >
            </ImageBackground>
            <Text style={{
                    marginTop:9,
                    fontSize:24,
                    fontFamily:'Inter-Black',
                    color:'#FFFFFF',
                    marginLeft:"5%",

                }}>{item.name}</Text>



          </TouchableOpacity>
        );
        
      };
    
      const _flatListItemSeparator = () => {
        return(
            <View style={{
                // width:70,
                // margin: 5,
                height:"8%"
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

            <View style={{
                // backgroundColor:'#FFFFFF',
                justifyContent:"center",
                alignItems:"center",
                paddingTop:40,
                paddingHorizontal:10,


            }}>
                <Image 
                source={require('../assets/images/logo.png')}
                style={{
                    width:155,
                    height:155,
                }}
                />    
            </View>

            <TouchableOpacity
            style={{
                backgroundColor:'yellow',
            }}
            onPress={()=>{
                navigation.navigate('Storylist',{
                    id:'62bfc624f541d41ffb52c365',
                    imguri:"http://ec2-15-206-88-112.ap-south-1.compute.amazonaws.com:3000/category/1657785244527Love.png"
                    
                })
            }}
            >
                <Text>Next</Text>
            </TouchableOpacity>

            {
                !data  && <Text>Loading</Text>
            }



            { data && 


            <FlatList
            style={{
                marginTop: 24,
                width: '100%',
                flex:1,
                // height: '100%',
                // // paddingHorizontal:10,
                // backgroundColor:'#FFFFFF',

            }}
            // contentContainerStyle={{
            //     backgroundColor:'#FFFFFF',
            //     height: '50%',
            // }}
            // extraData={data}
            data={data}
            // maxToRenderPerBatch={3}
            // numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            // columnWrapperStyle={{
            //     justifyContent: "space-around",
            //   }}
            ItemSeparatorComponent={_flatListItemSeparator}
            showsHorizontalScrollIndicator={false}
            // removeClippedSubviews={true}
            // initialNumToRender={10}
            // initialScrollIndex={6}
            refreshing={refresh}
            onRefresh={()=>{
                getAllCategory()  
            }}


            />

        }

            

{/* 
{
                        banneradid.length>0 ?
                        <BannerAd
                        // unitId={TestIds.BANNER}
                        unitId={banneradid}
                        // size={BannerAdSize.LARGE_BANNER}       
                        size={BannerAdSize.ADAPTIVE_BANNER}

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
                            // backgroundColor:'#FFFFFF',
                        }}>
                        </View>
                        

                        
                    } */}


            </ImageBackground>
            
        </SafeAreaView>
    );
};

export default Home;
