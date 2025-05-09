// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome , Ionicons} from '@expo/vector-icons';
import { View } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          bottom: 25,
          left: 20,
          right: 20,
          borderRadius: 15,
          height: 90, 
          backgroundColor: '#fffceb',
          paddingBottom: 0
        },
        tabBarItemStyle: {
            alignItems: 'center',
            flexDirection: 'row',
          },
      }}
    >
    <Tabs.Screen
      name="(home)"
      options={{
        tabBarIcon: ({ color, size }) => (
        <AntDesign name="home" size={28} color="black"/>
        ),
      }}
    />
      
    <Tabs.Screen 
    name="(auth)" 
        options={{
        tabBarIcon: ({ color, size }) => (
        <AntDesign name="login" size={25} color="black"/>
        ),
      }} 
    />
    </Tabs>
  );
}
