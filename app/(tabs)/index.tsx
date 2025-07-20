import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Heart, Star } from 'lucide-react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

// Responsive product card width calculation
const getProductWidth = () => {
  const padding = 40; // 20px on each side
  const gap = 12; // gap between cards

  if (screenWidth < 400) {
    // Small phones: single column
    return screenWidth - padding;
  } else if (screenWidth < 600) {
    // Regular phones: 2 columns
    return (screenWidth - padding - gap) / 2;
  } else {
    // Tablets and larger: 3 columns
    return (screenWidth - padding - gap * 2) / 3;
  }
};

const productWidth = getProductWidth();

const allProducts = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 89,
    originalPrice: 120,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    rating: 4.8,
    isFavorite: false,
    category: 'T-Shirts',
    tags: ['cotton', 'premium', 'casual', 'comfortable'],
  },
  {
    id: 2,
    name: 'Designer Hoodie',
    price: 159,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    rating: 4.9,
    isFavorite: true,
    category: 'Hoodies',
    tags: ['designer', 'warm', 'casual', 'trendy'],
  },
  {
    id: 3,
    name: 'Luxury Denim Jacket',
    price: 249,
    originalPrice: 320,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    rating: 4.7,
    isFavorite: false,
    category: 'Jackets',
    tags: ['denim', 'luxury', 'vintage', 'durable'],
  },
  {
    id: 4,
    name: 'Casual Summer Dress',
    price: 129,
    originalPrice: 180,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    rating: 4.6,
    isFavorite: true,
    category: 'Dresses',
    tags: ['summer', 'casual', 'light', 'comfortable'],
  },
  {
    id: 5,
    name: 'Classic White Shirt',
    price: 79,
    originalPrice: 99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    rating: 4.5,
    isFavorite: false,
    category: 'T-Shirts',
    tags: ['classic', 'white', 'formal', 'versatile'],
  },
  {
    id: 6,
    name: 'Warm Winter Hoodie',
    price: 189,
    originalPrice: 230,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    rating: 4.8,
    isFavorite: false,
    category: 'Hoodies',
    tags: ['winter', 'warm', 'thick', 'cozy'],
  },
  {
    id: 7,
    name: 'Elegant Evening Dress',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    rating: 4.9,
    isFavorite: true,
    category: 'Dresses',
    tags: ['elegant', 'evening', 'formal', 'luxury'],
  },
  {
    id: 8,
    name: 'Leather Biker Jacket',
    price: 399,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    rating: 4.7,
    isFavorite: false,
    category: 'Jackets',
    tags: ['leather', 'biker', 'edgy', 'durable'],
  },
];

const categories = [
  'All',
  'T-Shirts',
  'Hoodies',
  'Jackets',
  'Dresses',
  'Jeans',
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([2, 4]);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Filter products based on search query and selected category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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
            size={18}
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
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#888888" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search clothes..."
                placeholderTextColor="#888888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={styles.clearButton}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.activeCategoryChip,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category &&
                        styles.activeCategoryText,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Search Results Info */}
          {(searchQuery.length > 0 || selectedCategory !== 'All') && (
            <View style={styles.resultsInfo}>
              <Text style={styles.resultsText}>
                {filteredProducts.length} result
                {filteredProducts.length !== 1 ? 's' : ''} found
                {searchQuery.length > 0 && ` for "${searchQuery}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </Text>
              {(searchQuery.length > 0 || selectedCategory !== 'All') && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  style={styles.clearFiltersButton}
                >
                  <Text style={styles.clearFiltersText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Products */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {searchQuery.length > 0 || selectedCategory !== 'All'
                  ? 'Search Results'
                  : 'Featured Items'}
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {filteredProducts.length > 0 ? (
              <View style={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </View>
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsTitle}>No products found</Text>
                <Text style={styles.noResultsText}>
                  Try adjusting your search or browse different categories
                </Text>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                >
                  <Text style={styles.resetButtonText}>Reset Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Special Offer Banner - Only show when not searching */}
          {searchQuery.length === 0 && selectedCategory === 'All' && (
            <View style={styles.section}>
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.offerBanner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>Special Offer</Text>
                  <Text style={styles.offerDescription}>
                    Get 30% off on all summer collection
                  </Text>
                  <TouchableOpacity style={styles.offerButton}>
                    <Text style={styles.offerButtonText}>Shop Now</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}
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
  greeting: {
    fontSize: 16,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 4,
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
  clearButton: {
    fontSize: 18,
    color: '#888888',
    paddingHorizontal: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FFD700',
    fontFamily: 'Inter-SemiBold',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  activeCategoryChip: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  activeCategoryText: {
    color: '#000000',
  },
  resultsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  resultsText: {
    fontSize: 14,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  clearFiltersButton: {
    backgroundColor: '#333333',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearFiltersText: {
    fontSize: 12,
    color: '#FFD700',
    fontFamily: 'Inter-SemiBold',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: screenWidth < 400 ? 'center' : 'space-between',
    gap: 12,
  },
  noResults: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  resetButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  resetButtonText: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  productCard: {
    width: screenWidth < 400 ? '100%' : productWidth,
    maxWidth: screenWidth > 400 ? 200 : 380,
    minWidth: 150,
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
    height: screenWidth < 400 ? 180 : 200,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  productInfo: {
    padding: screenWidth < 400 ? 12 : 15,
  },
  productName: {
    fontSize: screenWidth < 400 ? 14 : 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: screenWidth < 400 ? 6 : 8,
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    color: '#888888',
    fontSize: 12,
    marginLeft: 4,
    fontFamily: 'Inter-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: screenWidth < 400 ? 16 : 18,
    color: '#FFD700',
    fontFamily: 'Inter-Bold',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: screenWidth < 400 ? 12 : 14,
    color: '#888888',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Regular',
  },
  offerBanner: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
  },
  offerContent: {
    alignItems: 'center',
  },
  offerTitle: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  offerButton: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  offerButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});
