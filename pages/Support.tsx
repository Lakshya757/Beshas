import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Platform,
  ScrollView,
  Animated
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
import { Ionicons } from "@expo/vector-icons";
import { useScrollNavbar } from "../components/ScrollNavbar";
import LeafletMaps from "../components/LeafletMaps";

// Import all images statically
const images = {
  order: require('../assets/support/order.svg'),
  exchange: require('../assets/support/exchange.svg'),
  doubt: require('../assets/support/doubt.svg'),
};

const INFO = [
  {
    icon: 'order',
    title: 'Track Your Order with Ease',
    note: 'Stay updated on your order status anytime.'
  },
  {
    icon: 'exchange',
    title: 'Hassle Free Returns and Exchanges',
    note: 'Our simple process ensures your satisfaction.'
  },
  {
    icon: 'doubt',
    title: 'Contact Us for Any Assistance',
    note: 'Reach out to our support team anytime.'
  },
];

// Order tracking data
const ORDER_STAGES = [
  {
    id: 1,
    title: 'Order Placed',
    icon: 'bag-outline',
    completed: true,
    location: { lat: 28.6139, lng: 77.2090, name: 'New Delhi' }
  },
  {
    id: 2,
    title: 'Dispatched',
    icon: 'cube-outline',
    completed: true,
    location: { lat: 28.7041, lng: 77.1025, name: 'Warehouse, Delhi' }
  },
  {
    id: 3,
    title: 'In Transit',
    icon: 'car-outline',
    completed: false,
    current: true,
    location: { lat: 26.9124, lng: 80.9420, name: 'Lucknow Hub' }
  },
  {
    id: 4,
    title: 'Delivered',
    icon: 'home-outline',
    completed: false,
    location: { lat: 26.8467, lng: 80.9462, name: 'Your Location, Lucknow' }
  },
];

