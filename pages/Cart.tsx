import React, { useCallback, useEffect, useRef, useState } from "react";
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
  Animated,
  LayoutAnimation
} from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
import { useScrollNavbar } from "../components/ScrollNavbar";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

const ASSISTANCE_OPTIONS = [
  { label: 'General Inquiry', value: 'general' },
  { label: 'Order Status', value: 'order' },
  { label: 'Returns Request', value: 'returns' },
  { label: 'Product Feedback', value: 'feedback' },
  { label: 'Other Inquiry', value: 'other_inquiry' },
  { label: 'Other', value: 'other' },
];

const CART_ITEMS = [
  {
    id: 1,
    name: "Mock Neck Sweater Quarter Zip",
    price: '3,999',
    rating: 4,
    reviewTitle: "Amazing Cloth",
    reviewerName: "Aisha Patel",
    reviewerRole: "Fashion Blogger"
  },
  {
    id: 2,
    name: "Adidas Black Sweatshirt",
    price: '999',
    rating: 5,
    reviewTitle: "Slav",
    reviewerName: "Ayrton Senna",
    reviewerRole: "F1 Racer"
  },
  {
    id: 3,
    name: "Nike Air Jordon 1 Grey and White",
    price: '15,999',
    rating: 3,
    reviewTitle: "Great Design",
    reviewerName: "Roronoa Zoro",
    reviewerRole: "Greatest Swordsman"
  },
  // {
  //   id:4,
  //   name:"",
  //   price:1,
  //   rating:5,
  //   reviewTitle:"",
  //   reviewerName:"",
  //   reviewerRole:""
  // },
]



