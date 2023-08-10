
import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { CartContextProvider } from './src/contexts/CartContext';
import {tagUserInfoCreate} from './src/notification/notificationsTags'
import { useEffect } from 'react';

OneSignal.setAppId('4c06fa7f-d1bd-4457-aafe-2db91078c938')
OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
   const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate('');

  useEffect(()=>{
    const unsubscrible = OneSignal.setNotificationOpenedHandler(() => {
      console.log("Notificação aberta!")
    });
    return() => unsubscrible;
  },[]);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

    </NativeBaseProvider>
  );
}