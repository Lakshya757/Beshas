import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { FONT_FAMILIES } from '../components/Fonts';

interface DropdownMenuProps {
  hovered: boolean
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ hovered }) => {
  const { width, height } = useWindowDimensions();

  const menuData = {
    'Ready to Wear': ['Shorts', 'T-shirt', 'Coats', 'Cashmere', 'Jackets', 'Trousers', 'All Ready to Wear'],
    'Shoes': ['Sports', 'Sneakers', 'Boots', 'Loafers', 'All Shoes'],
    'Accessories': ['Glasses', 'Caps', 'Wallet', 'Ties', 'Handkerchiefs', 'All Accessories'],
    'Bags': ['Totes', 'Jute', 'Leather', 'Hand- Bags', 'Luxury', 'Cross Body', 'All Bags']
  }

  // console.log('Dropdown hovered state:', hovered);

  if (!hovered || Platform.OS !== 'web') {
    // console.log('Dropdown not showing - hovered:', hovered, 'platform:', Platform.OS);
    return null;
  }

  // Calculate the offset to align dropdown's left edge with window's left edge
  // We need to account for the parent's position in the viewport
  const dropdownOffset = typeof window !== 'undefined' ? -window.innerWidth / 2 : -width / 2;

  return (
    <View style={[styles.dropdownContainer, { width: width }]}>
      <View style={[styles.dropdownContent, {
        width: width,
      }]}>
        <View style={styles.topBorder} />

        <View style={styles.menuGrid}>
          {Object.entries(menuData).map(([category, items], categoryIndex) => (
            <View key={categoryIndex} style={styles.menuColumn}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.divider} />
              {items.map((item, itemIndex) => (
                <TouchableOpacity key={itemIndex} style={styles.menuItem}>
                  <Text style={styles.menuItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* <View style={styles.rightSection}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Discover More</Text>
          </View>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Discover More</Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {  //@ts-ignore
  position: 'fixed',
  top: 280,
  left: 0,
  right: 0,
  zIndex: 9999,
  pointerEvents: 'auto',
  },
  dropdownContent: {
    backgroundColor: '#FCF4E3',
    borderWidth: 1,
    borderColor: '#8B9DC3',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  topBorder: {
    height: 2,
    backgroundColor: '#8B9DC3',
    width: '100%',
  },
  menuGrid: {
    flexDirection: 'row',
    padding: 30,
    paddingRight: 0,
    borderRightWidth: 1,
    borderRightColor: '#8B9DC3',
    borderStyle: 'dashed',
  },
  menuColumn: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 16,
    color: '#412023',
    marginBottom: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#8B9DC3',
    marginBottom: 15,
    opacity: 0.5,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 14,
    color: '#412023',
  },
  rightSection: {
    // position: 'absolute',
    right: 30,
    top: 30,
    flexDirection: 'row',
    gap: 20,
  },
  imagePlaceholder: {
    width: 180,
    height: 200,
    backgroundColor: '#D4D9E3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B9DC3',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 14,
    color: '#412023',
    textDecorationLine: 'underline',
  },
});

export default DropdownMenu;