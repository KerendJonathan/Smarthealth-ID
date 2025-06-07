import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

import { HomeHeader } from '@/components/HomeHeader';
import { MainBanner } from '@/components/MainBanner';
import { MenuGrid } from '@/components/MenuGrid';
import { AdditionalContent } from '@/components/AdditionalContent';

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  // Prevent splash screen from auto-hiding
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#B2F5EA', '#4BC8CA', '#2BB8C9']}
        style={styles.background}
        locations={[0, 0.5, 1]}
      >
        <HomeHeader userName="Ahmad" />

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <MainBanner />
          <MenuGrid />
          <AdditionalContent />
          <View style={styles.spacer} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // Space for bottom navigation
  },
  spacer: {
    height: 40,
  },
});
