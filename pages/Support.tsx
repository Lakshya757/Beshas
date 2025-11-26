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
import LeafletMaps from "../components/LeafletMaps";
import { LinearGradient } from "expo-linear-gradient";
import OrderTrackingProgress from "../components/OrderProgress";
import FAQScreen from "../components/FAQDropdown";
import AnimatedFAQDropdown from "../components/FAQDropdown";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

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
const faqData = [
  {
    id: '1',
    question: 'How do I track?',
    answer: 'To track your order, visit our tracking page and enter your order number. You can find this number in your confirmation email. Once entered, you\'ll see the current status of your shipment.'
  },
  {
    id: '2',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase. Items must be in their original condition and packaging. Please visit our returns page for detailed instructions.'
  },
  {
    id: '3',
    question: 'How to exchange items?',
    answer: 'To exchange an item, please initiate a return for the original item first. Once we receive it, you can place a new order for the desired item. Make sure to check our exchange policy for specific guidelines.'
  },
  {
    id: '4',
    question: 'How to contact support?',
    answer: 'You can reach our support team via the \'Contact Us\' page. Fill out the form, and we will respond within 24 hours. Alternatively, you can call us during business hours.'
  },
  {
    id: '5',
    question: 'Where is my order?',
    answer: 'To find out where your order is, use the tracking feature on our website. If you have any issues, please contact our customer support. We\'re here to help you locate your order.'
  }
];



