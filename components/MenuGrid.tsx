import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  ClipboardList,
  Shield,
  BookOpen,
  ListChecks,
  Brush as Virus,
  Syringe,
  Phone,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const itemWidth = (width - 48) / 2; // 2 columns with spacing

type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

export function MenuGrid() {
  const menuItems: MenuItem[] = [
    {
      id: '1',
      title: 'Resume Medis',
      icon: <ClipboardList color="#2BB8C9" size={28} />,
    },
    {
      id: '2',
      title: 'Health Pass',
      icon: <Shield color="#3ABACE" size={28} />,
    },
    {
      id: '3',
      title: 'Diary Kesehatan',
      icon: <BookOpen color="#2BB8C9" size={28} />,
    },
    {
      id: '4',
      title: 'Skrining Kesehatan',
      icon: <ListChecks color="#3ABACE" size={28} />,
    },
    {
      id: '5',
      title: 'Cek Gejala COVID-19',
      icon: <Virus color="#2BB8C9" size={28} />,
    },
    {
      id: '6',
      title: 'Jadwal Vaksin',
      icon: <Syringe color="#3ABACE" size={28} />,
    },
    {
      id: '7',
      title: 'Kontak Darurat',
      icon: <Phone color="#FF6B6B" size={28} />,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Layanan Utama</Text>
      <View style={styles.menuGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.menuTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: itemWidth,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(165, 241, 231, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#2B4957',
    textAlign: 'center',
  },
});
