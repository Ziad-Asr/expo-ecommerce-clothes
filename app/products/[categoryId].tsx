import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Search, Filter, Heart, Star } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const productWidth = (width - 60) / 2;

// Mock products data based on category
const getProductsByCategory = (categoryId: string) => {
  const allProducts = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      price: 89,
      originalPrice: 120,
      image:
        'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      rating: 4.8,
      categoryId: '1',
      colors: ['Black', 'White', 'Gray'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 2,
      name: 'Classic Cotton Tee',
      price: 65,
      originalPrice: 85,
      image:
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      rating: 4.6,
      categoryId: '1',
      colors: ['Navy', 'White', 'Red'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 3,
      name: 'Designer Hoodie',
      price: 159,
      originalPrice: 200,
      image:
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      rating: 4.9,
      categoryId: '2',
      colors: ['Gray', 'Black', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 4,
      name: 'Cozy Pullover Hoodie',
      price: 129,
      originalPrice: 160,
      image:
        'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
      rating: 4.7,
      categoryId: '2',
      colors: ['Beige', 'Pink', 'White'],
      sizes: ['XS', 'S', 'M', 'L'],
    },
    {
      id: 5,
      name: 'Luxury Denim Jacket',
      price: 249,
      originalPrice: 320,
      image:
        'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
      rating: 4.8,
      categoryId: '3',
      colors: ['Blue', 'Black', 'Light Blue'],
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 6,
      name: 'Casual Summer Dress',
      price: 129,
      originalPrice: 180,
      image:
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      rating: 4.6,
      categoryId: '4',
      colors: ['Floral', 'Solid Blue', 'White'],
      sizes: ['XS', 'S', 'M', 'L'],
    },
  ];

  return allProducts.filter((product) => product.categoryId === categoryId);
};

export default function ProductsScreen() {
  const { categoryId, name } = useLocalSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([2, 4]);
  const [sortBy, setSortBy] = useState('popular');

  const products = getProductsByCategory(categoryId as string);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
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
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(product.id)}
        >
          <Heart
            size={16}
            color={favorites.includes(product.id) ? '#FFD700' : '#FFFFFF'}
            fill={favorites.includes(product.id) ? '#FFD700' : 'transparent'}
          />
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
      </View>
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
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.productCount}>
              {filteredProducts.length} items
            </Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color="#888888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              'Popular',
              'Price: Low to High',
              'Price: High to Low',
              'Newest',
            ].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.sortChip, index === 0 && styles.activeSortChip]}
              >
                <Text
                  style={[
                    styles.sortText,
                    index === 0 && styles.activeSortText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Products Grid */}
        <ScrollView
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  productCount: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  filterButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  sortContainer: {
    paddingLeft: 20,
    marginBottom: 20,
  },
  sortChip: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeSortChip: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  sortText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  activeSortText: {
    color: '#000000',
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
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
});
