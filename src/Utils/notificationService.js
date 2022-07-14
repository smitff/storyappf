import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async ()=>{
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken,"Old Token")
    if(!fcmToken){
        try{
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                console.log("New Token by fb messagin",fcmToken)
                // await AsyncStorage.setItem('fcmToken',fcmToken);
            }
        }catch(e){
            console.log(e,"Error in getting token")
        }
    }
}


export const notificationListener = async () =>{
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',remoteMessage.notification,
        );
      });

      //for forground notification
      //this method receives data
      messaging().onMessage(remoteMessage => {
        console.log("receieved in forground",remoteMessage)
      })



      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });



}



















