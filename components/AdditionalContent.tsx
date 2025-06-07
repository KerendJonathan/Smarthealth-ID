import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { ArrowRight, MessageCircle } from 'lucide-react-native';

const healthTips = [
  {
    id: '1',
    title: 'Tidur 7-8 jam sehari untuk kesehatan optimal',
    image: 'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg',
  },
  {
    id: '2',
    title: 'Konsumsi 8 gelas air putih setiap hari',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg',
  },
  {
    id: '3',
    title: 'Olahraga 30 menit, 5 kali seminggu',
    image: 'https://images.pexels.com/photos/2780762/pexels-photo-2780762.jpeg',
  },
];

export function AdditionalContent() {
  const renderTipItem = ({ item }: { item: typeof healthTips[0] }) => (
    <TouchableOpacity style={styles.tipCard} activeOpacity={0.8}>
      <Image source={{ uri: item.image }} style={styles.tipImage} />
      <Text style={styles.tipTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tips Kesehatan</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>Lihat Semua</Text>
          <ArrowRight color="#2BB8C9" size={16} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={healthTips}
        renderItem={renderTipItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tipsList}
      />
      
      <View style={styles.chatSection}>
        <View style={styles.chatContent}>
          <View>
            <Text style={styles.chatTitle}>Ada keluhan kesehatan?</Text>
            <Text style={styles.chatSubtitle}>Konsultasi dengan dokter sekarang</Text>
          </View>
          <TouchableOpacity style={styles.chatButton}>
            <MessageCircle color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#ffffff',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#ffffff',
    marginRight: 4,
  },
  tipsList: {
    paddingRight: 16,
  },
  tipCard: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tipImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tipTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2B4957',
    padding: 12,
  },
  chatSection: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chatContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2B4957',
  },
  chatSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6C7A89',
    marginTop: 4,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2BB8C9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});