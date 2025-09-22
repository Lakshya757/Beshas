// hooks/useScrollNavbar.ts
import { useState, useEffect, useRef } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface ScrollNavbarHook {
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  navbarTranslateY: Animated.Value;
  isNavbarVisible: boolean;
}

export const useScrollNavbar = (navbarHeight: number = 60): ScrollNavbarHook => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const navbarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('up');

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { 
      useNativeDriver: true,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollDiff = currentScrollY - lastScrollY.current;
        
        // Determine scroll direction
        if (scrollDiff > 0 && scrollDirection.current !== 'down') {
          scrollDirection.current = 'down';
        } else if (scrollDiff < 0 && scrollDirection.current !== 'up') {
          scrollDirection.current = 'up';
        }

        // Only trigger animation if scroll difference is significant (prevents jitter)
        if (Math.abs(scrollDiff) > 5) {
          if (scrollDirection.current === 'down' && isNavbarVisible && currentScrollY > navbarHeight) {
            // Hide navbar when scrolling down
            setIsNavbarVisible(false);
            Animated.timing(navbarTranslateY, {
              toValue: -navbarHeight,
              duration: 300,
              useNativeDriver: true,
            }).start();
          } else if (scrollDirection.current === 'up' && !isNavbarVisible) {
            // Show navbar when scrolling up
            setIsNavbarVisible(true);
            Animated.timing(navbarTranslateY, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
          }
        }

        lastScrollY.current = currentScrollY;
      }
    }
  );

  // Reset navbar when component mounts or scrolls to top
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value <= 50 && !isNavbarVisible) {
        setIsNavbarVisible(true);
        Animated.timing(navbarTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY, navbarTranslateY, isNavbarVisible]);

  return {
    handleScroll,
    navbarTranslateY,
    isNavbarVisible,
  };
};