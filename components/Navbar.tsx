import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFonts, FONT_FAMILIES } from '../components/Fonts';
import React, { useCallback, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, useWindowDimensions } from 'react-native'
import { useScrollNavbar } from './ScrollNavbar';


type NavBarParams = {
  userLoggedIn?: boolean;
  handleScroll?: any;
  navbarTranslateY: any;
  navbarHeight: any;
}

export default function NavBar({ userLoggedIn = false, handleScroll, navbarTranslateY, navbarHeight }: NavBarParams) {
  const navigation: any = useNavigation();
  const { width } = useWindowDimensions();
  const { fontsLoaded } = useFonts();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  return (
    <Animated.View
      style={[
        styles.navbarContainer,
        {
          transform: [{ translateY: navbarTranslateY }],
          height: navbarHeight,
        }
      ]}
    >
      <View
        style={[
          styles.navbar,
          {
            height: navbarHeight,
            paddingHorizontal: isMobile ? 15 : 70,
            flexDirection: isMobile ? 'column' : 'row',
            paddingVertical: isMobile ? 10 : 0,
          },
        ]}
      >
        {/* Left side */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>

            <Image
              source={require('../assets/home/Navbar/navbar-logo.png')}
              style={[
                styles.logo,
                {
                  height: isDesktop ? 100 : isMobile ? 25 : 40,
                  marginHorizontal: isMobile ? 0 : 30,
                },
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {isMobile && (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../assets/icons/menu.svg')}
                style={{
                  height: 28,
                  width: 28,
                  tintColor: 'white'
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          )}
          {!isMobile && (
            <View style={[styles.seachView, { left: isMobile ? 0 : 35 }]}>
              <Image
                source={require('../assets/icons/search.svg')}
                style={{
                  height: 20,
                }}
                resizeMode='contain'
              />
              <TextInput
                style={styles.searchTextInput}
                placeholder="Search"
                placeholderTextColor={'white'}
              />
            </View>
          )}
        </View>

        {/* Right side - Desktop only */}
        {!isMobile && (
          <View
            style={[
              styles.navbarRightButtonsView,
              { flexWrap: isTablet ? 'wrap' : 'nowrap' },
            ]}
          >
            <TouchableOpacity
              style={styles.navbarRightButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={[
                styles.nrbText,
                { fontSize: isTablet ? 16 : 19 },
              ]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('About')}
              style={styles.navbarRightButton}
            >
              <Text style={[
                styles.nrbText,
                { fontSize: isTablet ? 16 : 19 },
              ]}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarRightButton}
              onPress={() => navigation.navigate('Collections')}
            >
              <Text style={[
                styles.nrbText,
                { fontSize: isTablet ? 16 : 19 },
              ]}>Collections</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navbarRightButton}
              onPress={() => navigation.navigate('Support')}
            >
              <Text style={[
                styles.nrbText,
                { fontSize: isTablet ? 16 : 19 },
              ]}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.nrbText,
                  { fontSize: isTablet ? 16 : 19 },
                ]}
              >
                Shop Now
              </Text>
              <Image
                source={require('../assets/icons/chevron-down.svg')}
              />
            </TouchableOpacity>


            <View style={styles.account}>
              {!userLoggedIn && (
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.accountButtonsText,
                      { fontSize: isTablet ? 16 : 19,},
                    ]}
                  >
                    Join
                  </Text>
                </TouchableOpacity>
              )}
              {userLoggedIn && (
                <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
                  <Image
                    source={require('../assets/icons/cart-outline.svg')}
                    style={{
                      height:30,
                      width:31.5,
                      tintColor:'white',
                      marginHorizontal:15
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              )}

              
              <TouchableOpacity
              onPress={()=>{navigation.navigate('Store')}}
              >
                <Text
                  style={[
                    styles.accountButtonsText,
                    { fontSize: isTablet ? 16 : 19 },
                  ]}
                >Shop</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  mainBody: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#2C3540',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    marginHorizontal: 30,
  },
  seachView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 35,
  },
  searchTextInput: {
    paddingHorizontal: 7,
    fontSize: 22,
    color: '#FCF4E3',
    outlineWidth: 0,
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
    fontWeight: '300'

  },
  navbarRightButtonsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'center'

  },
  navbarRightButton: {
    paddingHorizontal: 15,
  },
  nrbText: {
    color: '#FCF4E3',
    paddingHorizontal: 10,
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
    fontSize: 22,
    fontWeight: '300'
  },
  account: {
    flexDirection: 'row',
    marginLeft: 18,
    alignItems:'center'
  },
  accountButtonsText: {
    color: '#FCF4E3',
    paddingHorizontal: 15,
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
    fontSize: 22,
  },
  heroNavLinkButton: {
    marginHorizontal: 22,
  },
  heroNavLinkButtonText: {
    fontSize: 22,
    color: '#412023',
  },
  heroNavLinksView: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30
  },
})