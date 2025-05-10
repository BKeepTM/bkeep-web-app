import  AuthProvider  from '@/hooks/authProvider';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react';
import AuthGuard from './authGuard';
export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <AuthGuard>  
            </AuthGuard>
          </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
