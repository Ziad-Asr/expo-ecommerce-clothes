import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {
  ArrowLeft,
  Package,
  Heart,
  ShoppingBag,
  Star,
  Bell,
  Trash2,
} from 'lucide-react-native';

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #ORD-001 has been delivered successfully.',
    time: '2 hours ago',
    read: false,
    icon: Package,
    color: '#4CAF50',
  },
  {
    id: 2,
    type: 'wishlist',
    title: 'Item Back in Stock',
    message: 'Premium Cotton T-Shirt is now available in your size.',
    time: '5 hours ago',
    read: false,
    icon: Heart,
    color: '#FF6B6B',
  },
  {
    id: 3,
    type: 'promotion',
    title: 'Special Offer',
    message: 'Get 30% off on all summer collection. Limited time offer!',
    time: '1 day ago',
    read: true,
    icon: ShoppingBag,
    color: '#FFD700',
  },
  {
    id: 4,
    type: 'review',
    title: 'Review Reminder',
    message: 'How was your recent purchase? Leave a review and earn points.',
    time: '2 days ago',
    read: true,
    icon: Star,
    color: '#FFA726',
  },
  {
    id: 5,
    type: 'order',
    title: 'Order Shipped',
    message: 'Your order #ORD-002 is on its way. Track your package.',
    time: '3 days ago',
    read: true,
    icon: Package,
    color: '#2196F3',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notificationList, setNotificationList] = useState(notifications);

  // Ensure smooth navigation
  useFocusEffect(
    useCallback(() => {
      // Screen is focused, ensure proper rendering
      return () => {
        // Screen is unfocused
      };
    }, [])
  );

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const NotificationCard = ({ notification }: { notification: any }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !notification.read && styles.unreadCard]}
      activeOpacity={0.7}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${notification.color}20` },
          ]}
        >
          <notification.icon size={20} color={notification.color} />
        </View>
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
        {!notification.read && <View style={styles.unreadDot} />}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(notification.id)}
      >
        <Trash2 size={16} color="#FF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (notificationList.length === 0) {
    return (
      <ScreenWrapper>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.emptyNotifications}>
            <Bell size={80} color="#333333" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>You're all caught up!</Text>
          </View>
      </ScreenWrapper>
    );
  }

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
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={markAllAsRead}
            >
              <Text style={styles.markAllText}>Mark All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Unread Count */}
        {unreadCount > 0 && (
          <View style={styles.unreadCountContainer}>
            <Text style={styles.unreadCountText}>
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Notifications List */}
        <ScrollView
          style={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        >
          {notificationList.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
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
  markAllButton: {
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  markAllText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  placeholder: {
    width: 60,
  },
  unreadCountContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  unreadCountText: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  unreadCard: {
    borderColor: '#FFD700',
    backgroundColor: '#1a1a1a',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    marginLeft: 8,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF444420',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  emptyNotifications: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});
