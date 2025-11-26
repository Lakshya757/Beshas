import React, { useState, useRef, useCallback } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from "@react-navigation/native";


import CustomLine from '../components/CustomLine';
import Footer from '../components/Footer';
import { useFonts, FONT_FAMILIES } from '../components/Fonts';
import { useScrollNavbar } from '../components/ScrollNavbar';
import NavBar from '../components/Navbar';

const ROOTS_IMAGE_ASPECT_RATIO = 16 / 9;

export default function Home() {
  const navigation: any = useNavigation();
  const { width } = useWindowDimensions();
  const [menSelected, setMenSelected] = useState(true);
  const { fontsLoaded } = useFonts();

  const scrollY = useRef(new Animated.Value(0)).current;
  const rootsSectionRef = useRef(null);
  const [rootsSectionY, setRootsSectionY] = useState(0);

  const handleScrollWithAnimation = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        // Call your existing handleScroll for navbar
        //@ts-ignore
        handleScroll(event);
      }
    }
  );

  const maskHeight = scrollY.interpolate({
    inputRange: [
      rootsSectionY - 1800,  // CHANGED: Start animation earlier (was -500)
      rootsSectionY - 200,  // CHANGED: Begin transition sooner (was rootsSectionY)
      rootsSectionY + 600,  // CHANGED: Faster animation (was +500)
      rootsSectionY + 600,  // CHANGED: End earlier (was +1000)
    ],
    outputRange: ['100%', '100%', '0%', '0%'],
    extrapolate: 'clamp',
  });


  const maskedOpacity = scrollY.interpolate({
    inputRange: [
      rootsSectionY - 1000,  // CHANGED: Start earlier (was -500)
      rootsSectionY - 0,  // CHANGED: Begin fade sooner (was rootsSectionY)
      rootsSectionY + 200,  // CHANGED: Faster fade (was +500)
    ],
    outputRange: [0.52, 0.52, 0],
    extrapolate: 'clamp',
  });

  const completeOpacity = scrollY.interpolate({
    inputRange: [
      rootsSectionY - 700,  // CHANGED: Start revealing earlier (was rootsSectionY)
      rootsSectionY - 200,  // CHANGED: Faster reveal (was +500)
      rootsSectionY + 20,  // CHANGED: Complete earlier (was +1000)
    ],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });

  const onRootsSectionLayout = (event: any) => {
    const { y } = event.nativeEvent.layout;
    setRootsSectionY(y);
  };



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

  const navbarHeight = isDesktop ? 80 : 60;
  const { handleScroll, navbarTranslateY, isNavbarVisible } = useScrollNavbar(navbarHeight);
  if (!fontsLoaded) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <NavBar
        userLoggedIn={true}
        handleScroll={handleScroll}
        navbarTranslateY={navbarTranslateY}
        navbarHeight={navbarHeight}
      />
      <Animated.ScrollView
        ref={scrollViewRef}
        style={[styles.mainBody, { paddingTop: navbarHeight }]}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScrollWithAnimation}  // Use the new combined handler
        scrollEventThrottle={16}
      >
        {/* HERO SECTION */}
        <View style={styles.heroView}>
          <CustomLine
            length={width}
            color="#E85A4F"
            style={{ marginTop: 20, marginBottom: 6.5 }}
          />
          <CustomLine length={width} color="#E85A4F" />
          <Image
            source={require('../assets/home/Header/logo.svg')}
            style={{
              marginTop: 13,
              height: isMobile ? 50 : 75,
              width: isMobile ? 100 : 150,
            }}
          />

          {/* Hero Nav Links */}
          <View
            style={[
              styles.heroNavLinksView,
              {
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
              },
            ]}
          >
            {['Padma', 'Fall Collection', 'New Ins'].map((label, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.heroNavLinkButton,
                  { marginVertical: isMobile ? 5 : 0 },
                ]}
              >
                <Text
                  style={[
                    styles.heroNavLinkButtonText,
                    { fontSize: isMobile ? 18 : 22 },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[
                styles.heroNavLinkButton,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: isMobile ? 5 : 0,
                },
              ]}
            >
              <Text
                style={[
                  styles.heroNavLinkButtonText,
                  { fontSize: isMobile ? 18 : 22 },
                ]}
              >
                Shop Now
              </Text>
              <Image
                source={require('../assets/icons/chevron-down.svg')}
                style={{
                  tintColor: '#412023',
                  left: 8, top: 2,
                  height: 18,
                  width: 18
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

          {/* Hero Image + Overlay */}
          <View
            style={{
              marginTop: isMobile ? 20 : 30,
              width: '100%',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Image
              style={[
                styles.responsiveImage,
                {
                  width: isMobile ? width - 40 : width - 195,
                  borderRadius: isMobile ? 12 : 18,
                },
              ]}
              resizeMode="cover"
              source={require('../assets/home/Header/Placeholder Image.png')}
            />
            <View
              style={{
                position: 'absolute',
                top: '50%',
                right: isMobile ? 20 : 240,
                left: isMobile ? 20 : 'auto',
                transform: [{ translateY: isMobile ? -60 : -25 }],
                alignItems: isMobile ? 'center' : 'flex-start',
                width: isMobile ? width - 80 : 'auto',
              }}
            >
              <Text
                style={{
                  fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                  color: '#543236',
                  fontSize: isMobile ? 24 : 50,
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                Everyday Luxury
              </Text>
              <Text
                style={{
                  color: '#543236',
                  fontSize: isMobile ? 14 : 24,
                  fontWeight: '400',
                  textAlign: isMobile ? 'center' : 'left',
                  marginTop: isMobile ? 5 : 0,
                }}
              >
                Your everyday, in its best Bèsha
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: isMobile ? 20 : 45,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {['Shop', 'Learn More'].map((txt, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{ marginHorizontal: isMobile ? 5 : 0, marginVertical: isMobile ? 5 : 0 }}
                  >
                    <Text
                      style={{
                        fontSize: isMobile ? 16 : 20,
                        paddingHorizontal: 10,
                      }}
                    >
                      {txt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
        {/* ROOTS SECTION */}
        <View
          ref={rootsSectionRef}
          onLayout={onRootsSectionLayout}
          style={[styles.root, { height: width / ROOTS_IMAGE_ASPECT_RATIO + (isMobile ? 200 : 400) }]}
        >
          {/* Complete Image (bottom layer) */}
          <Animated.Image
            source={require('../assets/home/Layout/roots.png')} // Your complete roots image
            style={{
              width: width,
              height: width / ROOTS_IMAGE_ASPECT_RATIO,
              opacity: completeOpacity,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
            }}
          />

          {/* Masked Image (top layer that reveals) */}
          <View style={{ overflow: 'hidden', width: width }}>
            <Animated.View
              style={{
                height: maskHeight,
                overflow: 'hidden',
              }}
            >
              <Animated.Image
                source={require('../assets/home/roots-masked.png')}
                style={{
                  width: width,
                  height: width / ROOTS_IMAGE_ASPECT_RATIO,
                  opacity: maskedOpacity,
                  resizeMode: 'cover',
                }}
              />
            </Animated.View>
          </View>

          {/* Text Overlay - Your existing text */}
          <View
            style={{
              position: 'absolute',
              top: '27%',
              left: isMobile ? 20 : 150,
              right: isMobile ? 20 : 'auto',
              alignItems: isMobile ? 'center' : 'flex-start',
              transform: [{ translateY: isMobile ? -80 : 0 }],             
            }}
          >
            <Text
              style={{
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                color: '#ffffffff',
                fontSize: isMobile ? 22 : 50,
                flexWrap: 'wrap',
                width: isMobile ? width - 40 : 600,
                textAlign: isMobile ? 'center' : 'left',
                opacity:completeOpacity,
                
              }}
            >
              Where Tradition Meets Modern Fashion
            </Text>
            <Text
              style={{
                color: '#ffffffff',
                fontSize: isMobile ? 14 : 22,
                flexWrap: 'wrap',
                width: isMobile ? width - 40 : 600,
                marginTop: isMobile ? 10 : 20,
                textAlign: isMobile ? 'center' : 'left',
                letterSpacing:0.2

              }}
            >
              At BÉSHAs, we redefine fashion by merging traditional handloom
              fabrics with contemporary designs. Our unique approach allows you
              to celebrate your heritage while expressing your individuality.
            </Text>
          </View>

          {!isMobile && (
            <Image
              source={require('../assets/Placeholder Image.png')}
              style={{
                position: 'absolute',
                top: '35%',
                left: width - 500,
                transform: [{ translateX: -340 }, { translateY: -340 }],
                width: 680,
                height: 680,
                resizeMode: 'contain',
              }}
            />
          )}
        </View>

        {/* FIRST DEMOS SECTION */}
        <View
          style={[
            styles.firstDemosView,
            {
              paddingHorizontal: isMobile ? 20 : 0,
              paddingVertical: !isMobile ? 90 : 40,
            }
          ]}
        >
          <View style={{ marginTop: 30, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: isMobile ? 14 : 20,
                color: '#43282b',
                marginBottom: isMobile ? 12 : 25,
              }}
            >
              Crafted
            </Text>
            <Text
              style={{
                fontSize: isMobile ? 28 : 50,
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                color: '#43282b',
                marginBottom: isMobile ? 15 : 35,
                textAlign: 'center',
                paddingHorizontal: isMobile ? 10 : 0,
              }}
            >
              Movement And Wearability
            </Text>
            <Text
              style={{
                fontSize: isMobile ? 16 : 26,
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                color: '#43282b',
                textAlign: 'center',
              }}
            >
              Craft that moves like you
            </Text>
          </View>

          {/* Men/Women Toggle */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: isMobile ? 25 : 50,
            }}
          >
            <TouchableOpacity
              onPress={() => setMenSelected(true)}
              style={{
                backgroundColor: menSelected ? '#451b17' : '',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                marginHorizontal: isMobile ? 8 : 15,
                paddingHorizontal: isMobile ? 15 : 20,
                paddingVertical: 6,
                borderColor: '#451b17',
                borderWidth: 0.2,
                maxHeight: 39
              }}
            >
              <Text
                style={{
                  fontSize: isMobile ? 16 : 18,
                  color: menSelected ? 'white' : '#451b17',
                }}
              >
                Men
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMenSelected(false)}
              style={{
                backgroundColor: !menSelected ? '#451b17' : '',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                marginHorizontal: isMobile ? 8 : 15,
                borderColor: '#451b17',
                borderWidth: 0.2,
                paddingHorizontal: 10,
                maxHeight: 39
              }}
            >
              <Text
                style={{
                  fontSize: isMobile ? 16 : 20,
                  color: !menSelected ? 'white' : '#451b17',
                }}
              >
                Women
              </Text>
            </TouchableOpacity>
          </View>

          {/* Product Grid - First Row */}
          <View
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              paddingHorizontal: isMobile ? 0 : 50,
              marginTop: isMobile ? 40 : 120,
              marginHorizontal: isMobile ? 0 : 50,
              justifyContent: 'space-between',
              alignItems: isMobile ? 'center' : 'flex-start',
            }}
          >
            {[
              { name: 'Polo Shirt', image: require('../assets/home/Layout/Placeholder Image.png') },
              { name: 'Button Down Shirt', image: require('../assets/home/Layout/Placeholder Image.png') },
              { name: 'Pique Polo Shirt', image: require('../assets/home/Layout/Placeholder Image.png') },
              { name: 'White Dress', image: require('../assets/home/Layout/Placeholder Image.png') },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  marginBottom: isMobile ? 25 : 0,
                  width: isMobile ? '85%' : 'auto',
                }}
              >
                <Image
                  source={item.image}
                  style={
                    isMobile
                      ? {
                        width: '100%',
                        height: 200,
                        resizeMode: 'cover',
                        borderRadius: 8,
                      }
                      : {}
                  }
                />
                <Text
                  style={[
                    styles.firstDemosItemText,
                    {
                      fontSize: isMobile ? 16 : 24,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Product Grid - Second Row */}
          <View
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              paddingHorizontal: isMobile ? 0 : 50,
              marginTop: isMobile ? 30 : 120,
              marginHorizontal: isMobile ? 0 : 50,
              justifyContent: 'space-between',
              alignItems: isMobile ? 'center' : 'flex-start',
            }}
          >
            {[
              { name: 'White Shirt', image: require('../assets/home/Layout/Placeholder Image-1.png') },
              { name: 'Red Dress', image: require('../assets/home/Layout/Placeholder Image-1.png') },
              { name: 'Pants', image: require('../assets/home/Layout/Placeholder Image-1.png') },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  marginBottom: isMobile ? 25 : 0,
                  width: isMobile ? '85%' : 'auto',
                }}
              >
                <Image
                  source={item.image}
                  style={
                    isMobile
                      ? {
                        width: '100%',
                        height: 260,
                        resizeMode: 'cover',
                        borderRadius: 8,
                      }
                      : {
                        width: 500,
                        height: 560,
                        resizeMode: 'contain',
                      }
                  }
                />
                <Text
                  style={[
                    styles.firstDemosItemText,
                    {
                      fontSize: isMobile ? 16 : 24,
                      textAlign: 'center',
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Divider */}
          <View style={{ alignItems: 'center' }}>
            <CustomLine
              length={width - (isMobile ? 40 : 160)}
              color="#E85A4F"
              thickness={4}
              style={{ marginTop: isMobile ? 40 : 140, marginBottom: 9.5 }}
            />
            <CustomLine
              length={width - (isMobile ? 40 : 160)}
              color="#E85A4F"
              thickness={4}
            />
          </View>
        </View>

        {/* SECOND DEMOS */}

        {!isMobile && (
          // ZOOM OUT
          <View style={styles.secondDemosView}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{
                backgroundColor: '#543236',
                height: 660,
                width: 525,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  source={require('../assets/home/SDemo/Placeholder Image-big.png')}
                  style={{
                    height: 600,
                    // width: 700,
                    resizeMode: 'contain'
                  }}
                />
              </View>
              <View style={{
                padding: 50,
                backgroundColor: '#EEEBE9',
                height: 660,
                width: 525,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/icons/chevron-back.svg')}
                    style={{
                      tintColor: '#412023',
                      right: 8,
                      height: 18,
                      width: 18
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/home/SDemo/Placeholder Image-scrollable.png')}
                    style={{
                      height: 350,
                      resizeMode: 'contain',
                      marginHorizontal: 10
                    }}
                  />
                  <Text style={{
                    fontSize: 24,
                    marginTop: 8,
                    fontFamily: 'TheSeason-Light',
                    color: '#451b17',
                    fontWeight: '100'
                  }}>White Shorts</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/icons/chevron-forward.svg')}
                    style={{
                      tintColor: '#412023',
                      left: 8,
                      height: 18,
                      width: 18
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            </View>{/* FIRST ROW */}







            <View style={{ flexDirection: 'row' }}>
              <View style={{
                padding: 50,
                backgroundColor: '#EEEBE9',
                height: 660,
                width: 525,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }}>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/icons/chevron-back.svg')}
                    style={{
                      tintColor: '#412023',
                      right: 8,
                      height: 18,
                      width: 18
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={require('../assets/home/SDemo/Placeholder Image-scrollable.png')}
                    style={{
                      height: 350,
                      resizeMode: 'contain',
                      marginHorizontal: 10
                    }}
                  />
                  <Text style={{
                    fontSize: 24,
                    marginTop: 8,
                    fontFamily: 'TheSeason-Light',
                    color: '#451b17',
                    fontWeight: '100'
                  }}>White Shorts</Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require('../assets/icons/chevron-forward.svg')}
                    style={{
                      tintColor: '#412023',
                      left: 8,
                      height: 18,
                      width: 18
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
              <View style={{
                backgroundColor: '#543236',
                height: 660,
                width: 525,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Image
                  source={require('../assets/home/SDemo/Placeholder Image-big.png')}
                  style={{
                    height: 600,
                    // width: 700,
                    resizeMode: 'contain'
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <CustomLine
                length={width - (isMobile ? 40 : 160)}
                color='#E85A4F'
                thickness={4}
                style={{
                  marginTop: isMobile ? 60 : 140,
                  marginBottom: 9.5
                }}
              />
              <CustomLine
                length={width - (isMobile ? 40 : 160)}
                color='#E85A4F'
                thickness={4}
              />
            </View>
          </View>
        )}

        {/* REVIEWS */}
        <View
          style={[
            styles.reviewView,
            {
              flexDirection: isMobile ? 'column' : 'row',
              marginTop: isMobile ? 0 : 120,
              paddingHorizontal: isMobile ? 20 : 0,
            },
          ]}
        >
          <View>
            <Image source={require('../assets/home/Testimonial/Placeholder Image.png')} style={{ width: isMobile ? width * 0.9 : undefined, resizeMode: 'contain' }} />
          </View>
          <View style={{ alignItems: isMobile ? 'center' : 'flex-start' }}>
            <View style={{ flexDirection: 'row', marginTop: isMobile ? 15 : 0 }}>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Image key={i} source={require('../assets/home/Testimonial/star.svg')} style={{ marginHorizontal: 2 }} />
                ))}
            </View>
            <Text
              style={{
                fontSize: isMobile ? 18 : 28,
                flexWrap: 'wrap',
                width: isMobile ? width - 40 : 550,
                marginTop: 30,
                textAlign: isMobile ? 'center' : 'left',
                fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                color: '#43282b',
              }}
            >
              BÉSHAs has transformed my wardrobe! The blend of tradition and
              modern style is simply stunning.
            </Text>
            <Text
              style={{
                fontSize: isMobile ? 14 : 16,
                marginTop: 20,
                textAlign: isMobile ? 'center' : 'left',
                color: '#43282b',
              }}
            >
              Aisha Patel
            </Text>
            <Text
              style={{
                fontSize: isMobile ? 14 : 16,
                textAlign: isMobile ? 'center' : 'left',
                color: '#43282b',
              }}
            >
              Fashion Blogger
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width - (isMobile ? 40 : 160)}
            color='#E85A4F'
            thickness={4}
            style={{
              marginTop: isMobile ? 60 : 140,
              marginBottom: 9.5
            }}
          />
          <CustomLine
            length={width - (isMobile ? 40 : 160)}
            color='#E85A4F'
            thickness={4}
          />
        </View>
        {/* DISCOVER SECTION */}
        <View
          style={[
            styles.discover,
            {
              flexDirection: isMobile ? 'column' : 'row',
              marginTop: isMobile ? 60 : 120,
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
              Discover Your Unique Style
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
              Explore our vibrant collection that blends tradition with modern
              flair, perfect for the GenZ spirit.
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
                  backgroundColor: '#451b17',
                  borderRadius: 12,
                  paddingHorizontal: 18,
                  paddingVertical: 8,
                  margin: 5,
                }}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>Shop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 6,
                  borderWidth: 0.4,
                  borderColor: '#451b17',
                  margin: 5,
                }}
              >
                <Text style={{ color: '#451b17', fontSize: 16 }}>Subscribe</Text>
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



        <LinearGradient
          colors={['#FCF4E3', '#2C3540']}
        >
          <View style={[
            styles.getInTouchView,
            {
              paddingTop: isMobile ? 60 : 100,
              paddingBottom: isMobile ? 40 : 60,
              paddingHorizontal: isMobile ? 20 : 0,
            }
          ]}>
            <LinearGradient
              colors={['#ECDDCA', '#2C3540']}
              style={{
                width: isMobile ? width - 40 : width - 200,
                borderRadius: isMobile ? 20 : 35,
              }}
            >
              {/* Header Section */}
              <View style={[
                styles.gitBox,
                {
                  width: isMobile ? width - 40 : width - 200,
                  paddingVertical: isMobile ? 30 : 50,
                  paddingHorizontal: isMobile ? 20 : 0,
                }
              ]}>
                <Text style={{
                  fontSize: isMobile ? 32 : 50,
                  fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                  textAlign: 'center',
                }}>
                  Get in Touch
                </Text>
                <Text style={{
                  marginTop: 20,
                  fontSize: isMobile ? 14 : 16,
                  textAlign: 'center',
                  color: isMobile ? '#fcf4e3' : 'inherit',
                }}>
                  We'd love to hear from you!
                </Text>
              </View>

              {/* Contact Sections Container */}
              <View style={{
                paddingHorizontal: isMobile ? 20 : 20,
                paddingBottom: isMobile ? 40 : 25,
              }}>
                {isMobile ? (
                  // Mobile: Stack vertically with proper spacing
                  <View>
                    {/* Email Section */}
                    <View style={{
                      alignItems: 'center',
                      width: '100%',
                      marginBottom: 40,
                    }}>
                      <Image
                        source={require('../assets/home/Contact/mail.svg')}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{
                        fontSize: 24,
                        fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                        marginTop: 20,
                        textAlign: 'center',
                        color: '#fcf4e3',
                      }}>
                        Email
                      </Text>
                      <Text style={{
                        marginTop: 15,
                        color: '#fcf4e3',
                        fontSize: 14,
                        textAlign: 'center',
                        lineHeight: 20,
                        paddingHorizontal: 10,
                      }}>
                        For inquiries, reach us at our email address
                      </Text>
                      <Text style={{
                        marginTop: 15,
                        color: '#fcf4e3',
                        textDecorationLine: 'underline',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                        hello@beshas.com
                      </Text>
                    </View>

                    {/* Phone Section */}
                    <View style={{
                      alignItems: 'center',
                      width: '100%',
                      marginBottom: 40,
                    }}>
                      <Image
                        source={require('../assets/home/Contact/call.svg')}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{
                        fontSize: 24,
                        fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                        marginTop: 20,
                        textAlign: 'center',
                        color: '#fcf4e3',
                      }}>
                        Phone
                      </Text>
                      <Text style={{
                        marginTop: 15,
                        color: '#fcf4e3',
                        fontSize: 14,
                        textAlign: 'center',
                        lineHeight: 20,
                        paddingHorizontal: 10,
                      }}>
                        Call us for any questions or collaborations.
                      </Text>
                      <Text style={{
                        marginTop: 15,
                        color: '#fcf4e3',
                        textDecorationLine: 'underline',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                        +1 (555) 123-4567
                      </Text>
                    </View>


                    {/* Office Section */}
                    <View style={{
                      alignItems: 'center',
                      width: '100%',
                    }}>
                      <Image
                        source={require('../assets/home/Contact/location.svg')}
                        style={{
                          width: 50,
                          height: 50,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={{
                        fontSize: 24,
                        fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                        marginTop: 20,
                        textAlign: 'center',
                        color: '#fcf4e3',
                      }}>
                        Office
                      </Text>
                      <Text style={{
                        marginTop: 15,
                        color: '#fcf4e3',
                        fontSize: 14,
                        textAlign: 'center',
                        lineHeight: 20,
                        paddingHorizontal: 10,
                      }}>
                        Visit us at our headquarters for a personal touch.
                      </Text>
                      <Text style={{
                        marginTop: 15,
                        color: '#fcf4e3',
                        textDecorationLine: 'underline',
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                        456 Fashion Ave, Sydney NSW 2000 AU
                      </Text>
                    </View>
                  </View>
                ) : (
                  // Desktop: Keep original horizontal layout
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}>
                    {/* Email Section */}
                    <View style={{
                      alignItems: 'center',
                      flex: 1,
                      maxWidth: 350,
                    }}>
                      <Image
                        source={require('../assets/home/Contact/mail.svg')}
                      />
                      <Text style={{
                        fontSize: 38,
                        fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                        marginTop: 32,
                      }}>
                        Email
                      </Text>
                      <Text style={{
                        marginTop: 22,
                        color: '#fcf4e3',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                        For inquiries, reach us at our email address
                      </Text>
                      <Text style={{
                        marginTop: 22,
                        marginBottom: 25,
                        color: '#fcf4e3',
                        textDecorationLine: 'underline',
                        fontSize: 16,
                      }}>
                        hello@beshas.com
                      </Text>
                    </View>

                    {/* Phone Section */}
                    <View style={{
                      alignItems: 'center',
                      flex: 1,
                      maxWidth: 350,
                    }}>
                      <Image
                        source={require('../assets/home/Contact/call.svg')}
                      />
                      <Text style={{
                        fontSize: 38,
                        fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                        marginTop: 32,
                      }}>
                        Phone
                      </Text>
                      <Text style={{
                        marginTop: 22,
                        color: '#fcf4e3',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                        Call us for any questions or collaborations.
                      </Text>
                      <Text style={{
                        marginTop: 22,
                        marginBottom: 25,
                        color: '#fcf4e3',
                        textDecorationLine: 'underline',
                        fontSize: 16,
                      }}>
                        +1 (555) 123-4567
                      </Text>
                    </View>

                    {/* Office Section */}
                    <View style={{
                      alignItems: 'center',
                      flex: 1,
                      maxWidth: 350,
                    }}>
                      <Image
                        source={require('../assets/home/Contact/location.svg')}
                      />
                      <Text style={{
                        fontSize: 38,
                        fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
                        marginTop: 32,
                      }}>
                        Office
                      </Text>
                      <Text style={{
                        marginTop: 22,
                        color: '#fcf4e3',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                        Visit us at our headquarters for a personal touch.
                      </Text>
                      <Text style={{
                        marginTop: 22,
                        marginBottom: 25,
                        color: '#fcf4e3',
                        textDecorationLine: 'underline',
                        fontSize: 16,
                      }}>
                        456 Fashion Ave, Sydney NSW 2000 AU
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>

        {/* NEWSLETTER */}
        <View
          style={[
            styles.newsletterView,
            {
              flexDirection: isMobile ? 'column' : 'row',
              padding: isMobile ? 20 : 0,
              alignItems: 'center',
              paddingBottom: 35,

            },
          ]}
        >
          <View style={{ justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start' }}>
            <Text
              style={{
                fontSize: isMobile ? 28 : 64,
                width: isMobile ? width - 40 : 620,
                textAlign: isMobile ? 'center' : 'left',
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                color: '#FCF4E3',
              }}
            >
              Join Our BÉSHAs Community
            </Text>
            <Text
              style={{
                fontSize: isMobile ? 14 : 20,
                maxWidth: isMobile ? width - 40 : 700,
                marginTop: 20,
                textAlign: isMobile ? 'center' : 'left',
                color: '#FCF4E3',
              }}
            >
              Subscribe to our newsletter for exclusive updates and special
              offers tailored just for you.
            </Text>
            {/* Input */}
            <View style={{ marginTop: 40, alignItems: isMobile ? 'center' : 'flex-start' }}>
              <View
                style={{
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                }}
              >
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={'rgba(255,255,255,0.6)'}
                  selectionColor={'#FCF4E3'}
                  style={{
                    borderBottomColor: 'rgba(255,255,255,0.2)',
                    borderBottomWidth: 1,
                    width: isMobile ? width - 60 : 470,
                    paddingVertical: 12,
                    fontSize: 15,
                    color: '#FCF4E3',
                    marginBottom: isMobile ? 15 : 0,
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                />
                <TouchableOpacity>
                  <LinearGradient
                    colors={['#ECDDCA', '#2C3540']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      borderRadius: 13,
                      borderColor: '#FCF4E3',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      marginLeft: isMobile ? 0 : 10,
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
                    >
                      Sign Up
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 12,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Text style={{ fontSize: 12, color: 'white' }}>
                  By clicking Sign Up, you agree to our{' '}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 12,
                      textDecorationLine: 'underline',
                      color: 'white',
                    }}
                  >
                    Terms and Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', marginTop: isMobile ? 30 : 0 }}>
            <Image
              source={require('../assets/home/CTA/Placeholder Image.png')}
              style={{
                height: isMobile ? 280 : 550,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>

        {/* FOOTER */}
        <Footer />
      </Animated.ScrollView>
    </View>
  );
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
  heroView: {
    alignItems: 'center',
    paddingBottom: 45,
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
  responsiveImage: {
    aspectRatio: 1312 / 632,
  },
  footer: {},
  newsletterView: {
    backgroundColor: '#2C3540',
    justifyContent: 'space-evenly',
  },
  gitBox: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  getInTouchView: {
    paddingTop: 100,
    alignItems: 'center',
    paddingBottom: 60,
  },
  discover: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  reviewView: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  secondDemosView: {
    alignItems: 'center',
    marginTop: 60,
  },
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3',
  },
  firstDemosItemText: {
    fontSize: 24,
    marginTop: 8,
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
    color: '#451b17',
    fontWeight: '100',
  },
  firstDemosView: {
    backgroundColor: '#FCF4E3',
  },
  root: {
    alignItems: 'center',
  },
});
