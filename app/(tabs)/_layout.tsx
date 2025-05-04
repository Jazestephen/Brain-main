import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
          height: 50,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'absolute',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;
          switch (route.name) {
            case 'home':
              iconName = 'home';
              break;
            case 'calendar':
              iconName = 'calendar-outline';
              break;
            case 'add':
              iconName = 'add-circle-outline';
              break;
            case 'task':
              iconName = 'document-outline';
              break;
            case 'profile':
              iconName = 'people-outline';
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={focused ? 28 : 24}
              color={focused ? '#6A5ACD' : '#FFF'}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="add" options={{ title: 'Add' }} />
      <Tabs.Screen name="task" options={{ title: 'Task' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}