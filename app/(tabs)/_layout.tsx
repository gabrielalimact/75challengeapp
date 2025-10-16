import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Feather, FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const TabIcon = ({ icon, focused }: { icon: React.ReactNode, focused: boolean }) => {
  const colorScheme = useColorScheme();
  
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: focused 
          ? (colorScheme === 'dark' ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected) 
          : 'transparent',
      }}>
      {icon}
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          marginHorizontal: 70,
          height: 70,
          backgroundColor: colorScheme === 'dark' ? '#302c2cff' : '#ffffff',
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10,
          paddingTop: 15,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => 
            <TabIcon 
              icon={<Feather name="home" size={26} color={focused ? Colors.dark.tabIconSelected : color} />}
              focused={focused}
            />,
        }}
      />
      <Tabs.Screen
        name="habitsconfig"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color, focused }) => 
            <TabIcon 
              icon={<FontAwesome6 name="list-check" size={24} color={focused ? Colors.dark.tabIconSelected : color} />}
              focused={focused}
            />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => 
            <TabIcon 
              icon={<FontAwesome name="user-o" size={24} color={focused ? Colors.dark.tabIconSelected : color}/>}
              focused={focused}
            />,
        }}
      />
    </Tabs>
  );
}
