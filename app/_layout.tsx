import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }} />
    );
  }

  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'none',
          animationDuration: 0,
          gestureEnabled: false,
          contentStyle: { backgroundColor: '#000000' },
          cardStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false,
            animation: 'none',
            animationDuration: 0,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="+not-found"
          options={{
            animation: 'none',
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }}
        />
        <Stack.Screen 
          name="notifications" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="orders" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="wishlist" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="profile-edit" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="terms" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="product/[productId]" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
        <Stack.Screen 
          name="products/[categoryId]" 
          options={{ 
            animation: 'none',
            animationDuration: 0,
            gestureEnabled: false,
            contentStyle: { backgroundColor: '#000000' },
            cardStyle: { backgroundColor: '#000000' },
          }} 
        />
      </Stack>
      <StatusBar style="light" backgroundColor="#000000" />
    </>
  );
}