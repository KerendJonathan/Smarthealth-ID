import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gift } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const bannerData = [
  {
    id: '1',
    title: 'Hadiah Ulang Tahun dari Negara untuk Anda',
    subtitle: 'Ayo ikuti Cek Kesehatan Gratis!',
    imageUrl: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg',
  },
  {
    id: '2',
    title: 'Lindungi Keluarga dari Penyakit Menular',
    subtitle: 'Vaksinasi Keluarga Sekarang',
    imageUrl: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg',
  },
  {
    id: '3',
    title: 'Konsultasi dengan Dokter Online',
    subtitle: 'Cepat, Aman, dan Terpercaya',
    imageUrl: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg',
  },
];

export function MainBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const opacity = useSharedValue(1);
  
  // Auto scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % bannerData.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Animated fade effect when switching banners
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });
  
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const renderBannerItem = ({ item }: { item: typeof bannerData[0] }) => {
    return (
      <View style={styles.bannerItemContainer}>
        <LinearGradient
          colors={['#A5F1E7', '#6DD3D4', '#3ABACE']}
          style={styles.bannerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={styles.bannerContent}>
            <View style={styles.textContainer}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Daftar Sekarang</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.bannerImageContainer}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.bannerImage}
              />
            </View>
            
            <View style={styles.iconCircle}>
              <Gift color="#2BB8C9" size={24} />
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.bannerContainer, animatedStyle]}>
      <FlatList
        ref={flatListRef}
        data={bannerData}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: width - 32,
          offset: (width - 32) * index,
          index,
        })}
      />
      
      {/* Dots indicator */}
      <View style={styles.pagination}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: 16,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerItemContainer: {
    width: width - 32, // Account for horizontal padding
    height: 200,
  },
  bannerGradient: {
    flex: 1,
    borderRadius: 16,
  },
  bannerContent: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: '60%',
  },
  bannerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 12,
  },
  registerButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  registerButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2BB8C9',
  },
  bannerImageContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 120,
    height: 120,
  },
  bannerImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 16,
  },
  iconCircle: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    width: '100%',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ffffff',
    width: 16,
  },
});