export default function Support() {
  const navigation: any = useNavigation();
  const { fontsLoaded } = useFonts();
  const { width } = useWindowDimensions();

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const navbarHeight = isDesktop ? 80 : 60;
  const { handleScroll, navbarTranslateY, isNavbarVisible } = useScrollNavbar(navbarHeight);

  const scrollViewRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        //@ts-ignore
        // scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
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
            {isMobile && (
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={28} color="white" />
              </TouchableOpacity>
            )}
            {!isMobile && (
              <View style={[styles.seachView, { left: isMobile ? 0 : 35 }]}>
                <Ionicons name="search-outline" size={24} color={'#FFFFFF'} />
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
              <TouchableOpacity style={styles.navbarRightButton}>
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
                <Ionicons name="chevron-down-outline" color={'white'} size={20} />
              </TouchableOpacity>
              <View style={styles.account}>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.accountButtonsText,
                      { fontSize: isTablet ? 16 : 19 },
                    ]}
                  >
                    Join
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.accountButtonsText,
                      { fontSize: isTablet ? 16 : 19 },
                    ]}
                  >
                    Shop
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
      {/* NAVBAR */}

      <Animated.ScrollView
        ref={scrollViewRef}
        style={[styles.mainBody, { paddingTop: navbarHeight }]}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* HEADER */}
        <View style={{ marginLeft: 100, paddingTop: 80, paddingBottom: 20, marginTop: 40 }}>
          <Text style={{ fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 15 : isTablet ? 16 : 17, }}>Welcome</Text>
          <Text style={{ marginTop: 28, fontSize: 85, fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM, color: '#412023' }}>Support Made Simple</Text>
          <Text style={{ fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 17 : isTablet ? 18 : 20, marginTop: 28 }}>Explore our support options for tracking orders, returns, exchanges, and more to assist you.</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 80 : 140,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>
        {/* HEADER */}

        {/* ASSIST */}
        <View style={{ marginLeft: 100, paddingTop: 80, paddingBottom: 50 }}>
          <Text style={{ fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 17 : isTablet ? 18 : 20, flexWrap: 'wrap', width: 800 }}>We are here to assist you with all your needs. Explore our key support features designed to enhance your experience.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {INFO.map((item, i) => (
              // @ts-ignore
              <View key={i} style={styles.infoItem}>
                <Image
                  source={images[item.icon as keyof typeof images]}
                  style={styles.infoIcon}
                  resizeMode="contain"
                />
                <Text style={styles.infoTitle}>{item.title}</Text>
                <Text style={styles.infoNote}>{item.note}</Text>
              </View>
            ))}
          </View>
        </View>
        {/* ASSIST */}

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 80 : 140,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>

        {/* TRACK ORDER HEADING */}
        <View style={styles.trackOrderView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM, fontSize: 60, color: '#412023' }}>Track Your Order</Text>
            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              fontSize: 20,
              flexWrap: 'wrap',
              right: (width * 0.5) - 80,
              width: 600,
              transform: [{ translateX: 600 }],
              marginLeft: 50,
              color: '#412023'
            }}>Easily monitor the status of your order in real-time.{"\n"}
              Stay informed and never miss a delivery!</Text>
          </View>
          {/* TRACK ORDER HEADING */}

          {/* MAIN TRACKING */}
          <View style={{ flexDirection: isMobile ? 'column' : 'row', marginTop: 90, paddingBottom: 100 }}>
            <View style={{ flex: isMobile ? 1 : 0.6, alignItems: 'flex-start' }}>{/* GET IN TOUCH AND FORM */}
              <Text style={{ fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 15 : isTablet ? 16 : 17, }}>Track</Text>
              <Text style={{
                fontSize: isMobile ? 32 : 50,
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                textAlign: 'center',
                color: '#412023',
                marginTop: 30
              }}>Get In Touch</Text>
              <Text style={{ fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 15 : isTablet ? 16 : 17, marginTop: 15 }}>We're here to assist you with your inquiries.</Text>

              <Text style={{ marginTop: 60, fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 12 : isTablet ? 13 : 16, }}>Name</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  width: isMobile ? width * 0.8 : (width * 0.35),
                  color: '#43282B',
                  borderBottomColor: '#412023',
                  height: 50,
                  ...(Platform.OS === 'web' && { outline: 'none' }),
                }}
              />
              <Text style={{ marginTop: 60, fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 12 : isTablet ? 13 : 16, }}>Email</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  width: isMobile ? width * 0.8 : (width * 0.35),
                  color: '#43282B',
                  borderBottomColor: '#412023',
                  height: 50,
                  ...(Platform.OS === 'web' && { outline: 'none' }),
                }}
              />
              <Text style={{ marginTop: 60, fontFamily: FONT_FAMILIES.FUTURA_BOOK, color: '#412023', fontSize: isMobile ? 12 : isTablet ? 13 : 16, }}>Message</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  width: isMobile ? width * 0.8 : (width * 0.35),
                  color: '#43282B',
                  borderBottomColor: '#412023',
                  height: 120,
                  textAlignVertical: 'top',
                  paddingTop: 10,
                  ...(Platform.OS === 'web' && { outline: 'none' }),
                  marginTop: 15
                }}
                placeholder="Type your message"
                placeholderTextColor={'rgba(65, 32, 35,0.7)'}
                multiline={true}
              />

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked
                ]}>
                  {acceptedTerms && (
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color="#FCF4E3"
                    />
                  )}
                </View>
                <Text style={styles.checkboxText}>
                  I accept the Terms
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>

            {/* TRACKING MAP AND PROGRESS */}
            <View style={{ flex: isMobile ? 1 : 0.4, marginLeft: isMobile ? 0 : 50, marginTop: isMobile ? 50 : 0 }}>
              {/* Order Progress */}
              {/* <View style={styles.progressSection}>
                <Text style={styles.progressTitle}>Order Status</Text>
                <OrderTrackingProgress />
              </View> */}

              {/* Tracking Map */}
              <View style={styles.mapSection}>
                <LeafletMaps/>
              </View>
            </View>
          </View>
          {/* MAIN TRACKING */}
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  // Original styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 10
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#412023',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5
  },
  checkboxChecked: {
    backgroundColor: '#412023',
  },
  checkboxText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#412023',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#FCF4E3',
    fontSize: 16,
    fontWeight: '600',
  },
  trackOrderView: {
    paddingTop: 100,
    marginLeft: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3',
  },
  responsiveImage: {
    aspectRatio: 1312 / 632,
  },
  seachView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 35,
  },
  account: {
    flexDirection: 'row',
    marginLeft: 18,
  },
  navbarRightButton: {
    paddingHorizontal: 15,
  },
  accountButtonsText: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 19,
  },
  nrbText: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 19,
  },
  navbarRightButtonsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchTextInput: {
    paddingHorizontal: 7,
    fontSize: 18,
    color: 'white',
    outlineWidth: 0,
  },
  navbar: {
    backgroundColor: '#2C3540',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 70,
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
      },
    }),
  },
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
  logo: {
    marginHorizontal: 30,
  },
  mainBody: {
    flex: 1,
  },
  infoItem: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 80,
  },
  infoIcon: {
    width: 48,
    height: 48,
    marginBottom: 15,
  },
  infoTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    fontSize: 30,
    color: '#412023',
    marginBottom: 10,
    flexWrap: 'wrap',
    width: 350
  },
  infoNote: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 16,
    color: '#412023',
    textAlign: 'center',
  },

  // New styles for tracking components
  progressSection: {
    marginBottom: 40,
  },
  progressTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    fontSize: 24,
    color: '#412023',
    marginBottom: 20,
  },
  trackingContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  stageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stageIconContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  stageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageIconCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  stageIconCurrent: {
    backgroundColor: '#E85A4F',
    borderColor: '#E85A4F',
  },
  connectorLine: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginTop: 5,
  },
  connectorLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  stageContent: {
    flex: 1,
    paddingTop: 8,
  },
  stageTitle: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  stageTitleActive: {
    color: '#412023',
    fontWeight: 'bold',
  },
  stageLocation: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  // Map styles
  mapSection: {
    marginTop: 20,
  },
  mapTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    fontSize: 24,
    color: '#412023',
    marginBottom: 20,
  },
  mapContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  routePath: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: '#E85A4F',
    opacity: 0.6,
  },
  mapMarker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
  mapMarkerCompleted: {
    // Additional styling for completed markers
  },
  mapMarkerCurrent: {
    // Additional styling for current location marker
  },
  markerLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  markerLabelCurrent: {
    color: '#E85A4F',
    fontWeight: 'bold',
  },
  currentLocationPulse: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  pulseRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(232, 90, 79, 0.3)',
    borderWidth: 2,
    borderColor: '#E85A4F',
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  legendText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 10,
    color: '#666',
  },
})