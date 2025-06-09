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
// Import your custom splash screen image
const splashImage = require('../assets/images/splash.png'); //SplashScreen

import { useEffect } from 'react';

import { HomeHeader } from '../components/HomeHeader';
import { MainBanner } from '../components/MainBanner';
import { MenuGrid } from '../components/MenuGrid';
import { AdditionalContent } from '../components/AdditionalContent';
import { SplashScreen } from 'expo-router';

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

  /// Show custom splash screen while fonts load
  if (!fontsLoaded && !fontError) {
    return (
      <View style={styles.splashContainer}>
        <Image
          source={splashImage}
          style={styles.splashImage}
          resizeMode="cover"
        />
      </View>
    );
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
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
});
