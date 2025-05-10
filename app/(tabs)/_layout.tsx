// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome , Ionicons} from '@expo/vector-icons';
import { View } from 'react-native';
import { defaultTabs } from '../_navigationTheme';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={defaultTabs}>
    <Tabs.Screen
      name="home/index"
      options={{
        tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" size={28} color="black"/>
        ),
      }}
    />
    </Tabs>
  );
}
