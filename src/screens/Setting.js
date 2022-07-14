//import liraries
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image,ImageBackground,ScrollView,Linking,StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Line from './Line';
import { sendEmail } from './sendemail';
import Modal from "react-native-modal";
import Share from 'react-native-share';



// create a component
const Setting = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };



    



    const shareUser = async () => {
        const res = await Share.open(({
            // message: 'Dummy message',
            title: 'Share King',
            message: `I am using Story App to read stories. You can also download it from the app store\n`,
            url: "https://play.google.com/store/apps/details?id=com.storyapp"
        }))
        console.log("res==>>>", res)
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
                    flex: 0.1,
                    // backgroundColor: 'purple',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flex: 0.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            // marginLeft: 24,
                            marginLeft: 20,

                        }}>
                            <Image
                                style={{
                                    width: 22,
                                }}
                                source={require('../assets/images/backimg.png')}
                                resizeMode="contain"
                                ></Image>
                        </TouchableOpacity>
                        
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            fontFamily:'Inter-Bold'

                        }}>SETTING</Text>

                    </View>

                </View>
                <View style={{
                    flex: 0.4,
                    paddingHorizontal: "4%",
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'yellow',
                }}>
                    <TouchableOpacity 
                    onPress={() => shareUser()}
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                        marginVertical: "4%",
                        justifyContent: 'flex-start',

                    }}>
                        <AntDesign style={{
                            //   marginTop: 12,
                            }} name="sharealt" 
                            size={22} 
                            // color={colors.black2}
                            color="#fff"
                            />
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            marginLeft: "5%",
                            fontFamily:'Inter-Regular'
                        }}>Share</Text>
                    </TouchableOpacity>
                    <Line style={{
                        margin: `4%`,
                    }}/>
                    <TouchableOpacity
                    onPress={toggleModal}
                    
                    style={{
            
                        flexDirection: 'row',
                        marginVertical: `4%`,
                        justifyContent: 'flex-start',

                        
                    }}>
                        <AntDesign style={{
                            //   marginTop: 12,
                            }} name="infocirlceo" 
                            size={22} 
                            // color={colors.black2}
                            color="#fff"
                            />
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            marginLeft: "5%",
                            fontFamily:'Inter-Regular'


                        }}>Version</Text>
                    </TouchableOpacity>
                    <Line/>
                    
                    <TouchableOpacity 
                    onPress={()=>{
                        Linking.openURL('market://details?id=com.storyapp')
                        // rateApp()

                    }}
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                        marginVertical: `4%`,
                        justifyContent: 'flex-start',

                        
                    }}>
                        <MaterialIcons 
                        
                        style={{
                            //   marginTop: 12,
                            }} name="star-rate" 
                            size={22} 
                            // color={colors.black2}
                            color="#fff"
                            />
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            marginLeft: "5%",
                            fontFamily:'Inter-Regular'


                        }}>Rate This App</Text>
                    </TouchableOpacity>
                    <Line/>
                    
                    <TouchableOpacity 
                    onPress={() => {
                        console.log("------called")
                        // sendEmail(
                        //     'innovateinfosoft@gmail.com',
                        //     'Greeting!',
                        //     'I think you are fucked up how many letters you get.'
                        // ).then(() => {
                        //     console.log('Our email successful provided to device mail ');
                        // });

                        Linking.openURL('mailto:innovateinfosoft@gmail.com?subject=Feedback Regarding Night Stories&body=Dear Innovate Info Soft,') 
      



                    }}
                    style={{
                        // flex: 1,
                        flexDirection: 'row',
                        marginVertical: `4%`,
                        justifyContent: 'flex-start',
                        
                        
                    }}>
                        <MaterialIcons style={{
                            //   marginTop: 12,
                            }} name="feedback" 
                            size={22} 
                            // color={colors.black2}
                            color="#fff"
                            />
                        <Text style={{
                            color: '#fff',
                            fontSize: 18,
                            marginLeft: "5%",
                            fontFamily:'Inter-Regular'


                        }}>Feedback</Text>
                    </TouchableOpacity>
                    <Line/>



                    <View>
                        <Modal 
                        backdropColor='grey'
                        backdropOpacity={0.1}
                        isVisible={isModalVisible} 
                        onBackdropPress={toggleModal}
                        onBackButtonPress={toggleModal}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        >
    
                            <View 
                            style={{ 
                                // flex: 0.2
                                // ,
                                width: "50%",
                                height: "30%",
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                backgroundColor: '#D9D9D9',
                                }}>
                                <View 
                                // source={require('../assets/images/bg.png')}
                                style={{
                                    // backgroundColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image
                                    style={{
                                        width: 100,
                                        height: 100,
                                        // alignSelf: 'center',
                                    }}
                                    source={require('../assets/images/logo.png')}/>
                                

                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginTop: "12%",

                                    }}>Night Stories</Text>
                                    <Text style={{
                                        marginTop: "2%",
                                    }}>Version 1.0</Text>

                                </View>
                            </View>
                        </Modal>
                    </View>




                    

                </View>
            </ImageBackground>
        </View>
        </SafeAreaView>
    );
};

export default Setting;
