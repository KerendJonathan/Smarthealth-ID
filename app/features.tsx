import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, ArrowLeft } from 'lucide-react-native';
import {
  ClipboardList,
  Shield,
  FileCheck,
  ListChecks,
  Brush as Virus,
  Syringe,
  Phone,
  HeartPulse,
  Clock,
  UserCheck,
} from 'lucide-react-native';
import { useState } from 'react';

const categories = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Health Tools' },
  { id: '3', name: 'Certificates' },
  { id: '4', name: 'Emergency' },
  { id: '5', name: 'COVID-19' },
];

const features = [
  {
    id: '1',
    title: 'Medical Resume',
    description: 'View your medical records',
    icon: ClipboardList,
    category: 'Health Tools',
  },
  {
    id: '2',
    title: 'Health Pass',
    description: 'Access vaccination status',
    icon: Shield,
    category: 'Certificates',
  },
  {
    id: '3',
    title: 'Digital Certificate',
    description: 'Manage health documents',
    icon: FileCheck,
    category: 'Certificates',
  },
  {
    id: '4',
    title: 'Screening Result',
    description: 'View latest test results',
    icon: ListChecks,
    category: 'Health Tools',
  },
  {
    id: '5',
    title: 'COVID-19 Zone Info',
    description: 'Local pandemic risk map',
    icon: Virus,
    category: 'COVID-19',
  },
  {
    id: '6',
    title: 'Hospital Queue',
    description: 'Live clinic wait times',
    icon: Clock,
    category: 'Emergency',
  },
  {
    id: '7',
    title: 'Vaccination Schedule',
    description: 'Upcoming appointments',
    icon: Syringe,
    category: 'Health Tools',
  },
  {
    id: '8',
    title: 'Symptom Checker',
    description: 'Self-check common symptoms',
    icon: HeartPulse,
    category: 'Health Tools',
  },
  {
    id: '9',
    title: 'Emergency Hotlines',
    description: 'Key health contact numbers',
    icon: Phone,
    category: 'Emergency',
  },
  {
    id: '10',
    title: 'Organ Donation',
    description: 'Update donor status',
    icon: UserCheck,
    category: 'Certificates',
  },
];

export default function FeaturesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFeatures = features.filter((feature) => {
    const matchesCategory =
      selectedCategory === 'All' || feature.category === selectedCategory;
    const matchesSearch =
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderFeatureCard = ({ item }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity style={styles.featureCard} activeOpacity={0.7}>
        <View style={styles.iconContainer}>
          <Icon size={24} color="#2BB8C9" strokeWidth={2} />
        </View>
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderCategoryChip = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.name && styles.categoryChipActive,
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#B2F5EA', '#4BC8CA', '#2BB8C9']}
        style={styles.background}
        locations={[0, 0.5, 1]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Features</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search color="#6C7A89" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search health features..."
            placeholderTextColor="#6C7A89"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryChip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
          contentContainerStyle={styles.categoryContent}
        />

        <FlatList
          data={filteredFeatures}
          renderItem={renderFeatureCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.featuresContent}
          columnWrapperStyle={styles.featuresRow}
        />
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
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#2B4957',
  },
  categoryList: {
    maxHeight: 48,
    marginBottom: 16,
  },
  categoryContent: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#2BB8C9',
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2BB8C9',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  featuresContent: {
    padding: 16,
    paddingBottom: 100, // Space for bottom navigation
  },
  featuresRow: {
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(43, 184, 201, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2B4957',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6C7A89',
  },
});
