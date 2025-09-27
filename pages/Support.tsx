// Replace the incomplete "We are Here to Help" section with this complete implementation

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
import { LinearGradient } from "expo-linear-gradient";
import OrderTrackingProgress from "../components/OrderProgress";

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

const TOPIC_OPTIONS = [
  'Choose one...',
  'General Inquiry',
  'Order Status',
  'Returns Request',
  'Product Feedback',
  'Technical Support',
  'Billing Question',
  'Other'
];

const ASSISTANCE_OPTIONS = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Order Status', value: 'order' },
  { label: 'Returns Request', value: 'returns' },
  { label: 'Product Feedback', value: 'feedback' },
  { label: 'Other Inquiry', value: 'other_inquiry' },
  { label: 'Other', value: 'other' },
];

export default function Support() {
  const navigation: any = useNavigation();
  const { fontsLoaded } = useFonts();
  const { width } = useWindowDimensions();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [helpFormData, setHelpFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    selectedTopic: 'Choose one...',
    selectedAssistance: '',
    message: '',
    agreeToTerms: false
  });

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

  const updateHelpFormData = (field: string, value: string | boolean) => {
    setHelpFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitHelpForm = () => {
    console.log('Help form submitted:', helpFormData);
    // Add your form submission logic here
  };

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
                    width: 20
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
                <Image
                  source={require('../assets/icons/chevron-down.svg')}
                />
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


      {/* MAIN PAGE */}
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
                    <Image
                      source={require('../assets/icons/checkmark.svg')}
                      style={{
                        height: 16,
                        width: 16,
                        tintColor: '#FCF4E3'
                      }}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <Text style={styles.checkboxText}>
                  I accept the Terms
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <LinearGradient
                  colors={['#FCF4E3', '#543236']}
                  style={{
                    borderRadius: 13,
                    borderColor: '#43282B',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    left: isMobile ? (width * 0.8) / 2 : (width * 0.35) / 2,
                    width: 80,
                    transform: [{ translateX: -40 }]
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      paddingVertical: 9,
                      paddingHorizontal: 14,
                      borderRadius: 13,
                      fontSize: 16,
                    }}
                  >Submit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* TRACKING MAP AND PROGRESS */}
            <View style={{ marginLeft: 500, marginTop: isMobile ? 50 : 0, flexDirection: 'row', alignItems: 'center' }}>
              {/* TRACKING PROGRESS */}
              <View>
                <OrderTrackingProgress />
              </View>

              {/*  Map */}
              <View style={[styles.mapSection, {
                // right: (width * 0.25),
                // transform: [{ translateX: 600 }],
              }]}>
                <LeafletMaps />
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 50 : 80,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>

        {/* RETURNS */}
        <View>
          {/* LEFT SIDE */}
          {/* <View>
            <Text>Returns</Text>

          </View> */}

        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 50 : 80,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>

        {/* WE ARE HERE TO HELP - COMPLETE SECTION */}
        <View style={styles.helpSectionContainer}>
          <View style={styles.helpHeaderContainer}>
            <Text style={styles.helpMainTitle}>We are Here to Help</Text>
            <Text style={styles.helpDescription}>
              Welcome to our Contact Us page! Whether you have questions about your order, need assistance with returns, or want to reach out for any other inquiries, we're here to provide the support you need.
            </Text>
          </View>

          {/* CONTACT FORM */}
          <View style={styles.contactFormContainer}>
            <View style={styles.contactFormHeader}>
              <Text style={styles.supportLabel}>Support</Text>
              <Text style={styles.getInTouchTitle}>Get in Touch</Text>
              <Text style={styles.getInTouchSubtitle}>We're here to help you with any questions.</Text>
            </View>

            <View style={styles.formContainer}>
              {/* FIRST ROW - First Name and Last Name */}
              <View style={styles.formRow}>
                <View style={styles.formFieldHalf}>
                  <Text style={styles.fieldLabel}>First Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={helpFormData.firstName}
                    onChangeText={(text) => updateHelpFormData('firstName', text)}
                    placeholder=""
                  />
                </View>
                <View style={styles.formFieldHalf}>
                  <Text style={styles.fieldLabel}>Last Name</Text>
                  <TextInput
                    style={styles.textInput}
                    value={helpFormData.lastName}
                    onChangeText={(text) => updateHelpFormData('lastName', text)}
                    placeholder=""
                  />
                </View>
              </View>

              {/* SECOND ROW - Email and Phone Number */}
              <View style={styles.formRow}>
                <View style={styles.formFieldHalf}>
                  <Text style={styles.fieldLabel}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    value={helpFormData.email}
                    onChangeText={(text) => updateHelpFormData('email', text)}
                    placeholder=""
                    keyboardType="email-address"
                  />
                </View>
                <View style={styles.formFieldHalf}>
                  <Text style={styles.fieldLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.textInput}
                    value={helpFormData.phoneNumber}
                    onChangeText={(text) => updateHelpFormData('phoneNumber', text)}
                    placeholder=""
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* SELECT A TOPIC DROPDOWN */}
              <View style={styles.formFieldFull}>
                <Text style={styles.fieldLabel}>Select a Topic</Text>
                <View style={styles.dropdownContainer}>
                  <Text style={styles.dropdownText}>{helpFormData.selectedTopic}</Text>
                  <Image
                    source={require('../assets/icons/chevron-down.svg')}
                    style={{
                      height: 17,
                      width: 17,
                      tintColor: '#412023'
                    }}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* HOW CAN WE ASSIST - Radio Buttons */}
              <View style={styles.formFieldFull}>
                <Text style={styles.fieldLabel}>How can we assist?</Text>
                <View style={styles.radioButtonContainer}>
                  {ASSISTANCE_OPTIONS.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.radioButtonRow}
                      onPress={() => updateHelpFormData('selectedAssistance', option.value)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.radioButton}>
                        {helpFormData.selectedAssistance === option.value && (
                          <View style={styles.radioButtonSelected} />
                        )}
                      </View>
                      <Text style={styles.radioButtonLabel}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* MESSAGE FIELD */}
              <View style={styles.formFieldFull}>
                <TextInput
                  style={styles.messageTextInput}
                  value={helpFormData.message}
                  onChangeText={(text) => updateHelpFormData('message', text)}
                  placeholder="Message"
                  placeholderTextColor={'rgba(65, 32, 35,0.7)'}
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              {/* TERMS CHECKBOX AND SUBMIT */}
              <View style={styles.formFooter}>
                <TouchableOpacity
                  style={styles.termsCheckboxContainer}
                  onPress={() => updateHelpFormData('agreeToTerms', !helpFormData.agreeToTerms)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.termsCheckbox,
                    helpFormData.agreeToTerms && styles.termsCheckboxChecked
                  ]}>
                    {helpFormData.agreeToTerms && (
                      <Image
                        source={require('../assets/icons/checkmark.svg')}
                        style={{
                          height: 16,
                          width: 16,
                          tintColor: '#FCF4E3'
                        }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text style={styles.termsText}>I agree to Terms</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitHelpForm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* WE ARE HERE TO HELP - END */}

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 50 : 80,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>


        {/* FAQ SECTION */}
        <View style={styles.FAQView}>

        </View>

      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  FAQView: {
    paddingTop: 100,
    paddingLeft: 100
  },
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
    // backgroundColor: '#412023',
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
    // marginTop: 20,

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

  // Help Section Styles
  helpSectionContainer: {
    paddingTop: 100,
    marginHorizontal: 100,
    marginBottom: 100,
  },
  helpHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  helpMainTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    fontSize: 60,
    color: '#412023',
    flex: 1,
  },
  helpDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 18,
    flexWrap: 'wrap',
    width: 600,
    color: '#412023',
    lineHeight: 24,
  },
  contactFormContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    padding: 40,
    borderWidth: 2,
    borderColor: 'rgba(65, 32, 35, 0.2)',
    borderStyle: 'dashed',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
  contactFormHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  supportLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 16,
    marginBottom: 10,
  },
  getInTouchTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    fontSize: 42,
    color: '#412023',
    marginBottom: 10,
  },
  getInTouchSubtitle: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 16,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  formFieldHalf: {
    flex: 0.48,
  },
  formFieldFull: {
    width: '100%',
    marginBottom: 30,
  },
  fieldLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 14,
    marginBottom: 8,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#412023',
    color: '#412023',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#412023',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dropdownText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    marginBottom: 10,
    width: '48%',
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#412023',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#412023',
  },
  radioButtonLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 14,
  },
  messageTextInput: {
    borderWidth: 1,
    borderColor: '#412023',
    borderRadius: 8,
    padding: 15,
    color: '#412023',
    fontSize: 16,
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    minHeight: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  termsCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#412023',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 3,
  },
  termsCheckboxChecked: {
    backgroundColor: '#412023',
  },
  termsText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    fontSize: 14,
  },
  // submitButton: {
  //   backgroundColor: '#412023',
  //   paddingVertical: 12,
  //   paddingHorizontal: 25,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // submitButtonText: {
  //   fontFamily: FONT_FAMILIES.FUTURA_BOOK,
  //   color: '#FCF4E3',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
})
