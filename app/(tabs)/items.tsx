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
import {
  Search,
  Filter,
  Heart,
  Star,
  Grid2x2 as Grid,
  List,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const productWidth = (width - 60) / 2;

// All products data
const allProducts = [
  {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 89,
    originalPrice: 120,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    rating: 4.8,
    category: 'T-Shirts',
    tags: ['cotton', 'premium', 'casual', 'comfortable'],
    colors: ['Black', 'White', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Designer Hoodie',
    price: 159,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    rating: 4.9,
    category: 'Hoodies',
    tags: ['designer', 'warm', 'casual', 'trendy'],
    colors: ['Gray', 'Black', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    name: 'Luxury Denim Jacket',
    price: 249,
    originalPrice: 320,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    rating: 4.7,
    category: 'Jackets',
    tags: ['denim', 'luxury', 'vintage', 'durable'],
    colors: ['Blue', 'Black', 'Light Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Casual Summer Dress',
    price: 129,
    originalPrice: 180,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    rating: 4.6,
    category: 'Dresses',
    tags: ['summer', 'casual', 'light', 'comfortable'],
    colors: ['Floral', 'Solid Blue', 'White'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 5,
    name: 'Classic White Shirt',
    price: 79,
    originalPrice: 99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    rating: 4.5,
    category: 'T-Shirts',
    tags: ['classic', 'white', 'formal', 'versatile'],
    colors: ['White', 'Light Blue', 'Pink'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 6,
    name: 'Warm Winter Hoodie',
    price: 189,
    originalPrice: 230,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    rating: 4.8,
    category: 'Hoodies',
    tags: ['winter', 'warm', 'thick', 'cozy'],
    colors: ['Beige', 'Brown', 'Gray'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 7,
    name: 'Elegant Evening Dress',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
    rating: 4.9,
    category: 'Dresses',
    tags: ['elegant', 'evening', 'formal', 'luxury'],
    colors: ['Black', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 8,
    name: 'Leather Biker Jacket',
    price: 399,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    rating: 4.7,
    category: 'Jackets',
    tags: ['leather', 'biker', 'edgy', 'durable'],
    colors: ['Black', 'Brown', 'Dark Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 9,
    name: 'Slim Fit Jeans',
    price: 119,
    originalPrice: 149,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    rating: 4.4,
    category: 'Jeans',
    tags: ['slim', 'denim', 'casual', 'versatile'],
    colors: ['Blue', 'Black', 'Light Blue'],
    sizes: ['28', '30', '32', '34', '36'],
  },
  {
    id: 10,
    name: 'Comfortable Sneakers',
    price: 149,
    originalPrice: 199,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    rating: 4.6,
    category: 'Shoes',
    tags: ['comfortable', 'casual', 'athletic', 'daily'],
    colors: ['White', 'Black', 'Gray'],
    sizes: ['7', '8', '9', '10', '11'],
  },
];

const categories = [
  'All',
  'T-Shirts',
  'Hoodies',
  'Jackets',
  'Dresses',
  'Jeans',
  'Shoes',
];
const sortOptions = [
  'Popular',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
  'Rating',
];

export default function ItemsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([2, 4, 7]);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  // Filter products based on search query and selected category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Rating':
        return b.rating - a.rating;
      case 'Newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSort('Popular');
  };

  const ProductCard = ({ product }: { product: any }) => (
    <TouchableOpacity
      style={
        viewMode === 'grid' ? styles.gridProductCard : styles.listProductCard
      }
      activeOpacity={0.8}
      onPress={() => router.push(`/product/${product.id}`)}
    >
      <View
        style={
          viewMode === 'grid'
            ? styles.gridImageContainer
            : styles.listImageContainer
        }
      >
        <Image
          source={{ uri: product.image }}
          style={
            viewMode === 'grid'
              ? styles.gridProductImage
              : styles.listProductImage
          }
        />
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
      <View
        style={
          viewMode === 'grid' ? styles.gridProductInfo : styles.listProductInfo
        }
      >
        <Text
          style={styles.productName}
          numberOfLines={viewMode === 'grid' ? 2 : 1}
        >
          {product.name}
        </Text>
        <Text style={styles.categoryText}>{product.category}</Text>
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
          <Text style={styles.title}>All Items</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? (
                <List size={20} color="#FFFFFF" />
              ) : (
                <Grid size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#888888" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search items..."
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

        {/* Filters */}
        {showFilters && (
          <View style={styles.filtersContainer}>
            {/* Categories */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Categories</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterOptions}
              >
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterChip,
                      selectedCategory === category && styles.activeFilterChip,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        selectedCategory === category &&
                          styles.activeFilterText,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Sort Options */}
            <View style={styles.filterSection}>
              <Text style={styles.filterTitle}>Sort By</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterOptions}
              >
                {sortOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterChip,
                      selectedSort === option && styles.activeFilterChip,
                    ]}
                    onPress={() => setSelectedSort(option)}
                  >
                    <Text
                      style={[
                        styles.filterText,
                        selectedSort === option && styles.activeFilterText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Results Info */}
        <View style={styles.resultsInfo}>
          <Text style={styles.resultsText}>
            {sortedProducts.length} item{sortedProducts.length !== 1 ? 's' : ''}{' '}
            found
            {searchQuery.length > 0 && ` for "${searchQuery}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </Text>
          {(searchQuery.length > 0 ||
            selectedCategory !== 'All' ||
            selectedSort !== 'Popular') && (
            <TouchableOpacity
              onPress={clearAllFilters}
              style={styles.clearFiltersButton}
            >
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Products */}
        <ScrollView
          style={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        >
          {sortedProducts.length > 0 ? (
            <View
              style={
                viewMode === 'grid'
                  ? styles.gridContainer
                  : styles.listContainer
              }
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </View>
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsTitle}>No items found</Text>
              <Text style={styles.noResultsText}>
                Try adjusting your search or browse different categories
              </Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={clearAllFilters}
              >
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
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
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
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
  filtersContainer: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  filterSection: {
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  filterOptions: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: '#333333',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#444444',
  },
  activeFilterChip: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  activeFilterText: {
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
  productsContainer: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gridProductCard: {
    width: productWidth,
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
  },
  listProductCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333333',
    padding: 15,
  },
  gridImageContainer: {
    position: 'relative',
  },
  listImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  gridProductImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  listProductImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
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
  gridProductInfo: {
    padding: 12,
  },
  listProductInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
    lineHeight: 18,
  },
  categoryText: {
    fontSize: 12,
    color: '#888888',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
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
  noResults: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
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
});
