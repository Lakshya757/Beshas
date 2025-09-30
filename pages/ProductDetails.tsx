// screens/ProductDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import ShopifyService, { ShopifyProduct } from '../services/shopify-service';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }: any) => {
  const { handle } = route.params;
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [handle]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProduct = await ShopifyService.getProductByHandle(handle);
      setProduct(fetchedProduct);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Product not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProduct}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const images = product.images?.edges || [];
  const mainImage = images[selectedImageIndex]?.node?.url;
  const price = product.priceRange?.minVariantPrice?.amount;
  const currency = product.priceRange?.minVariantPrice?.currencyCode;

  return (
    <ScrollView style={styles.container}>
      {/* Main Image */}
      {mainImage && (
        <Image
          source={{ uri: mainImage }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      )}

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailContainer}
        >
          {images.map((edge, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImageIndex(index)}
              style={[
                styles.thumbnail,
                selectedImageIndex === index && styles.thumbnailSelected,
              ]}
            >
              <Image
                source={{ uri: edge.node.url }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>
          {currency} {parseFloat(price).toFixed(2)}
        </Text>

        {product.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        )}

        {/* Variants */}
        {product.variants?.edges && product.variants.edges.length > 0 && (
          <View style={styles.variantsContainer}>
            <Text style={styles.variantsTitle}>Available Options</Text>
            {product.variants.edges.map((edge, index) => (
              <View key={edge.node.id} style={styles.variant}>
                <Text style={styles.variantTitle}>{edge.node.title}</Text>
                <Text style={styles.variantPrice}>
                  {edge.node.priceV2.currencyCode} {parseFloat(edge.node.priceV2.amount).toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.variantAvailability,
                    !edge.node.availableForSale && styles.unavailable,
                  ]}
                >
                  {edge.node.availableForSale ? 'In Stock' : 'Out of Stock'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mainImage: {
    width: width,
    height: width,
    backgroundColor: '#f0f0f0',
  },
  thumbnailContainer: {
    padding: 12,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailSelected: {
    borderColor: '#000',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  descriptionContainer: {
    marginTop: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  variantsContainer: {
    marginTop: 24,
  },
  variantsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  variant: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  variantTitle: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  variantPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
  },
  variantAvailability: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '600',
  },
  unavailable: {
    color: '#f44336',
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;