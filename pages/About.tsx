import React from "react";
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
  const { fontsLoaded } = useFonts();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

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
              height: isDesktop ? 80 : 60,
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
              <TouchableOpacity style={styles.navbarRightButton}>
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
        </View>{/* NAVBAR */}
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/about/banner.svg')}
            style={{
              width: width,
              height: width / (16 / 9),
              resizeMode: 'cover', // Fills container but may crop
              position: 'absolute'
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: width,
              height: width / (16 / 9),
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >{/* TINT */}</View>
          <View style={{marginTop:24, alignItems:'center'}}>
            <CustomLine color="#FBF8F4" length={width}   />
            <CustomLine color="#FBF8F4" length={width} style={{marginTop:10}} />
          </View>
          <Image
            source={require('../assets/about/thumb.png')}
            style={{marginTop:24}}
          />
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF4E3',
    flex: 1,
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
  logo: {
    marginHorizontal: 30,
  },
  mainBody: {
    flex: 1,
  },
});
