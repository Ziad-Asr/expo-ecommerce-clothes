import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Grid2x2 as Grid, List } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const categories = [
  {
    id: 1,
    name: 'T-Shirts',
    count: 45,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
  },
  {
    id: 2,
    name: 'Hoodies',
    count: 28,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
  },
  {
    id: 3,
    name: 'Jackets',
    count: 32,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
  },
  {
    id: 4,
    name: 'Dresses',
    count: 38,
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg',
  },
  {
    id: 5,
    name: 'Jeans',
    count: 41,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
  },
  {
    id: 6,
    name: 'Shoes',
    count: 52,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
  },
];

export default function CategoriesScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  // Ensure smooth navigation back to this screen
  useFocusEffect(
    useCallback(() => {
      // Screen is focused, ensure proper rendering
      return () => {
        // Screen is unfocused
      };
    }, [])
  );

  const CategoryCard = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={
        viewMode === 'grid' ? styles.gridCategoryCard : styles.listCategoryCard
      }
      activeOpacity={0.8}
      onPress={() =>
        router.push(`/products/${category.id}?name=${category.name}`)
      }
    >
      <Image
        source={{ uri: category.image }}
        style={
          viewMode === 'grid'
            ? styles.gridCategoryImage
            : styles.listCategoryImage
        }
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={
          viewMode === 'grid'
            ? styles.gridCategoryOverlay
            : styles.listCategoryOverlay
        }
      >
        <View
          style={
            viewMode === 'grid'
              ? styles.gridCategoryInfo
              : styles.listCategoryInfo
          }
        >
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryCount}>{category.count} items</Text>
        </View>
      </LinearGradient>
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
          <Text style={styles.title}>Categories</Text>
          <View style={styles.headerActions}>
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

        {/* Categories */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {viewMode === 'grid' ? (
            <View style={styles.gridContainer}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </View>
          ) : (
            <View style={styles.listContainer}>
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
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
  content: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  gridCategoryCard: {
    width: '48%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  listCategoryCard: {
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  gridCategoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  listCategoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gridCategoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
  },
  listCategoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
  },
  gridCategoryInfo: {
    padding: 15,
  },
  listCategoryInfo: {
    padding: 20,
  },
  categoryName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Inter-Regular',
  },
});
