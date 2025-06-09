import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Chrome as Home, Grid2x2 as Grid, User } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === '/' || pathname === '/index') return 'home';
    if (pathname.includes('/features')) return 'features';
    if (pathname.includes('/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TabButton
          icon={
            <Home
              size={24}
              color={activeTab === 'home' ? '#2BB8C9' : '#9CA3AF'}
            />
          }
          label="Beranda"
          isActive={activeTab === 'home'}
          onPress={() => router.push('/')}
        />
        <TabButton
          icon={
            <Grid
              size={24}
              color={activeTab === 'features' ? '#2BB8C9' : '#9CA3AF'}
            />
          }
          label="Fitur"
          isActive={activeTab === 'features'}
          onPress={() => router.push('/features')}
        />
        <TabButton
          icon={
            <User
              size={24}
              color={activeTab === 'profile' ? '#2BB8C9' : '#9CA3AF'}
            />
          }
          label="Profil"
          isActive={activeTab === 'profile'}
          onPress={() => router.push('/profile')}
        />
      </View>
    </View>
  );
}

type TabButtonProps = {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

function TabButton({ icon, label, isActive, onPress }: TabButtonProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(isActive ? -8 : 0, { duration: 200 }),
        },
      ],
    };
  });

  return (
    <TouchableOpacity
      style={styles.tabButton}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          animatedStyle,
          isActive && styles.activeIconContainer,
        ]}
      >
        {icon}
      </Animated.View>
      <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
  },
  navigationBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 16,
    width: width,
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: 'rgba(43, 184, 201, 0.1)',
  },
  tabLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#2BB8C9',
  },
});
