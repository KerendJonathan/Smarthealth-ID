import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
}

export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const gradientOpacity = useSharedValue(1);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    // Start the animation sequence
    const startAnimation = () => {
      // Logo entrance animation
      logoOpacity.value = withTiming(1, {
        duration: 800,
        easing: Easing.out(Easing.cubic),
      });

      logoScale.value = withSequence(
        withTiming(1.1, {
          duration: 600,
          easing: Easing.out(Easing.cubic),
        }),
        withTiming(1, {
          duration: 200,
          easing: Easing.inOut(Easing.quad),
        })
      );

      // Pulse animation
      pulseScale.value = withDelay(
        800,
        withSequence(
          withTiming(1.05, { duration: 400 }),
          withTiming(1, { duration: 400 }),
          withTiming(1.05, { duration: 400 }),
          withTiming(1, { duration: 400 })
        )
      );

      // Exit animation
      setTimeout(() => {
        gradientOpacity.value = withTiming(
          0,
          {
            duration: 500,
            easing: Easing.inOut(Easing.quad),
          },
          () => {
            if (onAnimationComplete) {
              runOnJS(onAnimationComplete)();
            }
          }
        );
      }, 2500);
    };

    startAnimation();
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const pulseAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: gradientOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <LinearGradient
        colors={['#A5F1E7', '#6DD3D4', '#2BB8C9']}
        style={styles.gradient}
        locations={[0, 0.5, 1]}
      >
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.logoWrapper, pulseAnimatedStyle]}>
            <Animated.View style={logoAnimatedStyle}>
              <Image
                source={require('../assets/images/Splash Screen.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>
          </Animated.View>
        </View>

        {/* Decorative elements */}
        <View style={styles.decorativeElements}>
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.4,
    maxWidth: 300,
    maxHeight: 300,
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 120,
    height: 120,
    top: height * 0.15,
    right: -60,
  },
  circle2: {
    width: 80,
    height: 80,
    bottom: height * 0.2,
    left: -40,
  },
  circle3: {
    width: 60,
    height: 60,
    top: height * 0.25,
    left: width * 0.1,
  },
});
