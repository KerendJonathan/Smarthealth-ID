import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Menu,
  CreditCard as Edit3,
  Camera,
  ArrowLeft,
  CircleHelp as HelpCircle,
  Phone,
  Info,
  Palette,
  Globe,
  Shield,
  LogOut,
  User,
  Activity,
  Heart,
  Droplets,
  Moon,
  Footprints,
  Flame,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from 'lucide-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function ProfileScreen() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-screenWidth * 0.7));
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    namaLengkap: 'Ahmad Rizki Pratama',
    nik: '3201234567890002',
    nomorTelepon: '+62 812-3456-7890',
    email: 'ahmad.rizki@email.com',
    tanggalLahir: '15/08/1990',
    jenisKelamin: 'Laki-laki',
    nomorPaspor: '',
    pekerjaan: 'Software Engineer',
    alamatDomisili: 'Jl. Sudirman No. 123, Jakarta Pusat',
    detailAlamat: 'RT 001/RW 005, Kelurahan Tanah Abang',
    golonganDarah: 'A+',
    penyakitSaatIni: 'Tidak ada',
    obatSaatIni: 'Tidak ada',
    alergi: 'Seafood, Debu',
  });

  const healthData = [
    {
      id: 1,
      title: 'Steps',
      value: '8,547',
      unit: 'Steps',
      icon: Footprints,
      color: '#4BC8CA',
    },
    {
      id: 2,
      title: 'Calories',
      value: '2,340',
      unit: 'kcal',
      icon: Flame,
      color: '#FF5E5B',
    },
    {
      id: 3,
      title: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      icon: Heart,
      color: '#FF6B6B',
    },
    {
      id: 4,
      title: 'Sleep',
      value: '7h 45m',
      unit: 'Score 196',
      icon: Moon,
      color: '#6C5CE7',
    },
    {
      id: 5,
      title: 'Water Intake',
      value: '6',
      unit: 'Cups',
      icon: Droplets,
      color: '#00B894',
    },
    {
      id: 6,
      title: 'Activity',
      value: '45',
      unit: 'min',
      icon: Activity,
      color: '#FDCB6E',
    },
  ];

  const menuItems = [
    { id: 1, title: 'Help Center', icon: HelpCircle },
    { id: 2, title: 'National Emergency Number', icon: Phone },
    { id: 3, title: 'About', icon: Info },
    { id: 4, title: 'Theme', icon: Palette },
    { id: 5, title: 'Language', icon: Globe },
    { id: 6, title: 'Account Security', icon: Shield },
    { id: 7, title: 'Logout', icon: LogOut, isLogout: true },
  ];

  // Calendar data with events
  const calendarEvents = {
    '2024-01-15': { type: 'vaccination', title: 'COVID-19 Booster' },
    '2024-01-22': { type: 'checkup', title: 'Health Checkup' },
    '2024-01-28': { type: 'vaccination', title: 'Flu Shot' },
  };

  const openSidebar = () => {
    setShowSidebar(true);
    Animated.timing(sidebarAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: -screenWidth * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowSidebar(false);
    });
  };

  const handleMenuItemPress = (item) => {
    if (item.isLogout) {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => console.log('Logout'),
        },
      ]);
    } else {
      console.log('Navigate to:', item.title);
    }
    closeSidebar();
  };

  const handleSaveProfile = () => {
    console.log('Saving profile data:', formData);
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`;
      const hasEvent = calendarEvents[dateKey];

      days.push(
        <TouchableOpacity
          key={day}
          style={[styles.calendarDay, hasEvent && styles.calendarDayWithEvent]}
          onPress={() => hasEvent && Alert.alert('Event', hasEvent.title)}
        >
          <Text
            style={[
              styles.calendarDayText,
              hasEvent && styles.calendarDayTextWithEvent,
            ]}
          >
            {day}
          </Text>
          {hasEvent && <View style={styles.eventDot} />}
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setCurrentMonth(new Date(year, month - 1, 1))}
            style={styles.calendarNavButton}
          >
            <ChevronLeft size={20} color="#4BC8CA" />
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>
            {monthNames[month]} {year}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentMonth(new Date(year, month + 1, 1))}
            style={styles.calendarNavButton}
          >
            <ChevronRight size={20} color="#4BC8CA" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarWeekHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.calendarWeekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>{days}</View>
      </View>
    );
  };

  const renderHealthCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.healthCard}
      activeOpacity={0.7}
    >
      <View style={styles.healthCardContent}>
        <View
          style={[
            styles.healthIconContainer,
            { backgroundColor: `${item.color}20` },
          ]}
        >
          <item.icon size={24} color={item.color} strokeWidth={2} />
        </View>
        <View style={styles.healthDataContainer}>
          <Text style={styles.healthValue}>{item.value}</Text>
          <Text style={styles.healthUnit}>{item.unit}</Text>
        </View>
      </View>
      <Text style={styles.healthTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#A5F1E7', '#6DD3D4', '#2BB8C9']}
        style={styles.background}
        locations={[0, 0.5, 1]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.menuButton} onPress={openSidebar}>
            <Menu color="#ffffff" size={24} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* User Identity Card */}
          <View style={styles.identityCard}>
            <View style={styles.identityContent}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User size={32} color="#4BC8CA" strokeWidth={2} />
                </View>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{formData.namaLengkap}</Text>
                <Text style={styles.userPhone}>{formData.nomorTelepon}</Text>
                <Text style={styles.userNik}>
                  NIK:{' '}
                  {formData.nik.replace(/(\d{4})(\d{8})(\d{4})/, '$1****$3')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setShowEditModal(true)}
              >
                <Edit3 size={20} color="#4BC8CA" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Health Data Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health Data</Text>

            {/* Calendar Widget */}
            {renderCalendar()}

            {/* Health Metrics Cards */}
            <View style={styles.healthGrid}>
              {healthData.map(renderHealthCard)}
            </View>
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Right-Side Sliding Sidebar */}
        {showSidebar && (
          <View style={styles.sidebarOverlay}>
            <TouchableOpacity
              style={styles.sidebarBackdrop}
              activeOpacity={1}
              onPress={closeSidebar}
            />
            <Animated.View
              style={[
                styles.sidebar,
                {
                  transform: [{ translateX: sidebarAnimation }],
                },
              ]}
            >
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>Menu</Text>
                <TouchableOpacity
                  onPress={closeSidebar}
                  style={styles.closeButton}
                >
                  <X size={24} color="#333333" strokeWidth={2} />
                </TouchableOpacity>
              </View>

              <View style={styles.sidebarContent}>
                {menuItems.map((item, index) => (
                  <View key={item.id}>
                    <TouchableOpacity
                      style={styles.sidebarMenuItem}
                      onPress={() => handleMenuItemPress(item)}
                    >
                      <item.icon
                        size={20}
                        color={item.isLogout ? '#FF5E5B' : '#4BC8CA'}
                        strokeWidth={2}
                      />
                      <Text
                        style={[
                          styles.sidebarMenuText,
                          item.isLogout && styles.logoutText,
                        ]}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                    {index < menuItems.length - 1 && (
                      <View style={styles.sidebarDivider} />
                    )}
                  </View>
                ))}
              </View>
            </Animated.View>
          </View>
        )}

        {/* Edit Profile Modal */}
        <Modal
          visible={showEditModal}
          animationType="slide"
          onRequestClose={() => setShowEditModal(false)}
        >
          <View style={styles.editModalContainer}>
            <LinearGradient
              colors={['#A5F1E7', '#6DD3D4', '#2BB8C9']}
              style={styles.editModalHeader}
              locations={[0, 0.5, 1]}
            >
              <View style={styles.editHeader}>
                <TouchableOpacity onPress={() => setShowEditModal(false)}>
                  <ArrowLeft color="#ffffff" size={24} strokeWidth={2} />
                </TouchableOpacity>
                <Text style={styles.editHeaderTitle}>Edit Identity</Text>
                <TouchableOpacity onPress={handleSaveProfile}>
                  <Text style={styles.saveButton}>Save</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            <ScrollView
              style={styles.editForm}
              showsVerticalScrollIndicator={false}
            >
              {/* Profile Photo Section */}
              <View style={styles.photoSection}>
                <TouchableOpacity style={styles.photoContainer}>
                  <View style={styles.photoAvatar}>
                    <User size={40} color="#4BC8CA" strokeWidth={2} />
                  </View>
                  <View style={styles.cameraOverlay}>
                    <Camera size={16} color="#ffffff" strokeWidth={2} />
                  </View>
                </TouchableOpacity>
                <Text style={styles.photoLabel}>Upload Photo</Text>
              </View>

              {/* Form Fields */}
              <View style={styles.formFields}>
                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>
                    Full Name <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.namaLengkap}
                    onChangeText={(text) =>
                      setFormData({ ...formData, namaLengkap: text })
                    }
                    placeholder="Enter full name"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>
                    National ID (NIK) <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.nik}
                    onChangeText={(text) =>
                      setFormData({ ...formData, nik: text })
                    }
                    placeholder="Enter NIK"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>
                    Phone Number <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.nomorTelepon}
                    onChangeText={(text) =>
                      setFormData({ ...formData, nomorTelepon: text })
                    }
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>
                    Email Address <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    placeholder="Enter email"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Date of Birth</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.tanggalLahir}
                    onChangeText={(text) =>
                      setFormData({ ...formData, tanggalLahir: text })
                    }
                    placeholder="DD/MM/YYYY"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Gender</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.jenisKelamin}
                    onChangeText={(text) =>
                      setFormData({ ...formData, jenisKelamin: text })
                    }
                    placeholder="Select gender"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Passport Number</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.nomorPaspor}
                    onChangeText={(text) =>
                      setFormData({ ...formData, nomorPaspor: text })
                    }
                    placeholder="Enter passport number (optional)"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Occupation</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.pekerjaan}
                    onChangeText={(text) =>
                      setFormData({ ...formData, pekerjaan: text })
                    }
                    placeholder="Enter occupation"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Residence Address</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.alamatDomisili}
                    onChangeText={(text) =>
                      setFormData({ ...formData, alamatDomisili: text })
                    }
                    placeholder="Enter residence address"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Address Details</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.detailAlamat}
                    onChangeText={(text) =>
                      setFormData({ ...formData, detailAlamat: text })
                    }
                    placeholder="Enter address details"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Blood Type</Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.golonganDarah}
                    onChangeText={(text) =>
                      setFormData({ ...formData, golonganDarah: text })
                    }
                    placeholder="Select blood type"
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Current Conditions</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.penyakitSaatIni}
                    onChangeText={(text) =>
                      setFormData({ ...formData, penyakitSaatIni: text })
                    }
                    placeholder="Enter current conditions"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Current Medications</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.obatSaatIni}
                    onChangeText={(text) =>
                      setFormData({ ...formData, obatSaatIni: text })
                    }
                    placeholder="Enter current medications"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>Allergies</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={formData.alergi}
                    onChangeText={(text) =>
                      setFormData({ ...formData, alergi: text })
                    }
                    placeholder="Enter allergies"
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <TouchableOpacity
                  style={styles.saveButtonFull}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  identityCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  identityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(75, 200, 202, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4BC8CA',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  userPhone: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 2,
  },
  userNik: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666666',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(75, 200, 202, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(75, 200, 202, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  calendarWeekHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  calendarWeekDay: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#666666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  calendarDayWithEvent: {
    backgroundColor: 'rgba(75, 200, 202, 0.1)',
    borderRadius: 16,
  },
  calendarDayText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333333',
  },
  calendarDayTextWithEvent: {
    color: '#4BC8CA',
    fontFamily: 'Poppins-SemiBold',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4BC8CA',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  healthCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    minHeight: 120,
  },
  healthCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  healthDataContainer: {
    flex: 1,
  },
  healthValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333333',
  },
  healthUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666666',
  },
  healthTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
  },
  spacer: {
    height: 40,
  },
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  sidebarBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: screenWidth * 0.7,
    height: screenHeight,
    backgroundColor: '#ffffff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sidebarTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 16,
  },
  sidebarMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sidebarMenuText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  logoutText: {
    color: '#FF5E5B',
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 20,
  },
  editModalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  editModalHeader: {
    paddingTop: 48,
    paddingBottom: 16,
  },
  editHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  editHeaderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
  editForm: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  photoAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(75, 200, 202, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4BC8CA',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4BC8CA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4BC8CA',
  },
  formFields: {
    padding: 16,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
  required: {
    color: '#FF5E5B',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333333',
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButtonFull: {
    backgroundColor: '#4BC8CA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  saveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#ffffff',
  },
});
