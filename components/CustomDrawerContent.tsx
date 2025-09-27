// components/CustomDrawerContent.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useFonts, FONT_FAMILIES } from './Fonts';

const CustomDrawerContent = (props: any) => {
  const { fontsLoaded } = useFonts();

  if (!fontsLoaded) return null;

  // Import all icons at the top and create icon maps
  const iconMap = {
    'home': require('../assets/icons/home.svg'),
    'information-circle-outline': require('../assets/icons/information-circle-outline.svg'),
    'grid-outline': require('../assets/icons/grid-outline.svg'),
    'help-circle-outline': require('../assets/icons/help-circle-outline.svg'),
  };

  // Social media icons map
  const socialIconMap = {
    'logo-instagram': require('../assets/icons/logo-instagram.svg'),
    'logo-facebook': require('../assets/icons/logo-facebook.svg'),
    'logo-twitter': require('../assets/icons/logo-twitter.svg'),
  };

  const menuItems = [
    {
      label: 'Home',
      icon: 'home',
      route: 'Home'
    },
    {
      label: 'About Us',
      icon: 'information-circle-outline',
      route: 'About'
    },
    {
      label: 'Collections',
      icon: 'grid-outline',
      route: 'Collections'
    },
    {
      label: 'Support',
      icon: 'help-circle-outline',
      route: 'Support'
    },
  ];

  const shopMenuItems = [
    { label: 'Men', subLabel: 'Clothing & Accessories' },
    { label: 'Women', subLabel: 'Clothing & Accessories' },
    { label: 'New Arrivals', subLabel: 'Latest Collection' },
    { label: 'Sale', subLabel: 'Up to 50% Off' },
  ];

  const getCurrentRoute = () => {
    const state = props.state;
    if (!state || !state.routes || !state.routes[state.index]) {
      return '';
    }
    return state.routes[state.index].name;
  };

  const currentRoute = getCurrentRoute();

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={require('../assets/home/Navbar/navbar-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => props.navigation.closeDrawer()}
            >
              <Image
                source={require('../assets/icons/close.svg')}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: '#FCF4E3'
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image
              source={require('../assets/icons/search.svg')}
              style={{
                height: 18,
                tintColor: 'rgba(252, 244, 227, 0.7)'
              }}
              resizeMode='contain'
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="rgba(252, 244, 227, 0.7)"
            />
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>NAVIGATION</Text>
          {menuItems.map((item, index) => {
            const isActive = currentRoute === item.route;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  isActive && styles.activeMenuItem
                ]}
                onPress={() => props.navigation.navigate(item.route)}
              >
                <Image
                  // @ts-ignore
                  source={iconMap[item.icon]}
                  style={{
                    height: 22,
                    width: 22,
                    tintColor: isActive ? "#FCF4E3" : "rgba(252, 244, 227, 0.7)"
                  }}
                  resizeMode='contain'
                />
                <Text
                  style={[
                    styles.menuItemText,
                    isActive && styles.activeMenuItemText
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Shop Section */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SHOP NOW</Text>
            <Image
              style={{
                tintColor: 'rgba(252, 244, 227, 0.7)',
                height: 16,
                width: 16,
                transform: [{ translateY: -8 }]
              }}
              resizeMode='contain'
              source={require('../assets/icons/chevron-forward.svg')}
            />
          </TouchableOpacity>

          {shopMenuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.subMenuItem}>
              <View>
                <Text style={styles.subMenuItemText}>{item.label}</Text>
                <Text style={styles.subMenuItemSubtext}>{item.subLabel}</Text>
              </View>
              <Image
                style={{
                  tintColor: 'rgba(252, 244, 227, 0.7)',
                  height: 12,
                  width: 12,
                  transform: [{ translateY: -8 }]
                }}
                resizeMode='contain'
                source={require('../assets/icons/chevron-forward.svg')}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Section */}
        <View style={styles.accountSection}>
          <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountButtonText}>Join</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.accountButton, styles.shopButton]}>
            <Text style={[styles.accountButtonText, styles.shopButtonText]}>Shop</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Info */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={require('../assets/icons/mail.svg')}
              style={{
                height: 18,
                width: 18,
                tintColor: 'rgba(252,244,227,0.7)'
              }}
              resizeMode='contain'
            />
            <Text style={styles.footerText}>hello@beshas.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Image
              source={require('../assets/icons/call-outline.svg')}
              style={{
                height: 18,
                width: 18,
                tintColor: 'rgba(252,244,227,0.7)'
              }}
              resizeMode='contain'
            />
            <Text style={styles.footerText}>+1 (555) 123-4567</Text>
          </TouchableOpacity>

          {/* Social Media Icons */}
          <View style={styles.socialContainer}>
            {['logo-instagram', 'logo-facebook', 'logo-twitter'].map((icon, index) => (
              <TouchableOpacity key={index} style={styles.socialButton}>
                <Image
                  // @ts-ignore
                  source={socialIconMap[icon]}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: "rgba(252, 244, 227, 0.7)"
                  }}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3540',
  },
  drawerContent: {
    paddingTop: 0,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(252, 244, 227, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    height: 40,
    width: 60,
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 244, 227, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#FCF4E3',
    outlineWidth: 0,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(252, 244, 227, 0.5)',
    marginBottom: 15,
    letterSpacing: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 5,
  },
  activeMenuItem: {
    backgroundColor: 'rgba(252, 244, 227, 0.1)',
  },
  menuItemText: {
    fontSize: 16,
    color: 'rgba(252, 244, 227, 0.7)',
    marginLeft: 15,
    fontWeight: '500',
  },
  activeMenuItemText: {
    color: '#FCF4E3',
    fontWeight: '600',
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 5,
  },
  subMenuItemText: {
    fontSize: 15,
    color: 'rgba(252, 244, 227, 0.8)',
    fontWeight: '500',
  },
  subMenuItemSubtext: {
    fontSize: 12,
    color: 'rgba(252, 244, 227, 0.5)',
    marginTop: 2,
  },
  accountSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 30,
    gap: 10,
  },
  accountButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(252, 244, 227, 0.3)',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  shopButton: {
    backgroundColor: '#FCF4E3',
  },
  accountButtonText: {
    fontSize: 16,
    color: 'rgba(252, 244, 227, 0.8)',
    fontWeight: '500',
  },
  shopButtonText: {
    color: '#2C3540',
  },
  footer: {
    paddingHorizontal: 20,
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(252, 244, 227, 0.1)',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(252, 244, 227, 0.7)',
    marginLeft: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 15,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(252, 244, 227, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomDrawerContent;