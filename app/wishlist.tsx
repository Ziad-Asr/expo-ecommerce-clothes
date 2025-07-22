import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingBag,
  Trash2,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const productWidth = (width - 60) / 2;

const wishlistItems = [
  {
    id: 2,
    name: 'Designer Hoodie',
    price: 159,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 4,
    name: 'Casual Summer Dress',
    price: 129,
    originalPrice: 180,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 7,
    name: 'Elegant Evening Dress',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    rating: 4.9,
    inStock: false,
  },
  {
    id: 10,
    name: 'Comfortable Sneakers',
    price: 149,
    originalPrice: 199,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    rating: 4.6,
    inStock: true,
  },
];

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState(wishlistItems);

  // Ensure smooth navigation
  useFocusEffect(
    useCallback(() => {
      // Screen is focused, ensure proper rendering
      return () => {
        // Screen is unfocused
      };
    }, [])
  );

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const ProductCard = ({ product }: { product: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromWishlist(product.id)}
        >
          <Trash2 size={16} color="#FF4444" />
        </TouchableOpacity>
        {product.originalPrice > product.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              %
            </Text>
          </View>
        )}
        {!product.inStock && (
          <View style={styles.outOfStockOverlay}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Star size={12} color="#FFD700" fill="#FFD700" />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !product.inStock && styles.disabledButton,
          ]}
          disabled={!product.inStock}
        >
          <ShoppingBag
            size={16}
            color={product.inStock ? '#000000' : '#666666'}
          />
          <Text
            style={[
              styles.addToCartText,
              !product.inStock && styles.disabledText,
            ]}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (wishlist.length === 0) {
    return (
      <ScreenWrapper>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Wishlist</Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.emptyWishlist}>
            <Heart size={80} color="#333333" />
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>
              Add items you love to see them here
            </Text>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.shopButtonText}>Start Shopping</Text>
            </TouchableOpacity>
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
          <Text style={styles.title}>Wishlist</Text>
          <Text style={styles.itemCount}>{wishlist.length} items</Text>
        </View>

        {/* Wishlist Items */}
        <ScrollView
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.productsGrid}>
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
  itemCount: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  placeholder: {
    width: 40,
  },
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  productCard: {
    width: productWidth,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Inter-Bold',
  },
  outOfStockOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 8,
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#FF4444',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    color: '#888888',
    fontSize: 11,
    marginLeft: 3,
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#888888',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Regular',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 8,
    gap: 6,
  },
  disabledButton: {
    backgroundColor: '#333333',
  },
  addToCartText: {
    fontSize: 12,
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  disabledText: {
    color: '#666666',
  },
  emptyWishlist: {
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
});
