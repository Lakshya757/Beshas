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



export default function Store() {
  const navigation: any = useNavigation();
  const { fontsLoaded } = useFonts();
  const { width, height } = useWindowDimensions();


  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1200;
  const isDesktop = width >= 1200;
  const navbarHeight = isDesktop ? 80 : 60;
  const { handleScroll, navbarTranslateY, isNavbarVisible } = useScrollNavbar(navbarHeight);


  const bannerHeight = height - navbarHeight + 100;

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

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* NAVBAR */}
      <NavBar userLoggedIn={true} handleScroll={handleScroll} navbarTranslateY={navbarTranslateY} navbarHeight={navbarHeight} />

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
        <View style={styles.bannerContainer}>
          <Image
            source={require('../assets/store/Placeholder Image-Banner.png')}
            style={[
              styles.bannerImage,
              {
                width: width,
                height: bannerHeight,
              }
            ]}
            resizeMode="cover"
          />

          {/* BANNER CONTENT */}
          <View style={[styles.bannerContent, { height: bannerHeight }]}>
            <View style={styles.linesContainer}>
              <CustomLine color="#E85A4F" length={width} />
              <CustomLine color="#E85A4F" length={width} style={{ marginTop: 10 }} />
            </View>

            <Image
              source={require('../assets/store/logo-dark.svg')}
              style={[
                styles.thumbImage,
                {
                  width: isMobile ? 100 : isTablet ? 130 : 150,
                  height: isMobile ? 67 : isTablet ? 87 : 100,
                  // transform: [{ translateX: isMobile ? -50 : isTablet ? -65 : -75 }],

                }
              ]}
            />

            <View // HERO NAVLINKS
              style={[
                styles.heroNavLinksView,
                {
                  flexDirection: isMobile ? 'column' : 'row',
                },
              ]}
            >
              {['New Arrivals', 'Women', 'Men', 'Kids', 'Gifts', 'Lifestyles'].map((label, i) => (
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

            <View style={{ //MIDDLE VIEW 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                fontSize: 50,
                color: '#543236'
              }}>Embrace Tradition,{"\n"}Redefine Modern Fashion</Text>
              <View style={{
                flexDirection: 'row',
                marginTop: 35
              }}>

                <TouchableOpacity style={{
                  marginHorizontal: 15,
                  borderWidth: 1,
                  borderColor: 'white',
                  width: 120,
                  alignItems: 'center',
                  borderRadius: 13,
                  height: 35,
                  justifyContent: 'center',
                  backgroundColor: '#451B17'
                }}><Text style={{
                  fontFamily: FONT_FAMILIES.NUNITO_SANS,
                  color: '#FDFBF9',
                  fontSize: 16
                }}>Shop</Text></TouchableOpacity>



                <TouchableOpacity style={{
                  marginHorizontal: 15,
                  borderWidth: 1,
                  borderColor: 'rgba(12, 11, 4,0.15)',
                  width: 120,
                  alignItems: 'center',
                  borderRadius: 13,
                  height: 35,
                  justifyContent: 'center'
                }}><Text style={{
                  fontFamily: FONT_FAMILIES.NUNITO_SANS,
                  color: '#451B17',
                  fontSize: 16
                }}>Explore More</Text></TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
        {/* BANNER END */}

        <View></View>
      </Animated.ScrollView >
    </View >
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3',
  },
  mainBody: {
    flex: 2
  },
  heroView: {
    alignItems: 'center',
    paddingBottom: 85,
  },
  heroNavLinkButton: {
    marginHorizontal: 22,
  },
  heroNavLinkButtonText: {
    fontSize: 22,
    color: '#412023',
    fontFamily: FONT_FAMILIES.FUTURA_BOOK
  },
  heroNavLinksView: {
    flexWrap: 'wrap',
    // justifyContent: 'center',
    marginTop: 30
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
  thumbImage: {
    // position: 'absolute',
    // top: 60,
    marginTop: 10,
    resizeMode: 'contain',
    // alignSelf: 'center',
    // left: '50%',

  },
  bannerContainer: {
    position: 'relative',
    // alignItems: 'center',
    // paddingBottom:200
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
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  linesContainer: {
    // position: 'absolute',
    // top: 24,
    alignItems: 'center',
    marginTop: 18
  },
  bannerContent: {
    position: 'relative',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
  },
})