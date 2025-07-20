import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Settings,
  Heart,
  ShoppingBag,
  CreditCard,
  MapPin,
  Bell,
  CircleHelp as HelpCircle,
  LogOut,
  ChevronRight,
  User,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const menuItems = [
  { icon: ShoppingBag, label: 'My Orders', color: '#FFD700' },
  { icon: Heart, label: 'Wishlist', color: '#FF6B6B' },
  { icon: User, label: 'Edit Profile', color: '#4CAF50' },
  { icon: Bell, label: 'Notifications', color: '#FFA726' },
  { icon: Settings, label: 'Terms & Conditions', color: '#9C27B0' },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleMenuPress = (label: string) => {
    switch (label) {
      case 'My Orders':
        router.push('/orders');
        break;
      case 'Wishlist':
        router.push('/wishlist');
        break;
      case 'Edit Profile':
        router.push('/profile-edit');
        break;
      case 'Notifications':
        router.push('/notifications');
        break;
      case 'Terms & Conditions':
        router.push('/terms');
        break;
    }
  };

  const MenuItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={() => handleMenuPress(item.label)}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}
        >
          <item.icon size={20} color={item.color} />
        </View>
        <Text style={styles.menuItemText}>{item.label}</Text>
      </View>
      <ChevronRight size={20} color="#888888" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#000000']}
      style={styles.container}
    >
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'bottom', 'left', 'right']}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>

          {/* Profile Info */}
          <View style={styles.profileSection}>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.avatarGradient}
                >
                  <User size={40} color="#000000" />
                </LinearGradient>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>john.doe@example.com</Text>
                <Text style={styles.memberSince}>Member since 2023</Text>
              </View>
              <TouchableOpacity style={styles.editButton} onPress={() => handleMenuPress('Edit Profile')}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>28</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </View>

          {/* Logout */}
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
              <LogOut size={20} color="#FF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <View style={styles.versionSection}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
    textAlign: 'center',
  },
  memberSince: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  statNumber: {
    fontSize: 24,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF444420',
    borderRadius: 15,
    padding: 18,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  logoutText: {
    fontSize: 16,
    color: '#FF4444',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 10,
  },
  versionSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Inter-Regular',
  },
});
