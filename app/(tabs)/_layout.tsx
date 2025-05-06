// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)" options={{title: "home", headerShown: false}}
      />
      <Tabs.Screen
        name="(auth)"
        options={{title: "auth", headerShown: false}}
      />
    </Tabs>
  );
}
