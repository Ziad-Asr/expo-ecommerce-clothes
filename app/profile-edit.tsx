import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react-native';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
    orderUpdates: boolean;
    newArrivals: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    dataSharing: boolean;
  };
}

export default function ProfileEditScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure smooth navigation
  useFocusEffect(
    useCallback(() => {
      // Screen is focused, ensure proper rendering
      return () => {
        // Screen is unfocused
      };
    }, [])
  );

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-01-15',
    address: {
      street: '123 Fashion Street',
      city: 'Style City',
      state: 'California',
      zipCode: '90210',
      country: 'United States',
    },
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
      orderUpdates: true,
      newArrivals: false,
    },
    privacy: {
      profileVisibility: 'private',
      showEmail: false,
      showPhone: false,
      dataSharing: false,
    },
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const updateProfile = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateAddress = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const updatePreferences = (field: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const updatePrivacy = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Your profile has been updated successfully!');
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (passwords.new.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    
    Alert.alert('Success', 'Password changed successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const InputField = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder, 
    icon: Icon,
    secureTextEntry = false,
    keyboardType = 'default' as any
  }: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    icon: any;
    secureTextEntry?: boolean;
    keyboardType?: any;
  }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon size={20} color="#888888" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  const SwitchField = ({ 
    label, 
    description, 
    value, 
    onValueChange 
  }: {
    label: string;
    description?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
  }) => (
    <View style={styles.switchContainer}>
      <View style={styles.switchTextContainer}>
        <Text style={styles.switchLabel}>{label}</Text>
        {description && (
          <Text style={styles.switchDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#333333', true: '#FFD700' }}
        thumbColor={value ? '#000000' : '#666666'}
      />
    </View>
  );

  return (
    <ScreenWrapper>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Save size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            
            <InputField
              label="First Name"
              value={profile.firstName}
              onChangeText={(text) => updateProfile('firstName', text)}
              placeholder="Enter your first name"
              icon={User}
            />

            <InputField
              label="Last Name"
              value={profile.lastName}
              onChangeText={(text) => updateProfile('lastName', text)}
              placeholder="Enter your last name"
              icon={User}
            />

            <InputField
              label="Email"
              value={profile.email}
              onChangeText={(text) => updateProfile('email', text)}
              placeholder="Enter your email"
              icon={Mail}
              keyboardType="email-address"
            />

            <InputField
              label="Phone"
              value={profile.phone}
              onChangeText={(text) => updateProfile('phone', text)}
              placeholder="Enter your phone number"
              icon={Phone}
              keyboardType="phone-pad"
            />

            <InputField
              label="Date of Birth"
              value={profile.dateOfBirth}
              onChangeText={(text) => updateProfile('dateOfBirth', text)}
              placeholder="YYYY-MM-DD"
              icon={Calendar}
            />
          </View>

          {/* Address Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            
            <InputField
              label="Street Address"
              value={profile.address.street}
              onChangeText={(text) => updateAddress('street', text)}
              placeholder="Enter your street address"
              icon={MapPin}
            />

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField
                  label="City"
                  value={profile.address.city}
                  onChangeText={(text) => updateAddress('city', text)}
                  placeholder="City"
                  icon={MapPin}
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  label="State"
                  value={profile.address.state}
                  onChangeText={(text) => updateAddress('state', text)}
                  placeholder="State"
                  icon={MapPin}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField
                  label="ZIP Code"
                  value={profile.address.zipCode}
                  onChangeText={(text) => updateAddress('zipCode', text)}
                  placeholder="ZIP"
                  icon={MapPin}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  label="Country"
                  value={profile.address.country}
                  onChangeText={(text) => updateAddress('country', text)}
                  placeholder="Country"
                  icon={MapPin}
                />
              </View>
            </View>
          </View>

          {/* Change Password */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Change Password</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Current Password</Text>
              <View style={styles.inputWrapper}>
                <Shield size={20} color="#888888" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  value={passwords.current}
                  onChangeText={(text) => setPasswords(prev => ({ ...prev, current: text }))}
                  placeholder="Enter current password"
                  placeholderTextColor="#666666"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#888888" />
                  ) : (
                    <Eye size={20} color="#888888" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <InputField
              label="New Password"
              value={passwords.new}
              onChangeText={(text) => setPasswords(prev => ({ ...prev, new: text }))}
              placeholder="Enter new password"
              icon={Shield}
              secureTextEntry={!showPassword}
            />

            <InputField
              label="Confirm New Password"
              value={passwords.confirm}
              onChangeText={(text) => setPasswords(prev => ({ ...prev, confirm: text }))}
              placeholder="Confirm new password"
              icon={Shield}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              style={styles.changePasswordButton}
              onPress={handlePasswordChange}
            >
              <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
          </View>

          {/* Notification Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
            
            <SwitchField
              label="Email Notifications"
              description="Receive notifications via email"
              value={profile.preferences.emailNotifications}
              onValueChange={(value) => updatePreferences('emailNotifications', value)}
            />

            <SwitchField
              label="Push Notifications"
              description="Receive push notifications on your device"
              value={profile.preferences.pushNotifications}
              onValueChange={(value) => updatePreferences('pushNotifications', value)}
            />

            <SwitchField
              label="SMS Notifications"
              description="Receive notifications via SMS"
              value={profile.preferences.smsNotifications}
              onValueChange={(value) => updatePreferences('smsNotifications', value)}
            />

            <SwitchField
              label="Marketing Emails"
              description="Receive promotional emails and offers"
              value={profile.preferences.marketingEmails}
              onValueChange={(value) => updatePreferences('marketingEmails', value)}
            />

            <SwitchField
              label="Order Updates"
              description="Get notified about order status changes"
              value={profile.preferences.orderUpdates}
              onValueChange={(value) => updatePreferences('orderUpdates', value)}
            />

            <SwitchField
              label="New Arrivals"
              description="Be the first to know about new products"
              value={profile.preferences.newArrivals}
              onValueChange={(value) => updatePreferences('newArrivals', value)}
            />
          </View>

          {/* Privacy Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy Settings</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Profile Visibility</Text>
              <View style={styles.segmentedControl}>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    profile.privacy.profileVisibility === 'public' && styles.activeSegment,
                  ]}
                  onPress={() => updatePrivacy('profileVisibility', 'public')}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      profile.privacy.profileVisibility === 'public' && styles.activeSegmentText,
                    ]}
                  >
                    Public
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    profile.privacy.profileVisibility === 'private' && styles.activeSegment,
                  ]}
                  onPress={() => updatePrivacy('profileVisibility', 'private')}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      profile.privacy.profileVisibility === 'private' && styles.activeSegmentText,
                    ]}
                  >
                    Private
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <SwitchField
              label="Show Email Publicly"
              description="Allow others to see your email address"
              value={profile.privacy.showEmail}
              onValueChange={(value) => updatePrivacy('showEmail', value)}
            />

            <SwitchField
              label="Show Phone Publicly"
              description="Allow others to see your phone number"
              value={profile.privacy.showPhone}
              onValueChange={(value) => updatePrivacy('showPhone', value)}
            />

            <SwitchField
              label="Data Sharing"
              description="Allow sharing of anonymized data for analytics"
              value={profile.privacy.dataSharing}
              onValueChange={(value) => updatePrivacy('dataSharing', value)}
            />
          </View>

          {/* Save Button */}
          <View style={styles.saveSection}>
            <TouchableOpacity
              style={[styles.saveProfileButton, isLoading && styles.disabledButton]}
              onPress={handleSave}
              disabled={isLoading}
            >
              <LinearGradient
                colors={isLoading ? ['#333333', '#333333'] : ['#FFD700', '#FFA500']}
                style={styles.saveGradient}
              >
                <Text style={[styles.saveProfileText, isLoading && styles.disabledText]}>
                  {isLoading ? 'Saving...' : 'Save All Changes'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 12,
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  eyeIcon: {
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  halfWidth: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  switchTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  switchLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#333333',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeSegment: {
    backgroundColor: '#FFD700',
  },
  segmentText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  activeSegmentText: {
    color: '#000000',
  },
  changePasswordButton: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  changePasswordText: {
    fontSize: 14,
    color: '#FFD700',
    fontFamily: 'Inter-SemiBold',
  },
  saveSection: {
    marginBottom: 30,
  },
  saveProfileButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  saveGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  saveProfileText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#666666',
  },
});