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
import { Ionicons } from '@expo/vector-icons';
import { useFonts, FONT_FAMILIES } from './Fonts';

const CustomDrawerContent = (props:any) => {
  const { fontsLoaded } = useFonts();

  if (!fontsLoaded) return null;

  const menuItems = [
    { 
      label: 'Home', 
      icon: 'home-outline', 
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
              <Ionicons name="close" size={24} color="#FCF4E3" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="rgba(252, 244, 227, 0.7)" />
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
                <Ionicons 
                // @ts-ignore

                  name={item.icon} 
                  size={22} 
                  color={isActive ? "#FCF4E3" : "rgba(252, 244, 227, 0.7)"} 
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
            <Ionicons name="chevron-down-outline" size={18} color="rgba(252, 244, 227, 0.7)" />
          </TouchableOpacity>
          
          {shopMenuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.subMenuItem}>
              <View>
                <Text style={styles.subMenuItemText}>{item.label}</Text>
                <Text style={styles.subMenuItemSubtext}>{item.subLabel}</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color="rgba(252, 244, 227, 0.5)" />
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
            <Ionicons name="mail-outline" size={18} color="rgba(252, 244, 227, 0.7)" />
            <Text style={styles.footerText}>hello@beshas.com</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItem}>
            <Ionicons name="call-outline" size={18} color="rgba(252, 244, 227, 0.7)" />
            <Text style={styles.footerText}>+1 (555) 123-4567</Text>
          </TouchableOpacity>
          
          {/* Social Media Icons */}
          <View style={styles.socialContainer}>
            {['logo-instagram', 'logo-facebook', 'logo-twitter'].map((icon, index) => (
              <TouchableOpacity key={index} style={styles.socialButton}>
                {/* @ts-ignore */}
                <Ionicons name={icon} size={20} color="rgba(252, 244, 227, 0.7)" />
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(252, 244, 227, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 40,
    width: 120,
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
    marginTop: 30,
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
    marginBottom: 15,
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