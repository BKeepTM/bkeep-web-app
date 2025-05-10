import { defaultStack } from '@/app/_navigationTheme';
import { Stack } from 'expo-router';
import { Image } from 'react-native';


export default function HomeLayout() {
  return (
    <Stack screenOptions={defaultStack}>
      <Stack.Screen name="index"/>
    </Stack>
  );
}
