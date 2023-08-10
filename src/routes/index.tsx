import {useEffect, useState} from 'react'
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Notification } from '../components/Notification';

import { AppRoutes } from './app.routes';

export function Routes() {
  const [notification , setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(()=> {
    const unsubscrible = OneSignal.setNotificationWillShowInForegroundHandler((NotificationReceivedEvent: NotificationReceivedEvent ) => {
     const response = NotificationReceivedEvent.getNotification();
     
     setNotification(response);
    });
     return () => unsubscrible;
    },[]); 
    
  return (
    <NavigationContainer theme={theme}>
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