export default function Support() {
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
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
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
      <NavBar userLoggedIn={false} handleScroll={handleScroll} navbarTranslateY={navbarTranslateY} navbarHeight={navbarHeight} />

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
        <View style={[styles.headerContainer, {
          marginLeft: isMobile ? responsivePadding.horizontal : Math.min(width * 0.1, 100),
          paddingTop: isMobile ? 40 : isTablet ? 60 : 80,
          paddingBottom: 20,
          marginTop: isMobile ? 20 : 40,
          paddingRight: responsivePadding.horizontal
        }]}>
          <Text style={[styles.welcomeText, {
            fontSize: isMobile ? 14 : isTablet ? 15 : 17
          }]}>Welcome</Text>
          <Text style={[styles.mainTitle, {
            fontSize: isMobile ? 42 : isTablet ? 60 : 85,
            marginTop: isMobile ? 20 : 28
          }]}>Support Made Simple</Text>
          <Text style={[styles.subtitle, {
            fontSize: isMobile ? 16 : isTablet ? 18 : 20,
            marginTop: isMobile ? 20 : 28
          }]}>Explore our support options for tracking orders, returns, exchanges, and more to assist you.</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 60 : 80,
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
        <View style={[styles.assistContainer, {
          paddingHorizontal: responsivePadding.horizontal,
          paddingVertical: responsivePadding.vertical,
        }]}>
          <Text style={[styles.assistDescription, {
            fontSize: isMobile ? 16 : isTablet ? 18 : 20,
            maxWidth: isMobile ? '100%' : isTablet ? width * 0.7 : 800
          }]}>We are here to assist you with all your needs. Explore our key support features designed to enhance your experience.</Text>

          <View style={[styles.infoContainer, {
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: isMobile ? 'center' : 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start'
          }]}>
            {INFO.map((item, i) => (
              <View key={i} style={[styles.infoItem, {
                width: isMobile ? '100%' : isTablet ? '30%' : 'auto',
                maxWidth: isMobile ? 350 : 'auto',
                marginBottom: isMobile ? 40 : 0,
                alignItems: isMobile ? 'center' : 'flex-start'
              }]}>
                <Image
                  source={images[item.icon as keyof typeof images]}
                  style={[styles.infoIcon, {
                    width: isMobile ? 40 : 48,
                    height: isMobile ? 40 : 48
                  }]}
                  resizeMode="contain"
                />
                <Text style={[styles.infoTitle, {
                  fontSize: isMobile ? 24 : isTablet ? 26 : 30,
                  textAlign: isMobile ? 'center' : 'left'
                }]}>{item.title}</Text>
                <Text style={[styles.infoNote, {
                  fontSize: isMobile ? 14 : 16,
                  textAlign: isMobile ? 'center' : 'left'
                }]}>{item.note}</Text>
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
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>

        {/* TRACK ORDER SECTION */}
        <View style={[styles.trackOrderView, {
          paddingHorizontal: responsivePadding.horizontal,
          paddingVertical: responsivePadding.vertical,
        }]}>
          <View style={[styles.trackOrderHeader, {
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'flex-start'
          }]}>
            <Text style={[styles.trackOrderTitle, {
              fontSize: isMobile ? 38 : isTablet ? 50 : 60
            }]}>Track Your Order</Text>
            <Text style={[styles.trackOrderDescription, {
              fontSize: isMobile ? 16 : isTablet ? 18 : 20,
              width: isMobile ? '100%' : isTablet ? '45%' : '40%',
              marginTop: isMobile ? 20 : 0,
              marginLeft: isMobile ? 0 : 20
            }]}>Easily monitor the status of your order in real-time.{"\n"}
              Stay informed and never miss a delivery!</Text>
          </View>

          {/* MAIN TRACKING */}
          <View style={[styles.trackingMainContainer, {
            flexDirection: isMobile ? 'column' : 'row',
            marginTop: isMobile ? 50 : 90,
            paddingBottom: isMobile ? 50 : 100
          }]}>
            {/* FORM SECTION */}
            <View style={[styles.formSection, {
              flex: isMobile ? 1 : 0.6,
              // marginRight: isMobile ? 0 : 40,
              marginBottom: isMobile ? 40 : 0
            }]}>
              <Text style={[styles.trackLabel, {
                fontSize: isMobile ? 14 : isTablet ? 15 : 17
              }]}>Track</Text>
              <Text style={[styles.getInTouchTitle, {
                fontSize: isMobile ? 32 : isTablet ? 42 : 50,
                marginTop: isMobile ? 20 : 30
              }]}>Get In Touch</Text>
              <Text style={[styles.getInTouchSubtitle, {
                fontSize: isMobile ? 14 : isTablet ? 15 : 17,
                marginTop: 15
              }]}>We're here to assist you with your inquiries.</Text>

              <Text style={[styles.inputLabel, {
                marginTop: isMobile ? 40 : 60,
                fontSize: isMobile ? 12 : isTablet ? 13 : 16
              }]}>Name</Text>
              <TextInput
                style={[styles.textInput, {
                  width: '100%',
                  maxWidth: isMobile ? '100%' : 500
                }]}
              />

              <Text style={[styles.inputLabel, {
                marginTop: isMobile ? 40 : 60,
                fontSize: isMobile ? 12 : isTablet ? 13 : 16
              }]}>Email</Text>
              <TextInput
                style={[styles.textInput, {
                  width: '100%',
                  maxWidth: isMobile ? '100%' : 500
                }]}
              />

              <Text style={[styles.inputLabel, {
                marginTop: isMobile ? 40 : 60,
                fontSize: isMobile ? 12 : isTablet ? 13 : 16
              }]}>Message</Text>
              <TextInput
                style={[styles.messageInput, {
                  width: '100%',
                  maxWidth: isMobile ? '100%' : 500,
                  marginTop: 15
                }]}
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

              <TouchableOpacity style={[styles.submitButtonContainer, {
                alignItems: isMobile ? 'center' : 'flex-start'
              }]}>
                <LinearGradient
                  colors={['#FCF4E3', '#543236']}
                  style={styles.submitGradient}
                >
                  <Text style={styles.submitText}>Submit</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>



            {/* TRACKING MAP AND PROGRESS */}
            <View style={[styles.trackingVisualSection, {
              flex: isMobile ? 1 : 0.8,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: isMobile ? -300 : 0

            }]}>
              {/* TRACKING PROGRESS */}
              <View style={[styles.progressContainer, {
                marginBottom: isMobile ? 120 : 0,
                marginRight: isMobile ? 0 : 20,
                marginLeft: 100

              }]}>
                <OrderTrackingProgress />
              </View>

              {/* Map */}
              <View style={[styles.mapSection, {
                // width: isMobile ? '100%' : width*0.32,
                // maxWidth: isMobile ? 350 : 'auto'
                marginTop: isMobile ? 300 : 0,

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
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>

        {/* RETURNS SECTION */}
        <View style={[styles.returnView, {
          paddingHorizontal: responsivePadding.horizontal,
          paddingVertical: responsivePadding.vertical,
          paddingRight: isMobile ? responsivePadding.horizontal : Math.min(width * 0.15, 200),
          flexDirection: isMobile ? 'column' : 'row'
        }]}>
          <View style={[styles.returnLeftSection, {
            flex: isMobile ? 1 : 0.6,
            marginRight: isMobile ? 0 : 40,
            marginBottom: isMobile ? 40 : 0
          }]}>
            <Text style={[styles.returnLabel, {
              fontSize: isMobile ? 14 : isTablet ? 15 : 17
            }]}>Return</Text>
            <Text style={[styles.returnTitle, {
              fontSize: isMobile ? 38 : isTablet ? 50 : 60,
              marginTop: isMobile ? 20 : 30
            }]}>Easy Return and {"\n"}Exchanges</Text>

            <Image
              source={require('../assets/icons/procedure.svg')}
              style={[styles.procedureIcon, {
                marginTop: isMobile ? 60 : 130
              }]}
            />

            <Text style={[styles.processTitle, {
              fontSize: isMobile ? 32 : isTablet ? 40 : 48,
              marginTop: isMobile ? 40 : 50
            }]}>How to Easily Process{"\n"}Your Return</Text>

            <Text style={[styles.processDescription, {
              fontSize: isMobile ? 14 : 16,
              marginTop: 12
            }]}>
              Returning an item is simple! Just follow these steps and ensure you have the necessary documentation ready.
            </Text>

            <View style={[styles.instructionsContainer, {
              flexDirection: isMobile ? 'column' : 'row',
              marginTop: isMobile ? 30 : 45
            }]}>
              <View style={[styles.instructionItem, {
                marginRight: isMobile ? 0 : 30,
                marginBottom: isMobile ? 30 : 0
              }]}>
                <Image
                  source={require('../assets/icons/how-to.svg')}
                  style={styles.instructionIcon}
                />
                <Text style={[styles.instructionTitle, {
                  fontSize: isMobile ? 20 : 24,
                  marginTop: 20
                }]}>How To</Text>
                <Text style={[styles.instructionDescription, {
                  fontSize: isMobile ? 14 : 16,
                  marginTop: 20
                }]}>Request an exchange within 30 days of purchase for eligible items.</Text>
              </View>

              <View style={styles.instructionItem}>
                <Image
                  source={require('../assets/icons/access.svg')}
                  style={styles.instructionIcon}
                />
                <Text style={[styles.instructionTitle, {
                  fontSize: isMobile ? 20 : 24,
                  marginTop: 20
                }]}>Conditions Apply</Text>
                <Text style={[styles.instructionDescription, {
                  fontSize: isMobile ? 14 : 16,
                  marginTop: 20
                }]}>Items must be unused and in original packaging to qualify.</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.returnItemButton, {
              marginTop: isMobile ? 50 : 80
            }]}>
              <Text style={[styles.returnItemText, {
                fontSize: isMobile ? 20 : 24
              }]}>Return Item</Text>
              <Image
                source={require('../assets/icons/chevron-forward.svg')}
                style={styles.returnItemIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.returnRightSection, {
            flex: isMobile ? 1 : 0.4,
            paddingTop: isMobile ? 0 : 60
          }]}>
            <Text style={[styles.returnRightDescription, {
              fontSize: isMobile ? 16 : 19
            }]}>
              We understand that sometimes things don't work out. Our hassle-free returns and exchanges process ensures you can shop with confidence.
            </Text>

            <Image
              source={require('../assets/support/work.png')}
              style={[styles.workImage, {
                marginTop: isMobile ? 40 : 190,
                width: isMobile ? '100%' : '100%',
                maxWidth: isMobile ? 300 : 'auto'
              }]}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
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
        {/* WE ARE HERE TO HELP - END */}

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
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
        <View style={[styles.FAQView, {
          paddingHorizontal: responsivePadding.horizontal,
          paddingVertical: responsivePadding.vertical,
        }]}>
          <View style={{
            alignItems: 'center',
          }}>
            <Text style={{
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: isMobile ? 38 : isTablet ? 50 : 60,
              color: '#412023',
              textAlign: 'center'
            }}>FAQs</Text>
            <Text style={{
              fontSize: isMobile ? 16 : isTablet ? 17 : 18,
              fontFamily: FONT_FAMILIES.FUTURA_LIGHT,
              marginTop: isMobile ? 20 : 30,
              textAlign: 'center',
              maxWidth: isMobile ? '100%' : isTablet ? width * 0.7 : 800
            }}>Find answers to your questions about order tracking, returns, and exchanges right here.</Text>
          </View>

          <View style={{
            marginTop: isMobile ? 60 : isTablet ? 80 : 100
          }}>
            {faqData.map((item) => (
              <AnimatedFAQDropdown
                key={item.id}
                question={item.question}
                answer={item.answer}
                //@ts-ignore
                isExpanded={expandedItems[item.id]}
                onToggle={() => toggleExpansion(item.id)}
                qDex={item.id}
              />
            ))}
          </View>

          <View style={{ //FOOTER 
            alignItems: 'center',
            marginTop: isMobile ? 80 : isTablet ? 110 : 140
          }}>
            <Text style={{
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: isMobile ? 28 : isTablet ? 35 : 40,
              color: '#412023',
              textAlign: 'center'
            }}>Still have questions?</Text>
            <Text style={{
              fontSize: isMobile ? 16 : isTablet ? 18 : 20,
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              color: '#412023',
              marginTop: isMobile ? 20 : 30,
              textAlign: 'center'
            }}>We're here to help with any inquiries.</Text>

            <TouchableOpacity style={{
              paddingVertical: isMobile ? 10 : 12,
              paddingHorizontal: isMobile ? 20 : 24,
              borderWidth: 1,
              borderRadius: 13,
              borderColor: '#412023',
              marginTop: isMobile ? 25 : 30
            }}>
              <Text style={{
                fontFamily: FONT_FAMILIES.NUNITO_SANS,
                color: '#412023',
                fontSize: isMobile ? 15 : 16
              }}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>


        {/* CONTACT US */}
        {/* CONTACT US */}
        <View style={{
          flexDirection: isMobile ? 'column' : 'row',
          paddingHorizontal: responsivePadding.horizontal,
          paddingVertical: responsivePadding.vertical,
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'center',
        }}>
          {/* LEFT CONTENT */}
          <View style={{
            flex: isMobile ? 1 : 0.5,
            alignItems: 'flex-start',
          }}>
            <Text style={{
              fontSize: isMobile ? 14 : isTablet ? 15 : 17,
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              color: '#412023',
              height: 20
            }}>Support</Text>
            <Text style={{
              color: '#412023',
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: isMobile ? 38 : isTablet ? 50 : 60,
              marginTop: isMobile ? 25 : 30
            }}>Contact Us</Text>
            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              color: '#412023',
              marginTop: isMobile ? 15 : 20,
              fontSize: isMobile ? 15 : 16,
              maxWidth: isMobile ? '100%' : isTablet ? width * 0.7 : 800
            }}>We're here to assist you with any inquiries.</Text>

            {/* EMAIL SECTION */}
            <Image
              source={require('../assets/icons/mail.svg')}
              style={{
                height: isMobile ? 35 : 40,
                width: isMobile ? 35 : 40,
                tintColor: '#412023',
                marginTop: isMobile ? 60 : isTablet ? 80 : 100
              }}
              resizeMode="contain"
            />
            <Text style={{
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: isMobile ? 22 : isTablet ? 26 : 28,
              color: '#412023',
              marginTop: isMobile ? 15 : 18
            }}>Email</Text>
            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              fontSize: isMobile ? 15 : 17,
              marginTop: isMobile ? 12 : 15,
              color: '#412023'
            }}>Reach us via email</Text>
            <Text style={{
              textDecorationLine: "underline",
              fontSize: isMobile ? 15 : 17,
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              color: '#412023',
              marginTop: isMobile ? 12 : 15
            }}>support@beshas.com</Text>

            {/* PHONE SECTION */}
            <Image
              source={require('../assets/home/Contact/call.svg')}
              style={{
                height: isMobile ? 35 : 40,
                width: isMobile ? 35 : 40,
                tintColor: '#412023',
                marginTop: isMobile ? 60 : isTablet ? 80 : 100
              }}
              resizeMode="contain"
            />
            <Text style={{
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: isMobile ? 22 : isTablet ? 26 : 28,
              color: '#412023',
              marginTop: isMobile ? 15 : 18
            }}>Phone</Text>
            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              fontSize: isMobile ? 15 : 17,
              marginTop: isMobile ? 12 : 15,
              color: '#412023'
            }}>Call us anytime</Text>
            <Text style={{
              color: '#412023',
              textDecorationLine: 'underline',
              fontSize: isMobile ? 14 : 15,
              textAlign: 'center',
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              marginTop: isMobile ? 12 : 15
            }}>+1 (555) 123-4567</Text>

            {/* OFFICE SECTION */}
            <Image
              source={require('../assets/home/Contact/location.svg')}
              style={{
                height: isMobile ? 35 : 40,
                width: isMobile ? 35 : 40,
                tintColor: '#412023',
                marginTop: isMobile ? 60 : isTablet ? 80 : 100
              }}
              resizeMode="contain"
            />
            <Text style={{
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: isMobile ? 22 : isTablet ? 26 : 28,
              color: '#412023',
              marginTop: isMobile ? 15 : 18
            }}>Office</Text>
            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              fontSize: isMobile ? 15 : 16,
              marginTop: isMobile ? 12 : 15,
              color: '#412023',
              maxWidth: isMobile ? '100%' : 400
            }}>456 Example Ave, New York, NY 10001</Text>

            <TouchableOpacity style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: isMobile ? 12 : 15
            }}>
              <Text style={{
                fontFamily: FONT_FAMILIES.FUTURA_BOOK,
                fontSize: isMobile ? 15 : 17,
                color: '#412023'
              }}>Get Direction</Text>
              <Image
                source={require('../assets/icons/chevron-forward.svg')}
                style={{
                  tintColor: '#412023',
                  height: isMobile ? 14 : 15,
                  width: isMobile ? 14 : 15,
                  marginLeft: 7
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* RIGHT IMAGE - scene.png */}
          {!isMobile && (
            <View style={{
              flex: 0.4,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 200,
            }}>
              <Image
                source={require('../assets/support/scene.png')}
                style={{
                  maxWidth: 1400,
                  // width:1100,
                  height: undefined,
                  borderRadius: 26
                }}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <Footer />
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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

  // Header Styles
  headerContainer: {
    // flex: 1,
  },
  welcomeText: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },
  mainTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023'
  },
  subtitle: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },

  // Assist Section Styles
  assistContainer: {
  },
  assistDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    flexWrap: 'wrap',
  },
  infoContainer: {
    marginTop: 60,
  },
  infoItem: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  infoIcon: {
    marginBottom: 15,
  },
  infoTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  infoNote: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },

  // Track Order Styles
  trackOrderView: {
  },
  trackOrderHeader: {
    // flex: 1,
  },
  trackOrderTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023'
  },
  trackOrderDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023'
  },
  trackingMainContainer: {
    flex: 1,
  },
  formSection: {
    alignItems: 'flex-start'
  },
  trackLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },
  getInTouchTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    textAlign: 'center',
    color: '#412023',
  },
  getInTouchSubtitle: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },
  inputLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },
  textInput: {
    borderBottomWidth: 1,
    color: '#43282B',
    borderBottomColor: '#412023',
    height: 50,
    ...Platform.select({
      web: { outline: 'none' },
    }),
  },
  messageInput: {
    borderBottomWidth: 1,
    color: '#43282B',
    borderBottomColor: '#412023',
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 10,
    ...Platform.select({
      web: { outline: 'none' },
    }),
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
  submitButtonContainer: {
    marginTop: 20,
  },
  submitGradient: {
    borderRadius: 13,
    borderColor: '#43282B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
  trackingVisualSection: {
    flex: 1,
  },
  progressContainer: {
    flex: 1,
  },
  mapSection: {
    // flex: 1,
  },

  // Return Section Styles
  returnView: {
    justifyContent: 'space-between'
  },
  returnLeftSection: {
    flex: 1,
  },
  returnLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    height: 20
  },
  returnTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023',
    justifyContent: 'flex-start',
  },
  procedureIcon: {
    tintColor: '#43282B',
  },
  processTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023',
    justifyContent: 'flex-start',
  },
  processDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
  },
  instructionsContainer: {
    flex: 1,
  },
  instructionItem: {
    flex: 1,
  },
  instructionIcon: {
    tintColor: '#412023'
  },
  instructionTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    color: '#412023',
  },
  instructionDescription: {
    color: '#412023',
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    flexWrap: 'wrap',
    maxWidth: 200,
  },
  returnItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 160,
  },
  returnItemText: {
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
    color: '#412023',
  },
  returnItemIcon: {
    tintColor: '#412023',
    height: 18,
    width: 18,
    marginLeft: 7
  },
  returnRightSection: {
    flex: 1,
  },
  returnRightDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023',
    alignItems: 'flex-start',
  },
  workImage: {
    alignSelf: 'center',
  },

  // Help Section Styles
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

  // FAQ Section
  FAQView: {
    // Additional FAQ styles will go here when implemented
  },

  // Responsive styles for tracking components
  responsiveImage: {
    aspectRatio: 1312 / 632,
  },
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