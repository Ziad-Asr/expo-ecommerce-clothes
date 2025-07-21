import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
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
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen 
          name="notifications" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen 
          name="orders" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen 
          name="wishlist" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen 
          name="profile-edit" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen 
          name="terms" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen 
          name="product/[productId]" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
        <Stack.Screen 
          name="products/[categoryId]" 
          options={{ 
            presentation: 'modal',
            animation: 'slide_from_right'
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
