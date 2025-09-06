import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, useWindowDimensions, Platform } from 'react-native';

export const getBreakpoint = () => {
  const { width } = Dimensions.get('window');
  if (width >= 1200) return 'xl';
  if (width >= 992) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 576) return 'sm';
  return 'xs';
};

export default function Home() {
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 768;
  
  return (
    <View style={styles.container}>
      <View style={[styles.navbar, { height: isDesktop ? 80 : 50 }]}>
        <Image 
          source={require('../assets/home/Navbar/navbar-logo.png')} 
          style={[styles.logo, { height: isDesktop ? 40 : 30 }]}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: "#2C3540",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    })
  },
  logo: {
    width: 120, // Set a fixed width or make it responsive
  },
  baseButtonStyle: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Note: For web hover effects, you'll need to handle them in the component
  // or use a library like react-native-web-hover
})

// If you need button styles with hover, create them in the component:
export const getButtonStyle = (isHovered: boolean = false) => ({
  ...styles.baseButtonStyle,
  ...(Platform.OS === 'web' && {
    cursor: 'pointer',
    opacity: isHovered ? 0.8 : 1,
  }),
});