import { globalStyles } from '@/app/globalsStyles';
import { Stack } from 'expo-router';
import { defaultStack } from '../_navigationTheme';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="index"/>
     <Stack.Screen
        name="register"/>
      <Stack.Screen
        name="login"/>
    </Stack>
  );
}
