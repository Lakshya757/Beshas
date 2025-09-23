import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONT_FAMILIES } from '../components/Fonts';

const ReviewsCarousel = ({ reviews, isMobile, isTablet, width }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use passed props or calculate if not provided
  const _isMobile = isMobile !== undefined ? isMobile : width < 768;
  const _isTablet = isTablet !== undefined ? isTablet : width >= 768 && width < 1024;
  const _isDesktop = !_isMobile && !_isTablet;

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
    <View style={[
      styles.reviewsContainer, 
      { 
        paddingHorizontal: _isMobile ? 20 : _isTablet ? 40 : 60,
        paddingVertical: _isMobile ? 60 : _isTablet ? 75 : 90,
      }
    ]}>
      <View style={[
        styles.reviewContent,
        {
          minHeight: _isMobile ? 180 : _isTablet ? 200 : 220,
          marginBottom: _isMobile ? 25 : 30,
        }
      ]}>
        {/* Left Arrow */}
        <TouchableOpacity
          style={[
            styles.arrowButton, 
            styles.leftArrow,
            {
              width: _isMobile ? 35 : _isTablet ? 38 : 40,
              height: _isMobile ? 35 : _isTablet ? 38 : 40,
              borderRadius: _isMobile ? 17.5 : _isTablet ? 19 : 20,
              marginHorizontal: _isMobile ? 10 : _isTablet ? 15 : 20,
            }
          ]}
          onPress={prevReview}
        >
          <Ionicons 
            name="chevron-back" 
            size={_isMobile ? 20 : _isTablet ? 22 : 24} 
            color="#8B6F47" 
          />
        </TouchableOpacity>

        {/* Animated Review Content */}
        <Animated.View
          style={[
            styles.reviewCard,
            {
              maxWidth: _isMobile ? width - 100 : _isTablet ? 650 : 750,
              minWidth: _isMobile ? width - 100 : _isTablet ? 500 : 600,
              opacity: fadeAnim,
              transform: [
                { translateX: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <Text style={[
            styles.reviewText, 
            { 
              fontSize: _isMobile ? 16 : _isTablet ? 18 : 21,
              maxWidth: _isMobile ? width - 100 : _isTablet ? 580 : 660,
              lineHeight: _isMobile ? 22 : _isTablet ? 24 : 26,
              marginBottom: _isMobile ? 25 : _isTablet ? 28 : 30,
            }
          ]}>
            {currentReview.reviewText}
          </Text>

          {/* Author Info */}
          <View style={styles.authorContainer}>
            <Image
              source={{ uri: currentReview.autherPfp }}
              style={[
                styles.authorImage,
                {
                  width: _isMobile ? 50 : _isTablet ? 55 : 60,
                  height: _isMobile ? 50 : _isTablet ? 55 : 60,
                  borderRadius: _isMobile ? 25 : _isTablet ? 27.5 : 30,
                  marginBottom: _isMobile ? 12 : _isTablet ? 13 : 15,
                }
              ]}
            />
            <View style={styles.authorInfo}>
              <Text style={[
                styles.authorName, 
                { 
                  fontSize: _isMobile ? 15 : _isTablet ? 16 : 17,
                  marginBottom: _isMobile ? 3 : 5,
                }
              ]}>
                {currentReview.author}
              </Text>
              <Text style={[
                styles.authorRole, 
                { 
                  fontSize: _isMobile ? 13 : _isTablet ? 14 : 15 
                }
              ]}>
                {currentReview.authorRole}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Right Arrow */}
        <TouchableOpacity
          style={[
            styles.arrowButton, 
            styles.rightArrow,
            {
              width: _isMobile ? 35 : _isTablet ? 38 : 40,
              height: _isMobile ? 35 : _isTablet ? 38 : 40,
              borderRadius: _isMobile ? 17.5 : _isTablet ? 19 : 20,
              marginHorizontal: _isMobile ? 10 : _isTablet ? 15 : 20,
            }
          ]}
          onPress={nextReview}
        >
          <Ionicons 
            name="chevron-forward" 
            size={_isMobile ? 20 : _isTablet ? 22 : 24} 
            color="#8B6F47" 
          />
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
                {
                  width: _isMobile ? 10 : _isTablet ? 11 : 12,
                  height: _isMobile ? 10 : _isTablet ? 11 : 12,
                  borderRadius: _isMobile ? 5 : _isTablet ? 5.5 : 6,
                  marginHorizontal: _isMobile ? 4 : _isTablet ? 5 : 6,
                },
                isActive ? styles.activeDot : styles.inactiveDot
              ]}
              onPress={() => goToReview(index)}
            >
              <Animated.View
                style={[
                  styles.dotInner,
                  {
                    width: _isMobile ? 6 : _isTablet ? 7 : 8,
                    height: _isMobile ? 6 : _isTablet ? 7 : 8,
                    borderRadius: _isMobile ? 3 : _isTablet ? 3.5 : 4,
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
    alignItems: 'center',
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  arrowButton: {
    backgroundColor: 'rgba(139, 111, 71, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8B6F47',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftArrow: {},
  rightArrow: {},
  reviewCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  reviewText: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#2C3540',
    textAlign: 'center',
  },
  authorContainer: {
    alignItems: 'center',
  },
  authorImage: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {},
  activeDot: {},
  inactiveDot: {},
});

export default ReviewsCarousel;