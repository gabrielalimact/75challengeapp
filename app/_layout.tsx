import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ChallengeProvider } from '@/contexts/ChallengeContext';
import { HabitsProvider } from '@/contexts/HabitsContext';
import { UserProvider } from '@/contexts/UserContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <UserProvider>
      <ChallengeProvider>
        <HabitsProvider>
          <SafeAreaProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="welcome" options={{ headerShown: false }} />
                <Stack.Screen 
                  name="login" 
                  options={{ 
                    headerShown: false,
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                  }} 
                />
                <Stack.Screen 
                  name="signup" 
                  options={{ 
                    headerShown: false,
                    presentation: 'modal',
                    animation: 'slide_from_bottom'
                  }} 
                />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                <Stack.Screen name="settings/edit-profile" options={{ headerShown: false }} />
                <Stack.Screen name="settings/notifications" options={{ headerShown: false }} />
                <Stack.Screen name="settings/privacy" options={{ headerShown: false }} />
                <Stack.Screen name="settings/about" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="dark" />
            </ThemeProvider>
        </SafeAreaProvider>
        </HabitsProvider>
      </ChallengeProvider>
    </UserProvider>
  );
}