export default function Cart() {
  const navigation: any = useNavigation();
  const { fontsLoaded } = useFonts();
  const { width } = useWindowDimensions();


  const toggleExpansion = (itemId: any) => {
    // Using LayoutAnimation for smooth transitions
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setExpandedItems(prev => ({
      ...prev,
      // @ts-ignore
      [itemId]: !prev[itemId]
    }));
  };

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

  const [expandedItems, setExpandedItems] = useState({});


  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;
  const isDesktop = width >= 1200;
  const navbarHeight = isDesktop ? 80 : 60;
  const { handleScroll, navbarTranslateY, isNavbarVisible } = useScrollNavbar(navbarHeight);

  const scrollViewRef = useRef(null);

  // Responsive padding calculation
  const getResponsivePadding = () => {
    if (isMobile) return { horizontal: Math.min(width * 0.06, 30), vertical: 30 };
    if (isTablet) return { horizontal: Math.min(width * 0.08, 60), vertical: 50 };
    return { horizontal: Math.min(width * 0.1, 100), vertical: 80 };
  };

  const responsivePadding = getResponsivePadding();

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


  useEffect(() => {
    // console.log(width+"_______________________________"+responsivePadding.horizontal)
  })

  const handleSubmitHelpForm = () => {
    console.log('Help form submitted:', helpFormData);
    // Add your form submission logic here
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <NavBar userLoggedIn={true} handleScroll={handleScroll} navbarTranslateY={navbarTranslateY} navbarHeight={navbarHeight} />

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

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 10 : isTablet ? 15 : 25,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>
        <View style={styles.header}>
          <Image
            source={require('../assets/home/Header/logo.svg')}
            style={{
              marginTop: 13,
              height: isMobile ? 50 : 75,
              width: isMobile ? 100 : 150,
            }}
          />
        </View>

        {/* MAIN CART SECTION */}
        <View style={{
          paddingVertical: 80,
          paddingHorizontal: 100
        }}>
          <Text style={{
            fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
            fontSize: 55,
            color: '#412023'
          }}>Your Cart</Text>


          <View style={{
            marginTop: 40
          }}>

            {CART_ITEMS.map((item) => (
              <View style={{ flexDirection: 'row', backgroundColor: '#EDE6D7', marginVertical: 30, paddingVertical: 40, paddingHorizontal: 30 }}>
                <Image
                  source={require('../assets/cart/Placeholder Image.png')}
                  style={{
                    height: 350
                  }}
                  resizeMode="contain"
                />
                <View>
                  <Text>{item.name}</Text>
                  <Text>₹{item.price}</Text>
                  <View style={{ flexDirection: 'row', marginTop: isMobile ? 15 : 0 }}>
                    {Array(item.rating)
                      .fill(null)
                      .map((_, i) => (
                        <Image key={i} source={require('../assets/home/Testimonial/star.svg')} style={{ marginHorizontal: 2 }} />
                      ))}
                  </View>

                  <Text>{item.reviewTitle}</Text>
                  <Text>{item.reviewerName}</Text>
                  <Text>{item.reviewerRole}</Text>
                </View>

              </View>
            ))}

          </View>

          <TouchableOpacity style={{
            marginTop: 50
          }}><Text style={{
            fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
            textDecorationLine: 'underline',
            fontSize: 30,
            color: '#412023'
          }}>Proceed to Payment</Text></TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 10 : isTablet ? 15 : 25,
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
        <View style={[styles.helpSectionContainer, {
          paddingHorizontal: responsivePadding.horizontal,
          paddingVertical: responsivePadding.vertical,
        }]}>
          <View style={[styles.helpHeaderContainer, {
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            marginBottom: isMobile ? 50 : 80
          }]}>
            <Text style={[styles.helpMainTitle, {
              fontSize: isMobile ? 38 : isTablet ? 50 : 60,
              flex: isMobile ? 1 : 0.5,
              marginBottom: isMobile ? 20 : 0
            }]}>We are Here to Help</Text>
            <Text style={[styles.helpDescription, {
              fontSize: isMobile ? 16 : 18,
              width: isMobile ? '100%' : isTablet ? '45%' : '40%'
            }]}>
              Welcome to our Contact Us page! Whether you have questions about your order, need assistance with returns, or want to reach out for any other inquiries, we're here to provide the support you need.
            </Text>
          </View>

          {/* CONTACT FORM */}
          <View style={[styles.contactFormContainer, {
            padding: isMobile ? 25 : isTablet ? 35 : 40
          }]}>
            <View style={styles.contactFormHeader}>
              <Text style={[styles.supportLabel, {
                fontSize: isMobile ? 14 : 16
              }]}>Support</Text>
              <Text style={[styles.formGetInTouchTitle, {
                fontSize: isMobile ? 32 : isTablet ? 38 : 42
              }]}>Get in Touch</Text>
              <Text style={[styles.formGetInTouchSubtitle, {
                fontSize: isMobile ? 14 : 16
              }]}>We're here to help you with any questions.</Text>
            </View>

            <View style={styles.formContainer}>
              {/* FIRST ROW - First Name and Last Name */}
              <View style={[styles.formRow, {
                flexDirection: isMobile ? 'column' : 'row'
              }]}>
                <View style={[styles.formFieldHalf, {
                  flex: isMobile ? 1 : 0.48,
                  marginRight: isMobile ? 0 : 20,
                  marginBottom: isMobile ? 20 : 0
                }]}>
                  <Text style={styles.fieldLabel}>First Name</Text>
                  <TextInput
                    style={styles.formTextInput}
                    value={helpFormData.firstName}
                    onChangeText={(text) => updateHelpFormData('firstName', text)}
                    placeholder=""
                  />
                </View>
                <View style={[styles.formFieldHalf, {
                  flex: isMobile ? 1 : 0.48
                }]}>
                  <Text style={styles.fieldLabel}>Last Name</Text>
                  <TextInput
                    style={styles.formTextInput}
                    value={helpFormData.lastName}
                    onChangeText={(text) => updateHelpFormData('lastName', text)}
                    placeholder=""
                  />
                </View>
              </View>

              {/* SECOND ROW - Email and Phone Number */}
              <View style={[styles.formRow, {
                flexDirection: isMobile ? 'column' : 'row'
              }]}>
                <View style={[styles.formFieldHalf, {
                  flex: isMobile ? 1 : 0.48,
                  marginRight: isMobile ? 0 : 20,
                  marginBottom: isMobile ? 20 : 0
                }]}>
                  <Text style={styles.fieldLabel}>Email</Text>
                  <TextInput
                    style={styles.formTextInput}
                    value={helpFormData.email}
                    onChangeText={(text) => updateHelpFormData('email', text)}
                    placeholder=""
                    keyboardType="email-address"
                  />
                </View>
                <View style={[styles.formFieldHalf, {
                  flex: isMobile ? 1 : 0.48
                }]}>
                  <Text style={styles.fieldLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.formTextInput}
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
                <View style={[styles.radioButtonContainer, {
                  flexDirection: isMobile ? 'column' : 'row'
                }]}>
                  {ASSISTANCE_OPTIONS.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.radioButtonRow, {
                        width: isMobile ? '100%' : '48%',
                        marginBottom: isMobile ? 15 : 10
                      }]}
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
                  style={[styles.messageTextInput, {
                    minHeight: isMobile ? 100 : 120
                  }]}
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
              <View style={[styles.formFooter, {
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-start' : 'center'
              }]}>
                <TouchableOpacity
                  style={[styles.termsCheckboxContainer, {
                    marginBottom: isMobile ? 20 : 0
                  }]}
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
                  style={[styles.finalSubmitButton, {
                    alignSelf: isMobile ? 'center' : 'auto'
                  }]}
                  onPress={handleSubmitHelpForm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.finalSubmitButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Footer />

      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  supportLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    marginBottom: 10,
  },
  formGetInTouchTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023',
    marginBottom: 10,
  },
  formGetInTouchSubtitle: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  formRow: {
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  formFieldHalf: {
    // flex: 0.48,
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
  formTextInput: {
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
    flexWrap: 'wrap',
    marginTop: 10,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    ...Platform.select({
      web: {
        outline: 'none',
      },
    }),
  },
  formFooter: {
    justifyContent: 'space-between',
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
  finalSubmitButton: {
    backgroundColor: '#412023',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  finalSubmitButtonText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#FCF4E3',
    fontSize: 16,
    fontWeight: '600',
  },


  helpSectionContainer: {
    flex: 1,
  },
  helpHeaderContainer: {
    flex: 1,
  },
  helpMainTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023',
  },
  helpDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    lineHeight: 24,
  },
  contactFormContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
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
  header: {
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3',
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
    color: 'white',
    outlineWidth: 0,
  },
  navbarRightButtonsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  navbarRightButton: {
    paddingHorizontal: 15,
  },
  nrbText: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 19,
  },
  account: {
    flexDirection: 'row',
    marginLeft: 18,
  },
  accountButtonsText: {
    color: 'white',
    paddingHorizontal: 15,
    fontSize: 19,
  },
  mainBody: {
    flex: 1,
  },
})
