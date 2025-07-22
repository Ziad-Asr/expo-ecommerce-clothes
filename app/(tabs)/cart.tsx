import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const initialCartItems = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 89,
    size: 'M',
    color: 'Black',
    quantity: 2,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
  },
  {
    id: 2,
    name: 'Designer Hoodie',
    price: 159,
    size: 'L',
    color: 'Gray',
    quantity: 1,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [modalVisible, setModalVisible] = useState(false);

  // Ensure smooth navigation back to this screen
  useFocusEffect(
    useCallback(() => {
      // Screen is focused, ensure proper rendering
      return () => {
        // Screen is unfocused
      };
    }, [])
  );

  const updateQuantity = (id: number, change: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  const CartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemVariant}>
            Size: {item.size} • Color: {item.color}
          </Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Trash2 size={16} color="#FF4444" />
        </TouchableOpacity>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Minus size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#000000']}
        style={styles.container}
      >
        <SafeAreaView
          style={styles.safeArea}
          edges={['top', 'bottom', 'left', 'right']}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Shopping Cart</Text>
          </View>
          <View style={styles.emptyCart}>
            <ShoppingBag size={80} color="#333333" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add some items to get started
            </Text>
            <TouchableOpacity style={styles.shopButton}>
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

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
          <Text style={styles.title}>Shopping Cart</Text>
          <Text style={styles.itemCount}>{cartItems.length} items</Text>
        </View>

        {/* Cart Items */}
        <ScrollView
          style={styles.cartList}
          showsVerticalScrollIndicator={false}
        >
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* Static Button for Summary & Checkout */}
        <View style={styles.stickyButtonContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.stickyButton}
            activeOpacity={0.85}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.stickyButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.stickyButtonText}>
                View Summary & Checkout
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Modal for Order Summary & Checkout */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Order Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>${shipping}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${total}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutButton}>
                <LinearGradient
                  colors={['#FFD700', '#FFA500']}
                  style={styles.checkoutGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.checkoutButtonText}>
                    Proceed to Checkout
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  itemCount: {
    fontSize: 16,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'column',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  cartItemContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  itemName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 6,
    lineHeight: 22,
  },
  itemVariant: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 20,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  removeButton: {
    backgroundColor: '#FF444420',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 25,
    padding: 6,
  },
  quantityButton: {
    backgroundColor: '#FFD700',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 20,
    minWidth: 24,
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333333',
    borderBottomWidth: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 15,
    marginBottom: 25,
  },
  totalLabel: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  totalValue: {
    fontSize: 24,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
  },
  checkoutButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  checkoutGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  emptyCart: {
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
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  shopButtonText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  stickyButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 30 : 20,
    alignItems: 'center',
    zIndex: 10,
    pointerEvents: 'box-none',
  },
  stickyButton: {
    width: '90%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  stickyButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  stickyButtonText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: '#333333',
    borderBottomWidth: 0,
  },
  modalTitle: {
    fontSize: 22,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeModalButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#FFD700',
    fontFamily: 'Inter-SemiBold',
  },
});
