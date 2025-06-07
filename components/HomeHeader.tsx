import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { QrCode, MessageSquare, RefreshCw } from 'lucide-react-native';

type HomeHeaderProps = {
  userName: string;
};

export function HomeHeader({ userName }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/4021766/pexels-photo-4021766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            }}
            style={styles.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>Smarthealth-ID</Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.greeting}>Halo, {userName}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Belum Verifikasi Profil</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <QrCode color="#ffffff" size={22} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MessageSquare color="#ffffff" size={22} strokeWidth={2.5} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <RefreshCw color="#ffffff" size={22} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titleContainer: {
    justifyContent: 'center',
  },
  appName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#ffffff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#ffffff',
    marginRight: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
    marginRight: 4,
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#ffffff',
  },
  actionIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
