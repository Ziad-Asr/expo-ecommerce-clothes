import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react-native';

export default function TermsScreen() {
  const router = useRouter();

  // Ensure smooth navigation
  useFocusEffect(
    useCallback(() => {
      // Screen is focused, ensure proper rendering
      return () => {
        // Screen is unfocused
      };
    }, [])
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Terms & Conditions</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Terms Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.lastUpdated}>
              Last updated: January 15, 2024
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
            <Text style={styles.sectionText}>
              By accessing and using this mobile application, you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Use License</Text>
            <Text style={styles.sectionText}>
              Permission is granted to temporarily download one copy of the
              materials on our app for personal, non-commercial transitory
              viewing only. This is the grant of a license, not a transfer of
              title, and under this license you may not:
            </Text>
            <Text style={styles.bulletPoint}>
              • Modify or copy the materials
            </Text>
            <Text style={styles.bulletPoint}>
              • Use the materials for any commercial purpose or for any public
              display
            </Text>
            <Text style={styles.bulletPoint}>
              • Attempt to reverse engineer any software contained in the app
            </Text>
            <Text style={styles.bulletPoint}>
              • Remove any copyright or other proprietary notations from the
              materials
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Account Terms</Text>
            <Text style={styles.sectionText}>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. You are
              responsible for safeguarding the password and for all activities
              that occur under your account.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
            <Text style={styles.sectionText}>
              Your privacy is important to us. Our Privacy Policy explains how
              we collect, use, and protect your information when you use our
              service. By using our service, you agree to the collection and use
              of information in accordance with our Privacy Policy.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Purchases and Payments</Text>
            <Text style={styles.sectionText}>
              All purchases made through our app are subject to our refund and
              return policy. We reserve the right to refuse or cancel your order
              at any time for certain reasons including but not limited to:
              product or service availability, errors in the description or
              price of the product or service, error in your order or other
              reasons.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>6. Prohibited Uses</Text>
            <Text style={styles.sectionText}>You may not use our app:</Text>
            <Text style={styles.bulletPoint}>
              • For any unlawful purpose or to solicit others to perform
              unlawful acts
            </Text>
            <Text style={styles.bulletPoint}>
              • To violate any international, federal, provincial, or state
              regulations, rules, laws, or local ordinances
            </Text>
            <Text style={styles.bulletPoint}>
              • To infringe upon or violate our intellectual property rights or
              the intellectual property rights of others
            </Text>
            <Text style={styles.bulletPoint}>
              • To harass, abuse, insult, harm, defame, slander, disparage,
              intimidate, or discriminate
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>7. Disclaimer</Text>
            <Text style={styles.sectionText}>
              The information on this app is provided on an 'as is' basis. To
              the fullest extent permitted by law, this Company excludes all
              representations, warranties, conditions and terms whether express
              or implied.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>8. Limitations</Text>
            <Text style={styles.sectionText}>
              In no event shall our company or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our app.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>9. Accuracy of Materials</Text>
            <Text style={styles.sectionText}>
              The materials appearing on our app could include technical,
              typographical, or photographic errors. We do not warrant that any
              of the materials on its app are accurate, complete, or current.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>10. Modifications</Text>
            <Text style={styles.sectionText}>
              We may revise these terms of service for its app at any time
              without notice. By using this app, you are agreeing to be bound by
              the then current version of these terms of service.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>11. Contact Information</Text>
            <Text style={styles.sectionText}>
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </Text>
            <Text style={styles.contactInfo}>
              Email: support@fashionapp.com
            </Text>
            <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
            <Text style={styles.contactInfo}>
              Address: 123 Fashion Street, Style City, SC 12345
            </Text>
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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 14,
    color: '#FFD700',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
});
