import {useEffect, useState} from 'react'
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Notification } from '../components/Notification';
import * as Linking from 'expo-linking';

import { AppRoutes } from './app.routes';

const linking = {
  prefixes:['com.rocketseat.iginiteshoes://',  'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: String) => productId
        }
      }
    }
  }
}

export function Routes() {
  const [notification , setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const deepLinking = Linking.createURL('details', {
    queryParams:{
      productId:'7'
    }
  });
  console.log(deepLinking);

  useEffect(()=> {
    const unsubscrible = OneSignal.setNotificationWillShowInForegroundHandler((NotificationReceivedEvent: NotificationReceivedEvent ) => {
     const response = NotificationReceivedEvent.getNotification();
     
     setNotification(response);
    });
     return () => unsubscrible;
    },[]); 
    
  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification
        data={notification} 
        onClose={() => setNotification(undefined)}
        />
      }
    </NavigationContainer>
  );
}