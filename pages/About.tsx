import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  Platform,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const navigation: any = useNavigation();

  const { width, height } = useWindowDimensions();
  const [menSelected, setMenSelected] = useState(true);
  const { fontsLoaded } = useFonts();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  // Calculate navbar height
  const navbarHeight = isDesktop ? 80 : 60;

  // Calculate banner height to fill viewport minus navbar
  const bannerHeight = height - navbarHeight;

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.mainBody}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* NAVBAR */}
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
              <TouchableOpacity>
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
                onPress={() => { navigation.navigate('Home') }}
              >
                <Text style={[
                  styles.nrbText,
                  { fontSize: isTablet ? 16 : 19 },
                ]}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { navigation.navigate('About') }}
                style={styles.navbarRightButton}>
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
              <TouchableOpacity style={styles.navbarRightButton} onPress={() => { navigation.navigate('Support') }}>
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
            resizeMode="cover" // This will maintain aspect ratio and crop if needed
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
          <View style={[
            styles.bannerContent,
            {
              height: bannerHeight,
            }
          ]}>
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
                left: isMobile ? 10 : 120,
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
              <View style={{
                flexDirection: 'row',
                marginTop:30
              }}>
                <TouchableOpacity style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 15,
                  alignItems:'center',
                  justifyContent:'center'
                }}><Text style={{ color: 'white', fontSize: 20, paddingVertical: 8, paddingHorizontal: 15, fontWeight:'400', fontFamily:FONT_FAMILIES.NUNITO_SANS }}>Shop</Text></TouchableOpacity>


                <TouchableOpacity style={{
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.2)',
                  borderRadius: 15,
                  alignItems:'center',
                  justifyContent:'center',
                  marginHorizontal:20
                }}><Text style={{ color: 'white', fontSize: 20, paddingVertical: 8, paddingHorizontal: 15, fontWeight:'400', fontFamily:FONT_FAMILIES.NUNITO_SANS }}>Learn More</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>{/* TOP BANNER */}

        <View style={styles.heritageView}>
          <View style={styles.heritageLeftView}>

          </View>
          <View style={styles.heritageRightView}>

          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heritageRightView:{
    
  },
  heritageLeftView:{

  },
  heritageView:{
    backgroundColor:'#FCF4E3',
    // height:2000
  },

  container: {
    backgroundColor: '#FCF4E3',
    flex: 1,
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