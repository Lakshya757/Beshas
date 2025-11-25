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
import NavBar from "../components/Navbar";

export default function Collection() {
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
    <NavBar userLoggedIn={false} handleScroll={handleScroll} navbarTranslateY={navbarTranslateY} navbarHeight={navbarHeight} />


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
    ></Animated.ScrollView>
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