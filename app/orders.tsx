import React, { useState } from 'react';
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
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Package,
  Truck,
  CircleCheck as CheckCircle,
  Clock,
} from 'lucide-react-native';

const orders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 248,
    items: [
      {
        name: 'Premium Cotton T-Shirt',
        image:
          'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
        quantity: 2,
        price: 89,
      },
      {
        name: 'Designer Hoodie',
        image:
          'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
        quantity: 1,
        price: 159,
      },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'shipped',
    total: 129,
    items: [
      {
        name: 'Casual Summer Dress',
        image:
          'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
        quantity: 1,
        price: 129,
      },
    ],
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'processing',
    total: 399,
    items: [
      {
        name: 'Leather Biker Jacket',
        image:
          'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
        quantity: 1,
        price: 399,
      },
    ],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle size={20} color="#4CAF50" />;
    case 'shipped':
      return <Truck size={20} color="#2196F3" />;
    case 'processing':
      return <Clock size={20} color="#FF9800" />;
    default:
      return <Package size={20} color="#888888" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return '#4CAF50';
    case 'shipped':
      return '#2196F3';
    case 'processing':
      return '#FF9800';
    default:
      return '#888888';
  }
};

export default function OrdersScreen() {
  const router = useRouter();

  const OrderCard = ({ order }: { order: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>{order.id}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          {getStatusIcon(order.status)}
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>
          Total: <Text style={styles.totalAmount}>${order.total}</Text>
        </Text>
        <TouchableOpacity style={styles.trackButton}>
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </View>
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
          <Text style={styles.title}>My Orders</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Orders List */}
        <ScrollView
          style={styles.ordersList}
          showsVerticalScrollIndicator={false}
        >
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
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
  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  orderDate: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginLeft: 6,
  },
  orderItems: {
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: 'cover',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  itemQuantity: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  itemPrice: {
    fontSize: 16,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  totalAmount: {
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
  },
  trackButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  trackButtonText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
});
