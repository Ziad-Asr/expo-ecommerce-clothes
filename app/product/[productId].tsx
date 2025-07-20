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
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingBag,
  Share,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock product data
const getProductById = (productId: string) => {
  const products = {
    '1': {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 89,
      originalPrice: 120,
      images: [
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      ],
      rating: 4.8,
      reviewCount: 124,
      description:
        'Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this shirt offers exceptional softness and breathability. Perfect for casual wear or layering.',
      features: [
        '100% Organic Cotton',
        'Pre-shrunk fabric',
        'Reinforced seams',
        'Machine washable',
        'Eco-friendly dyes',
      ],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Gray', hex: '#808080' },
        { name: 'Navy', hex: '#000080' },
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
    },
    '2': {
      id: 2,
      name: 'Classic Cotton Tee',
      price: 65,
      originalPrice: 85,
      images: [
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      ],
      rating: 4.6,
      reviewCount: 89,
      description:
        'A timeless classic that never goes out of style. This cotton tee is perfect for everyday wear.',
      features: ['100% Cotton', 'Classic fit', 'Durable construction'],
      colors: [
        { name: 'Navy', hex: '#000080' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Red', hex: '#FF0000' },
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
    },
  };

  return products[productId as keyof typeof products] || products['1'];
};

export default function ProductDetailScreen() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();
  const product = getProductById(productId as string);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const ColorOption = ({ color }: { color: any }) => (
    <TouchableOpacity
      style={[
        styles.colorOption,
        { backgroundColor: color.hex },
        selectedColor.name === color.name && styles.selectedColorOption,
        color.hex === '#FFFFFF' && styles.whiteColorBorder,
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const SizeOption = ({ size }: { size: string }) => (
    <TouchableOpacity
      style={[
        styles.sizeOption,
        selectedSize === size && styles.selectedSizeOption,
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text
        style={[
          styles.sizeText,
          selectedSize === size && styles.selectedSizeText,
        ]}
      >
        {size}
      </Text>
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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                size={24}
                color={isFavorite ? '#FFD700' : '#FFFFFF'}
                fill={isFavorite ? '#FFD700' : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Share size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Images */}
          <View style={styles.imageSection}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width
                );
                setSelectedImageIndex(index);
              }}
            >
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.productImage}
                />
              ))}
            </ScrollView>

            {/* Image Indicators */}
            <View style={styles.imageIndicators}>
              {product.images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    selectedImageIndex === index && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color="#FFD700"
                    fill={
                      star <= Math.floor(product.rating)
                        ? '#FFD700'
                        : 'transparent'
                    }
                  />
                ))}
              </View>
              <Text style={styles.ratingText}>{product.rating}</Text>
              <Text style={styles.reviewCount}>
                ({product.reviewCount} reviews)
              </Text>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${product.price}</Text>
              {product.originalPrice > product.price && (
                <Text style={styles.originalPrice}>
                  ${product.originalPrice}
                </Text>
              )}
              {product.originalPrice > product.price && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </Text>
                </View>
              )}
            </View>

            {/* Description */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Features */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>Features</Text>
              {product.features.map((feature, index) => (
                <Text key={index} style={styles.feature}>
                  • {feature}
                </Text>
              ))}
            </View>

            {/* Color Selection */}
            <View style={styles.selectionSection}>
              <Text style={styles.sectionTitle}>
                Color: {selectedColor.name}
              </Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color) => (
                  <ColorOption key={color.name} color={color} />
                ))}
              </View>
            </View>

            {/* Size Selection */}
            <View style={styles.selectionSection}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <SizeOption key={size} size={size} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              !selectedSize && styles.disabledButton,
            ]}
            disabled={!selectedSize}
          >
            <LinearGradient
              colors={
                selectedSize ? ['#FFD700', '#FFA500'] : ['#333333', '#333333']
              }
              style={styles.addToCartGradient}
            >
              <ShoppingBag
                size={20}
                color={selectedSize ? '#000000' : '#666666'}
              />
              <Text
                style={[
                  styles.addToCartText,
                  !selectedSize && styles.disabledText,
                ]}
              >
                Add to Cart
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerButton: {
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  imageSection: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 400,
    resizeMode: 'cover',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#FFD700',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#888888',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Regular',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  feature: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
    marginBottom: 6,
  },
  selectionSection: {
    marginBottom: 25,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: '#FFD700',
  },
  whiteColorBorder: {
    borderWidth: 1,
    borderColor: '#333333',
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sizeOption: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333333',
    minWidth: 50,
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  sizeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
  },
  selectedSizeText: {
    color: '#000000',
  },
  bottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    gap: 15,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 25,
    padding: 4,
  },
  quantityButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  quantity: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginHorizontal: 20,
    minWidth: 20,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  addToCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
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
