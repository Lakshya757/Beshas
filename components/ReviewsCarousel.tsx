import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONT_FAMILIES } from '../components/Fonts';

const ReviewsCarousel = ({ reviews }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (toIndex: any) => {
    // Start exit animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: toIndex > currentIndex ? -50 : 50,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Change content
      setCurrentIndex(toIndex);

      // Reset position for entrance
      slideAnim.setValue(toIndex > currentIndex ? 50 : -50);

      // Start entrance animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const nextReview = () => {
    const nextIndex = currentIndex === reviews.length - 1 ? 0 : currentIndex + 1;
    animateTransition(nextIndex);
  };

  const prevReview = () => {
    const prevIndex = currentIndex === 0 ? reviews.length - 1 : currentIndex - 1;
    animateTransition(prevIndex);
  };

  const goToReview = (index: any) => {
    if (index !== currentIndex) {
      animateTransition(index);
    }
  };

  const currentReview = reviews[currentIndex];

  return (
    <View style={[styles.reviewsContainer, { paddingHorizontal: isMobile ? 20 : 60 }]}>
      <View style={styles.reviewContent}>
        {/* Left Arrow */}
        <TouchableOpacity
          style={[styles.arrowButton, styles.leftArrow]}
          onPress={prevReview}
        >
          <Ionicons name="chevron-back" size={24} color="#8B6F47" />
        </TouchableOpacity>

        {/* Animated Review Content */}
        <Animated.View
          style={[
            styles.reviewCard,
            {
              maxWidth: isMobile ? width - 120 : 750,
              opacity: fadeAnim,
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
              
          <Text style={[styles.reviewText, { fontSize: isMobile ? 18 : 21, maxWidth: isMobile ? width - 120 : 660, }]}>
            {currentReview.reviewText}
          </Text>

          {/* Author Info */}
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: currentReview.autherPfp }}
              style={styles.authorImage}
            />
            <View style={styles.authorInfo}>
              <Text style={[styles.authorName, { fontSize: isMobile ? 16 : 17 }]}>
                {currentReview.author}
              </Text>
              <Text style={[styles.authorRole, { fontSize: isMobile ? 14 : 15 }]}>
                {currentReview.authorRole}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Right Arrow */}
        <TouchableOpacity
          style={[styles.arrowButton, styles.rightArrow]}
          onPress={nextReview}
        >
          <Ionicons name="chevron-forward" size={24} color="#8B6F47" />
        </TouchableOpacity>
      </View>

      {/* Animated Pagination Dots */}
      <View style={styles.paginationContainer}>
        {/* @ts-ignore */}
        {reviews.map((_, index) => {
          const isActive = index === currentIndex;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.paginationDot,
                isActive ? styles.activeDot : styles.inactiveDot
              ]}
              onPress={() => goToReview(index)}
            >
              <Animated.View
                style={[
                  styles.dotInner,
                  {
                    backgroundColor: isActive ? '#8B6F47' : 'rgba(139, 111, 71, 0.3)',
                    transform: [
                      {
                        scale: isActive ? 1.2 : 1
                      }
                    ]
                  }
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewsContainer: {
    backgroundColor: '#FCF4E3',
    paddingVertical: 90,
    alignItems: 'center',
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
    minHeight: 200, // Ensure consistent height during animations
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 111, 71, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    // Add subtle hover effect
    shadowColor: '#8B6F47',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftArrow: {
    // Additional styling if needed
  },
  rightArrow: {
    // Additional styling if needed
  },
  reviewCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  reviewText: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#2C3540',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
    
  },
  authorContainer: {
    alignItems: 'center',
  },
  authorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 15,
    // Add subtle border
    borderWidth: 2,
    borderColor: 'rgba(139, 111, 71, 0.2)',
  },
  authorInfo: {
    alignItems: 'center',
  },
  authorName: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#2C3540',
    fontWeight: '600',
    marginBottom: 5,
  },
  authorRole: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#8B6F47',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    // Styling handled by animated view
  },
  inactiveDot: {
    // Styling handled by animated view
  },
});

export default ReviewsCarousel;