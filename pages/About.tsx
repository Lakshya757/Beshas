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
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useScrollNavbar } from "../components/ScrollNavbar";
import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
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
    reviewText: "Whatever thou art, stay away Soon... I will be consumed... by them, by the Dark."
  },
]

export default function About() {
  const navigation: any = useNavigation();
  const currentScreen = useRoute().name;
  const { width, height } = useWindowDimensions();
  const [menSelected, setMenSelected] = useState(true);
  const { fontsLoaded } = useFonts();
  const scrollViewRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      if (scrollViewRef.current) {
        //@ts-ignore
        scrollViewRef.current.scrollTo({ y: 0, animated: false });

      }
    }, [])
  );

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Calculate navbar height
  const navbarHeight = isDesktop ? 80 : isMobile ? 60 : 70;

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
            paddingHorizontal: isMobile ? 15 : isTablet ? 50 : 70,
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
                height: isDesktop ? 100 : isTablet ? 50 : 25,
                marginHorizontal: isMobile ? 0 : isTablet ? 20 : 30,
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
            <View style={[styles.seachView, { left: isMobile ? 0 : isTablet ? 25 : 35 }]}>
              <Image
                source={require('../assets/icons/search.svg')}
                style={{
                  height: 20,
                }}
                resizeMode='contain'
              />
              <TextInput
                style={[styles.searchTextInput, { fontSize: isTablet ? 16 : 18 }]}
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
              <Image
                source={require('../assets/icons/chevron-down.svg')}
              />
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

    {/* NAVBAR END */}







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
            style={[
              styles.thumbImage,
              {
                width: isMobile ? 100 : isTablet ? 130 : 150,
                height: isMobile ? 67 : isTablet ? 87 : 100,
                transform: [{ translateX: isMobile ? -50 : isTablet ? -65 : -75 }],

              }
            ]}
          />

          <View style={[
            styles.heroTextContainer,
            {
              left: isMobile ? 20 : isTablet ? 60 : 120,
              width: isMobile ? width - 40 : isTablet ? width - 120 : 'auto',
            }
          ]}>
            <Text style={[
              styles.heroText,
              {
                fontSize: isMobile ? 28 : isTablet ? 48 : 72,
                width: isMobile ? width - 40 : isTablet ? width - 120 : 500,
              }
            ]}>
              Embrace Tradition with a Modern Twist
            </Text>
            <Text style={[
              styles.subHeroText,
              {
                fontSize: isMobile ? 18 : isTablet ? 22 : 24,
                lineHeight: isMobile ? 24 : isTablet ? 28 : 31,
                marginTop: isMobile ? 20 : 25,
              }
            ]}>
              Heritage reimagined{'\n'}From tradition, into tomorrow.
            </Text>
            <View style={{
              flexDirection: isMobile ? 'column' : 'row',
              marginTop: isMobile ? 25 : 30,
              alignItems: isMobile ? 'flex-start' : 'center'
            }}>
              <TouchableOpacity style={[
                styles.bannerButton,
                styles.bannerButtonPrimary,
                {
                  marginBottom: isMobile ? 15 : 0,
                  marginRight: isMobile ? 0 : 20,
                  paddingVertical: isMobile ? 10 : 8,
                  paddingHorizontal: isMobile ? 20 : 15,
                }
              ]}>
                <Text style={[
                  styles.bannerButtonText,
                  {
                    fontSize: isMobile ? 18 : 20,
                  }
                ]}>Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[
                styles.bannerButton,
                styles.bannerButtonSecondary,
                {
                  paddingVertical: isMobile ? 10 : 8,
                  paddingHorizontal: isMobile ? 20 : 15,
                }
              ]}>
                <Text style={[
                  styles.bannerButtonText,
                  {
                    fontSize: isMobile ? 18 : 20,
                  }
                ]}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Heritage Section - Fully Responsive */}
      <View style={[
        styles.heritageView,
        {
          flexDirection: isMobile ? 'column' : 'row',
          paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
          paddingTop: isMobile ? 50 : isTablet ? 70 : 100,
          paddingBottom: isMobile ? 60 : isTablet ? 80 : 140,
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: isMobile ? 'flex-start' : 'space-between'
        }
      ]}>
        <View style={[
          {
            width: isMobile ? '100%' : isTablet ? '55%' : '50%',
            marginBottom: isMobile ? 40 : 0,
          }
        ]}>
          <Text style={[
            styles.heritageLabel,
            {
              fontSize: isMobile ? 14 : isTablet ? 15 : 15,
              marginVertical: isMobile ? 12 : isTablet ? 15 : 20,
            }
          ]}>Heritage</Text>

          <Text style={[
            styles.heritageTitle,
            {
              fontSize: isMobile ? 28 : isTablet ? 38 : 52,
              width: isMobile ? '100%' : isTablet ? '100%' : 600,
              marginBottom: isMobile ? 18 : isTablet ? 22 : 25,
              lineHeight: isMobile ? 34 : isTablet ? 44 : 58,
            }
          ]}>Where Tradition Meets Modern Elegance</Text>

          <Text style={[
            styles.heritageDescription,
            {
              fontSize: isMobile ? 15 : isTablet ? 17 : 19,
              width: isMobile ? '100%' : isTablet ? '100%' : 620,
              marginBottom: isMobile ? 25 : isTablet ? 35 : 50,
              lineHeight: isMobile ? 22 : isTablet ? 25 : 28,
            }
          ]}>At BÉSHAs, we redefine traditional handloom fabrics with contemporary designs. Our pieces celebrate cultural heritage while appealing to the modern sensibility.</Text>

          <View style={[
            styles.heritageFeatures,
            {
              flexDirection: isMobile ? 'column' : 'row',
              marginBottom: isMobile ? 25 : isTablet ? 28 : 32,
            }
          ]}>
            <View style={[
              styles.featureItem,
              {
                marginBottom: isMobile ? 20 : 0,
                width: isMobile ? '100%' : isTablet ? '45%' : 280,
                marginRight: isMobile ? 0 : isTablet ? 20 : 50,
              }
            ]}>
              <Text style={[
                styles.featureTitle,
                {
                  fontSize: isMobile ? 18 : isTablet ? 20 : 24,
                  marginBottom: isMobile ? 8 : isTablet ? 10 : 13,
                }
              ]}>Timeless Craft</Text>
              <Text style={[
                styles.featureDescription,
                {
                  width: isMobile ? '100%' : isTablet ? '100%' : 280,
                  lineHeight: isMobile ? 20 : isTablet ? 21 : 22,
                  fontSize: isMobile ? 14 : 15,
                }
              ]}>Experience the art of weaving tradition into modern fashion.</Text>
            </View>

            <View style={[
              styles.featureItem,
              {
                width: isMobile ? '100%' : isTablet ? '45%' : 280,
              }
            ]}>
              <Text style={[
                styles.featureTitle,
                {
                  fontSize: isMobile ? 18 : isTablet ? 20 : 24,
                  marginBottom: isMobile ? 8 : isTablet ? 10 : 13,
                }
              ]}>Modern Silhouettes</Text>
              <Text style={[
                styles.featureDescription,
                {
                  width: isMobile ? '100%' : isTablet ? '100%' : 280,
                  lineHeight: isMobile ? 20 : isTablet ? 21 : 22,
                  fontSize: isMobile ? 14 : 15,
                }
              ]}>Embrace fluidity and express your unique style with our innovative designs.</Text>
            </View>
          </View>

          <View style={[
            styles.heritageButtons,
            {
              flexDirection: 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
            }
          ]}>
            <TouchableOpacity style={[
              styles.shopButton,
              {
                marginBottom: isMobile ? 15 : 0,
                paddingVertical: isMobile ? 10 : isTablet ? 8 : 7,
                paddingHorizontal: isMobile ? 18 : isTablet ? 16 : 14,
              }
            ]}>
              <Text style={[
                styles.shopButtonText,
                {
                  fontSize: isMobile ? 16 : isTablet ? 18 : 20,
                }
              ]}>Shop</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[
              styles.learnMoreButton,
              {
                marginLeft: isMobile ? 25 : isTablet ? 25 : 30,
              }
            ]}>
              <Text style={[
                styles.learnMoreButtonText,
                {
                  fontSize: isMobile ? 16 : isTablet ? 18 : 20,
                  paddingVertical: isMobile ? 10 : isTablet ? 8 : 7,
                  paddingHorizontal: isMobile ? 0 : 10,
                }
              ]}>Learn More</Text>
              <Image
                source={require('../assets/icons/chevron-forward.svg')}
                style={{
                  height: isMobile ? 11 : isTablet ? 14 : 16,
                  tintColor: '#412023'
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          width: isMobile ? '100%' : isTablet ? '45%' : '50%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Image
            source={require('../assets/Placeholder Image.png')}
            style={[
              styles.heritageImage,
              {
                width: isMobile ? Math.min(width - 40, 350) : isTablet ? 380 : 500,
                height: isMobile ? Math.min(width - 40, 350) : isTablet ? 380 : 500,
              }
            ]}
          />
        </View>
      </View>

      {/* TEAM VIEW - Fully Responsive */}
      <View style={[
        styles.teamView,
        {
          paddingTop: isMobile ? 60 : isTablet ? 80 : 90,
          paddingBottom: isMobile ? 25 : isTablet ? 40 : 50,
          paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 0,
        }
      ]}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[
            styles.heritageLabel,
            {
              fontSize: isMobile ? 15 : isTablet ? 16 : 17,
              marginVertical: isMobile ? 12 : isTablet ? 15 : 20,
              color: '#543236'
            }
          ]}>Together</Text>
          <Text style={{
            fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
            fontSize: isMobile ? 28 : isTablet ? 35 : 40,
            color: '#543236',
            marginBottom: isMobile ? 10 : isTablet ? 15 : 0,
          }}>Our Team</Text>
          <Text style={[
            styles.heritageLabel,
            {
              fontSize: isMobile ? 15 : isTablet ? 16 : 17,
              marginVertical: isMobile ? 12 : isTablet ? 15 : 25,
              textAlign: 'center',
              maxWidth: isMobile ? width - 40 : 600,
            }
          ]}>Meet the passionate individuals behind BÉSHAs.</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: isMobile ? 20 : isTablet ? 30 : 40,
        }}>
          {THE_TEAM.map((person, index) => (
            <View key={index} style={{
              alignItems: 'center',
              marginHorizontal: isMobile ? 15 : isTablet ? 30 : 40,
              marginVertical: isMobile ? 25 : isTablet ? 30 : 40,
              width: isMobile ? Math.min((width - 70) / 2, 150) : isTablet ? 200 : 350,
            }}>
              <Image
                source={require('../assets/about/Placeholder-Square.png')}
                resizeMode="contain"
                style={{
                  width: isMobile ? Math.min((width - 70) / 2, 150) : isTablet ? 200 : 250,
                  height: isMobile ? Math.min((width - 70) / 2, 150) : isTablet ? 200 : 250,
                }}
              />
              <Text style={{
                marginTop: isMobile ? 15 : isTablet ? 20 : 28,
                fontSize: isMobile ? 16 : isTablet ? 18 : 22,
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                color: '#543236',
                textAlign: 'center',
              }}>{person.name}</Text>
              <Text style={{
                marginTop: isMobile ? 4 : isTablet ? 5 : 7,
                fontSize: isMobile ? 13 : isTablet ? 15 : 17,
                fontFamily: FONT_FAMILIES.FUTURA_BOOK,
                color: '#543236',
                fontWeight: "100",
                textAlign: 'center',
              }}>{person.role}</Text>
              <Text style={{
                marginTop: isMobile ? 12 : isTablet ? 15 : 20,
                fontSize: isMobile ? 12 : isTablet ? 13 : 15,
                fontFamily: FONT_FAMILIES.FUTURA_BOOK,
                color: '#543236',
                fontWeight: "100",
                flexWrap: 'wrap',
                width: isMobile ? Math.min((width - 70) / 2, 150) : isTablet ? 200 : 280,
                textAlign: 'center',
                lineHeight: isMobile ? 16 : isTablet ? 18 : 20,
              }}>{person.note}</Text>

              {/* LINKS */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: isMobile ? 15 : isTablet ? 20 : 25
              }}>
                <TouchableOpacity
                  style={{
                    marginHorizontal: isMobile ? 6 : isTablet ? 8 : 10,
                    outlineWidth: 0
                  }}
                  onPress={() => { handleLink(person.links.linkedin) }}
                >
                  <Image
                    source={require('../assets/about/linkedin.svg')}
                    style={{
                      width: isMobile ? 20 : isTablet ? 22 : 24,
                      height: isMobile ? 20 : isTablet ? 22 : 24,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginHorizontal: isMobile ? 6 : isTablet ? 8 : 10,
                    outlineWidth: 0
                  }}
                  onPress={() => { handleLink(person.links.twitter) }}
                >
                  <Image
                    source={require('../assets/about/twitter.svg')}
                    style={{
                      width: isMobile ? 20 : isTablet ? 22 : 24,
                      height: isMobile ? 20 : isTablet ? 22 : 24,
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginHorizontal: isMobile ? 6 : isTablet ? 8 : 10,
                    outlineWidth: 0
                  }}
                  onPress={() => { handleLink(person.links.dribble) }}
                >
                  <Image
                    source={require('../assets/about/dribble.svg')}
                    style={{
                      width: isMobile ? 20 : isTablet ? 22 : 24,
                      height: isMobile ? 20 : isTablet ? 22 : 24,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* FOOTING - Responsive */}
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? 40 : isTablet ? 60 : 80,
          paddingHorizontal: isMobile ? 20 : 0,
        }}>
          <Text style={{
            fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
            fontSize: isMobile ? 24 : isTablet ? 28 : 34,
            color: '#543236',
            textAlign: 'center',
          }}>We are hiring</Text>
          <Text style={{
            fontFamily: FONT_FAMILIES.FUTURA_BOOK,
            color: '#543236',
            marginTop: isMobile ? 15 : isTablet ? 20 : 30,
            fontSize: isMobile ? 16 : isTablet ? 17 : 19,
            textAlign: 'center',
          }}>Join our creative team and make an impact.</Text>
          <TouchableOpacity style={{
            outlineWidth: 0,
            borderColor: '#543236',
            paddingVertical: isMobile ? 10 : 8,
            borderWidth: 1,
            borderRadius: 14,
            paddingHorizontal: isMobile ? 15 : 10,
            marginTop: isMobile ? 20 : isTablet ? 25 : 30
          }}>
            <Text style={{
              fontFamily: FONT_FAMILIES.NUNITO_SANS,
              fontSize: isMobile ? 15 : 16,
            }}>Open Positions</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Custom Lines - Responsive */}
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

      {/* Reviews Carousel - Pass responsive props */}
      <ReviewsCarousel
        reviews={REVIEWS}
        isMobile={isMobile}
        isTablet={isTablet}
        width={width}
      />

      <View style={{ alignItems: 'center' }}>
        <CustomLine
          length={width}
          color="#E85A4F"
          thickness={isMobile ? 3 : 4}
          style={{ marginBottom: isMobile ? 7 : 9.5 }}
        />
        <CustomLine
          length={width}
          color="#E85A4F"
          thickness={isMobile ? 3 : 4}
        />
      </View>

      {/* DISCOVER SECTION - Fully Responsive */}
      <View
        style={[
          styles.discover,
          {
            flexDirection: isMobile ? 'column' : 'row',
            paddingHorizontal: isMobile ? 20 : isTablet ? 40 : 80,
            // paddingBottom: isMobile ? 40 : isTablet ? 60 : 0,
            paddingVertical: 110,
            paddingBottom: isMobile ? -60 : 0

          },
        ]}
      >
        <View style={{
          justifyContent: 'center',
          alignItems: isMobile ? 'center' : 'flex-start',
          width: isMobile ? '100%' : isTablet ? '55%' : '50%',
          marginBottom: isMobile ? 30 : 0,
        }}>
          <Text
            style={{
              fontSize: isMobile ? 24 : isTablet ? 42 : 64,
              flexWrap: 'wrap',
              width: isMobile ? '100%' : isTablet ? '100%' : 620,
              textAlign: isMobile ? 'center' : 'left',
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              color: '#43282b',
              lineHeight: isMobile ? 30 : isTablet ? 48 : 70,
              marginBottom: isMobile ? 15 : isTablet ? 20 : 0,
            }}
          >
            Discover Our Unique Collection
          </Text>
          <Text
            style={{
              fontSize: isMobile ? 15 : isTablet ? 18 : 23,
              flexWrap: 'wrap',
              width: isMobile ? '100%' : isTablet ? '100%' : 800,
              marginTop: isMobile ? 15 : isTablet ? 20 : 25,
              textAlign: isMobile ? 'center' : 'left',
              color: '#43282b',
              lineHeight: isMobile ? 22 : isTablet ? 25 : 28,
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
            }}
          >
            Explore our handcrafted designs that blend tradition with modernity for the GenZ fashionista.
          </Text>
          <View
            style={{
              marginTop: isMobile ? 25 : 30,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-start',
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 12,
                paddingHorizontal: isMobile ? 20 : 15,
                paddingVertical: isMobile ? 12 : 9,
                borderWidth: 1,
                borderColor: '#412023',
                marginBottom: isMobile ? 15 : 0,
                marginRight: isMobile ? 0 : 14,
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: isMobile ? 120 : 'auto',
              }}
            >
              <Text style={{
                color: '#0C0B04',
                fontSize: isMobile ? 15 : 16,
                fontFamily: FONT_FAMILIES.NUNITO_SANS,
              }}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 12,
                paddingHorizontal: isMobile ? 20 : 15,
                paddingVertical: isMobile ? 12 : 9,
                borderWidth: 0.4,
                borderColor: 'rgba(12,11,4,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: isMobile ? 120 : 'auto',
              }}
            >
              <Text style={{
                color: '#0C0B04',
                fontSize: isMobile ? 15 : 16,
                fontFamily: FONT_FAMILIES.NUNITO_SANS,
              }}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          justifyContent: 'center', marginTop: isMobile ? 0 : 0
        }}>
          <Image
            source={require('../assets/home/CTA/Placeholder Image.png')}
            style={{
              resizeMode: 'contain',
              width: isMobile ? 365 : isTablet ? 450 : 600,
              marginBottom: isMobile ? 0 : 120
              // height: isMobile ? 250 : isTablet ? 400 : 550,
            }}
          />
        </View>
      </View>

      {/* FOOTER - Responsive */}
      {/* @ts-ignore */}
      <Footer />
    </Animated.ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  teamView: {
    backgroundColor: '#FCF4E3',
    alignItems: 'center',
  },
  heritageView: {
    backgroundColor: '#FCF4E3',
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
  heritageFeatures: {},
  featureItem: {
    justifyContent: 'flex-start'
  },
  featureTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
    color: '#412023'
  },
  featureDescription: {
    flexWrap: 'wrap',
    color: '#412023',
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
  },
  heritageButtons: {},
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FCF4E3',
  },
  mainBody: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#2C3540',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  logo: {},
  seachView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextInput: {
    paddingHorizontal: 7,
    color: 'white',
    outlineWidth: 0,
  },
  navbarRightButtonsView: {
    flexDirection: 'row',
  },
  navbarRightButton: {
    paddingHorizontal: 15,
  },
  nrbText: {
    color: 'white',
    paddingHorizontal: 10,
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
  },
  account: {
    flexDirection: 'row',
    marginLeft: 18,
  },
  accountButtonsText: {
    color: 'white',
    paddingHorizontal: 15,
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
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
    resizeMode: 'contain',
    alignSelf: 'center',
    left: '50%',

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
    textAlign: 'left',
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
  },
  bannerButton: {
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerButtonPrimary: {
    borderWidth: 1,
    borderColor: 'white',
  },
  bannerButtonSecondary: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bannerButtonText: {
    color: 'white',
    fontWeight: '400',
    fontFamily: FONT_FAMILIES.NUNITO_SANS
  },
});