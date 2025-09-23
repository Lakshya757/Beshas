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
  Animated,
  Linking,
  Alert
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useScrollNavbar } from "../components/ScrollNavbar";
import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
import { Ionicons } from "@expo/vector-icons";
import ReviewsCarousel from "../components/ReviewsCarousel";
import Footer from "../components/Footer";

const THE_TEAM = [
  {
    name: "Aditi Sharma",
    role: "Creative Director",
    note: "Aditi blends tradition with modern design to create unique fashion pieces.",
    links: {
      linkedin: "https://www.youtube.com/@Wendigoon",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "Ravi Kumar",
    role: "Marketing Manager",
    note: "Ravi connects our brand with the vibrant GenZ audience.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "Priya Das",
    role: "Design Lead",
    note: "Priya crafts stunning silhouettes that celebrate handloom heritage.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "Sanjay Gupta",
    role: "Production Head",
    note: "Sanjay ensures quality and sustainability in every piece we create.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "Neha Verma",
    role: "Social Media",
    note: "Neha engages our community and shares our story online.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "Karan Singh",
    role: "Sales Associate",
    note: "Karan provides exceptional service to our valued customers.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "Anita Roy",
    role: "Finance Officer",
    note: "Anita manages our finances to ensure sustainable growth.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
  {
    name: "We Are Hiring",
    role: "Join Us",
    note: "Explore exciting career opportunities at BÉSHAs and be part of our journey.",
    links: {
      linkedin: "",
      twitter: "",
      dribble: ""
    }
  },
]

const REVIEWS = [
  {
    author: "Heide Knight",
    autherPfp: "https://pm1.aminoapps.com/6339/75a50dd413eaca6bf9541522f9fed879eb5f472a_hq.jpg",
    authorRole: "Protector of the Tower of Flame",
    reviewText: "BÉSHAs has transformed my wardrobe with their stunning blend of tradition and modernity. I love how each piece tells a story while fitting perfectly into my lifestyle.",
  },
  {
    author: "Artorias",
    autherPfp: "https://www.creativeuncut.com/gallery-18/art/ds-key-visual.jpg",
    authorRole: "The Abysswalker",
    reviewText: "Whatever thou art, stay away! Soon... I will be consumed... by them, by the Dark.    Thou art strong human, surely thine kind are more than pure Dark.     I beg of thee, the spread of the Abyss... must be stopped.    Ah, Sif! There you are! All of you... forgive me... for I have availed you nothing."
  },
]

export default function About() {
  const navigation: any = useNavigation();
  const { width, height } = useWindowDimensions();
  const [menSelected, setMenSelected] = useState(true);
  const { fontsLoaded } = useFonts();
  const scrollViewRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        //@ts-ignore
        // scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Calculate navbar height
  const navbarHeight = isDesktop ? 80 : 60;

  // Add the scroll navbar hook
  const { handleScroll, navbarTranslateY, isNavbarVisible } = useScrollNavbar(navbarHeight);

  // Calculate banner height to fill viewport minus navbar
  const bannerHeight = height - navbarHeight;



  const handleLink = async (url: any) => {

    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };





  if (!fontsLoaded) { return null };

  return (<View style={styles.container}>
    {/* ANIMATED NAVBAR - Fixed Position */}
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
              <Text style={[styles.nrbText, { fontSize: isTablet ? 16 : 19 }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('About')}
              style={styles.navbarRightButton}
            >
              <Text style={[styles.nrbText, { fontSize: isTablet ? 16 : 19 }]}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navbarRightButton}>
              <Text style={[styles.nrbText, { fontSize: isTablet ? 16 : 19 }]}>Collections</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navbarRightButton}
              onPress={() => navigation.navigate('Support')}
            >
              <Text style={[styles.nrbText, { fontSize: isTablet ? 16 : 19 }]}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.nrbText, { fontSize: isTablet ? 16 : 19 }]}>Shop Now</Text>
              <Ionicons name="chevron-down-outline" color={'white'} size={20} />
            </TouchableOpacity>
            <View style={styles.account}>
              <TouchableOpacity>
                <Text style={[styles.accountButtonsText, { fontSize: isTablet ? 16 : 19 }]}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.accountButtonsText, { fontSize: isTablet ? 16 : 19 }]}>Shop</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Animated.View>

    {/* SCROLLABLE CONTENT */}
    <Animated.ScrollView
      ref={scrollViewRef}
      style={[styles.mainBody, { paddingTop: navbarHeight }]}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {/* BANNER SECTION */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/about/banner.svg')}
          style={[
            styles.bannerImage,
            {
              width: width,
              height: bannerHeight,
            }
          ]}
          resizeMode="cover"
        />

        {/* TINT OVERLAY */}
        <View
          style={[
            styles.tintOverlay,
            {
              width: width,
              height: bannerHeight,
            }
          ]}
        />

        {/* BANNER CONTENT */}
        <View style={[styles.bannerContent, { height: bannerHeight }]}>
          <View style={styles.linesContainer}>
            <CustomLine color="#FBF8F4" length={width} />
            <CustomLine color="#FBF8F4" length={width} style={{ marginTop: 10 }} />
          </View>

          <Image
            source={require('../assets/about/thumb.png')}
            style={styles.thumbImage}
          />

          <View style={[
            styles.heroTextContainer,
            {
              left: isMobile ? 30 : 120,
              width: isMobile ? width - 60 : 'auto',
            }
          ]}>
            <Text style={[
              styles.heroText,
              {
                fontSize: isMobile ? 36 : isTablet ? 56 : 72,
                width: isMobile ? width - 60 : 500,
              }
            ]}>
              Embrace Tradition with a Modern Twist
            </Text>
            <Text style={styles.subHeroText}>
              Heritage reimagined{'\n'}From tradition, into tomorrow.
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: 'white',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  fontWeight: '400',
                  fontFamily: FONT_FAMILIES.NUNITO_SANS
                }}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 20
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 20,
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  fontWeight: '400',
                  fontFamily: FONT_FAMILIES.NUNITO_SANS
                }}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Heritage Section - Now Responsive */}
      <View style={[
        styles.heritageView,
        {
          flexDirection: isMobile ? 'column' : 'row',
          paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 0,
          paddingTop: isMobile ? 60 : isTablet ? 80 : 100,
          paddingBottom: isMobile ? 80 : isTablet ? 100 : 140,
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: isMobile ? 'flex-start' : 'space-around'
        }
      ]}>
        <View style={[
          {
            width: isMobile ? '100%' : isTablet ? '55%' : 'auto',
            marginBottom: isMobile ? 40 : 0,
          }
        ]}>
          <Text style={[
            styles.heritageLabel,
            {
              fontSize: isMobile ? 14 : 15,
              marginVertical: isMobile ? 15 : 20,
            }
          ]}>Heritage</Text>

          <Text style={[
            styles.heritageTitle,
            {
              fontSize: isMobile ? 32 : isTablet ? 42 : 52,
              width: isMobile ? '100%' : isTablet ? '100%' : 600,
              marginBottom: isMobile ? 20 : 25,
            }
          ]}>Where Tradition Meets Modern Elegance</Text>

          <Text style={[
            styles.heritageDescription,
            {
              fontSize: isMobile ? 16 : 19,
              width: isMobile ? '100%' : isTablet ? '100%' : 620,
              marginBottom: isMobile ? 30 : 50,
              lineHeight: isMobile ? 24 : 28,
            }
          ]}>At BÉSHAs, we redefine traditional handloom fabrics with contemporary designs. Our pieces celebrate cultural heritage while appealing to the modern sensibility.</Text>

          <View style={[
            styles.heritageFeatures,
            {
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: isMobile ? 30 : 32,
            }
          ]}>
            <View style={[
              styles.featureItem,
              {
                marginBottom: isMobile ? 25 : 0,
                width: isMobile ? '100%' : 280,
              }
            ]}>
              <Text style={[
                styles.featureTitle,
                {
                  fontSize: isMobile ? 20 : 24,
                  marginBottom: isMobile ? 10 : 13,
                }
              ]}>Timeless Craft</Text>
              <Text style={[
                styles.featureDescription,
                {
                  width: isMobile ? '100%' : 280,
                  lineHeight: isMobile ? 20 : 22,
                }
              ]}>Experience the art of weaving tradition into modern fashion.</Text>
            </View>

            <View style={[
              styles.featureItem,
              {
                marginLeft: isMobile ? 0 : 50,
                width: isMobile ? '100%' : 280,
              }
            ]}>
              <Text style={[
                styles.featureTitle,
                {
                  fontSize: isMobile ? 20 : 24,
                  marginBottom: isMobile ? 10 : 13,
                }
              ]}>Modern Silhouettes</Text>
              <Text style={[
                styles.featureDescription,
                {
                  width: isMobile ? '100%' : 280,
                  lineHeight: isMobile ? 20 : 22,
                }
              ]}>Embrace fluidity and express your unique style with our innovative designs.</Text>
            </View>
          </View>

          <View style={[
            styles.heritageButtons,
            {
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
            }
          ]}>
            <TouchableOpacity style={[
              styles.shopButton,
              {
                marginBottom: isMobile ? 15 : 0,
                paddingVertical: isMobile ? 10 : 7,
                paddingHorizontal: isMobile ? 20 : 14,
              }
            ]}>
              <Text style={[
                styles.shopButtonText,
                {
                  fontSize: isMobile ? 18 : 20,
                }
              ]}>Shop</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[
              styles.learnMoreButton,
              {
                marginLeft: isMobile ? 0 : 30,
              }
            ]}>
              <Text style={[
                styles.learnMoreButtonText,
                {
                  fontSize: isMobile ? 18 : 20,
                  paddingVertical: isMobile ? 10 : 7,
                  paddingHorizontal: isMobile ? 0 : 10,
                }
              ]}>Learn More</Text>
              <Ionicons name="chevron-forward-outline" size={isMobile ? 18 : 19} color={'#412023'} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          width: isMobile ? '100%' : isTablet ? '45%' : 'auto',
          alignItems: 'center',
          justifyContent: 'center',
        }
        }>
          <Image
            source={require('../assets/Placeholder Image.png')}
            style={[
              styles.heritageImage,
              {
                width: isMobile ? Math.min(width - 40, 400) : isTablet ? 450 : 600,
                height: isMobile ? Math.min(width - 40, 400) : isTablet ? 450 : 600,
                top: isMobile ? 0 : '50%',
              }
            ]}
          />
        </View>
      </View>


      {/* TEAM VIEW */}
      <View style={styles.teamView}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>{/* HEADING*/}
          <Text style={[
            styles.heritageLabel,
            {
              fontSize: isMobile ? 16 : 17,
              marginVertical: isMobile ? 15 : 20,
              color: '#543236'
            }
          ]}>Together</Text>
          <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM, fontSize: 40, color: '#543236' }}>Our Team</Text>
          <Text style={[
            styles.heritageLabel,
            {
              fontSize: isMobile ? 16 : 17,
              marginVertical: isMobile ? 15 : 25,
            }
          ]}>Meet the passionate individuals behind BÉSHAs.</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>{/* PEOPLE */}
          {THE_TEAM.map((person, index) => (
            <View style={{ alignItems: 'center', marginHorizontal: 60, marginVertical: 40 }}>
              <Image
                source={require('../assets/about/Placeholder-Square.png')}
                resizeMode="contain"
                style={{
                  width: 300
                }}
              />
              <Text style={{
                marginTop: 28,
                fontSize: 22,
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                color: '#543236'
              }}>{person.name}</Text>
              <Text style={{
                marginTop: 7,
                fontSize: 17,
                fontFamily: FONT_FAMILIES.FUTURA_BOOK,
                color: '#543236',
                fontWeight: "100"
              }}>{person.role}</Text>
              <Text style={{
                marginTop: 20,
                fontSize: 15,
                fontFamily: FONT_FAMILIES.FUTURA_BOOK,
                color: '#543236',
                fontWeight: "100",
                flexWrap: 'wrap',
                width: 330,
                textAlign: 'center'
              }}>{person.note}</Text>

              {/* LINKS */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                <TouchableOpacity //LINKEDIN 
                  style={{ marginHorizontal: 10, outlineWidth: 0 }}
                  onPress={() => { handleLink(person.links.linkedin) }}
                >
                  <Image
                    source={require('../assets/about/linkedin.svg')}
                  />
                </TouchableOpacity>

                <TouchableOpacity //TWITTER
                  style={{ marginHorizontal: 10, outlineWidth: 0 }}
                  onPress={() => { handleLink(person.links.twitter) }}
                >
                  <Image
                    source={require('../assets/about/twitter.svg')}
                  />
                </TouchableOpacity>


                <TouchableOpacity //DRIBBLE
                  style={{ marginHorizontal: 10, outlineWidth: 0 }}
                  onPress={() => { handleLink(person.links.dribble) }}
                >
                  <Image
                    source={require('../assets/about/dribble.svg')}
                  />
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

        {/* FOOTING */}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
          <Text style={{
            fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
            fontSize: 34,
            color: '#543236'
          }}>We are hiring</Text>
          <Text style={{
            fontFamily: FONT_FAMILIES.FUTURA_BOOK,
            color: '#543236',
            marginTop: 30,
            fontSize: 19
          }}>Join our creative team and make an impact.</Text>
          <TouchableOpacity style={{
            outlineWidth: 0,
            borderColor: '#543236',
            paddingVertical: 8,
            borderWidth: 1,
            borderRadius: 14,
            paddingHorizontal: 10,
            marginTop: 30
          }}>
            <Text style={{
              fontFamily: FONT_FAMILIES.NUNITO_SANS
            }}>Open Positions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <CustomLine
          length={width}
          color="#E85A4F"
          thickness={4}
          style={{ marginTop: isMobile ? 40 : 140, marginBottom: 9.5 }}
        />
        <CustomLine
          length={width}
          color="#E85A4F"
          thickness={4}
        />
      </View>
      <ReviewsCarousel reviews={REVIEWS} />
      <View style={{ alignItems: 'center' }}>
        <CustomLine
          length={width}
          color="#E85A4F"
          thickness={4}
          style={{ marginTop: isMobile ? 0 : 0, marginBottom: 9.5 }}
        />
        <CustomLine
          length={width}
          color="#E85A4F"
          thickness={4}
        />
      </View>


      {/* DICOVER */}
      <View
        style={[
          styles.discover,
          {
            flexDirection: isMobile ? 'column' : 'row',
            marginTop: isMobile ? 45 : 90,
            paddingHorizontal: isMobile ? 20 : 0,
          },
        ]}
      >
        <View style={{ justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start' }}>
          <Text
            style={{
              fontSize: isMobile ? 28 : 64,
              flexWrap: 'wrap',
              width: isMobile ? width - 40 : 620,
              textAlign: isMobile ? 'center' : 'left',
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              color: '#43282b',
            }}
          >
            Discover Our Unique Colletion
          </Text>
          <Text
            style={{
              fontSize: isMobile ? 16 : 23,
              flexWrap: 'wrap',
              width: isMobile ? width - 40 : 800,
              marginTop: 25,
              textAlign: isMobile ? 'center' : 'left',
              color: '#43282b',
            }}
          >
            Explore our handcrafted designs that blend tradition with modernity for the GenZ fashionista.
          </Text>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 9,
                borderWidth:1,
                borderColor: '#412023',
                margin: 5,
                alignItems:'center',
                justifyContent:'center'

              }}
            >
              <Text style={{ color: '#0C0B04', fontSize: 16 }}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 12,
                paddingHorizontal: 15,
                paddingVertical: 9,
                borderWidth: 0.4,
                borderColor: 'rgba(12,11,4,0.15)',//15
                margin: 5,
                alignItems:'center',
                justifyContent:'center',
                marginHorizontal:14
              }}
            >
              <Text style={{ color: '#0C0B04', fontSize: 16 }}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: 'center', marginTop: isMobile ? 30 : 0 }}>
          <Image
            source={require('../assets/home/CTA/Placeholder Image.png')}
            style={{
              height: isMobile ? 300 : 550,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>

      {/* FOOTER */}
      <Footer/>
    </Animated.ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  teamView: {
    paddingTop: 90,
    backgroundColor: '#FCF4E3',
    alignItems: 'center',
    paddingBottom: 120
  },
  heritageView: {
    backgroundColor: '#FCF4E3',
    // Responsive styles handled inline
  },
  heritageLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    color: '#412023'
  },
  heritageTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    flexWrap: 'wrap',
    color: '#412023'
  },
  heritageDescription: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    flexWrap: 'wrap',
    color: '#412023'
  },
  heritageFeatures: {
    // Responsive styles handled inline
  },
  featureItem: {
    justifyContent: 'flex-start'
  },
  featureTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
    color: '#412023'
  },
  featureDescription: {
    flexWrap: 'wrap',
    color: '#412023'
  },
  heritageButtons: {
    // Responsive styles handled inline
  },
  shopButton: {
    borderWidth: 1,
    borderColor: '#43282B',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shopButtonText: {
    color: '#412023',
    fontWeight: '400',
    fontFamily: FONT_FAMILIES.NUNITO_SANS
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  learnMoreButtonText: {
    color: '#412023',
    fontWeight: '400',
    fontFamily: FONT_FAMILIES.NUNITO_SANS
  },
  heritageImage: {
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: '#FCF4E3',
    flex: 1,
  },
  discover: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  mainBody: {
    flex: 1,
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
  seachView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 35,
  },
  searchTextInput: {
    paddingHorizontal: 7,
    fontSize: 18,
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
  bannerContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  bannerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  tintOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bannerContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  linesContainer: {
    position: 'absolute',
    top: 24,
    alignItems: 'center',
  },
  thumbImage: {
    position: 'absolute',
    top: 72,
    width: 150,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    left: '50%',
    transform: [{ translateX: -75 }], // Half of the width to center it
  },
  heroTextContainer: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -120 }],
    alignItems: 'flex-start',
  },
  heroText: {
    color: 'white',
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    flexWrap: 'wrap',
    textAlign: 'left',
    marginBottom: 8,
  },
  subHeroText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'left',
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, // You can change this to a different font if needed
    lineHeight: 31,
    marginTop: 25
  },
});