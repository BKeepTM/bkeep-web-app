import { globalStyles } from '@/app/globalsStyles';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="register" options={{headerTitle: "Register" ,headerTitleStyle: globalStyles.title}}/>
      <Stack.Screen
        name="login" options={{headerTitle: "Login" ,headerTitleStyle: globalStyles.title}}/>
    </Stack>
  );
}
