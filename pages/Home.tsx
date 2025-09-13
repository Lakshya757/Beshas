import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, useWindowDimensions, Platform, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import * as Font from 'expo-font';

import CustomLine from '../components/CustomLine';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {
  const { width } = useWindowDimensions(); // Use useWindowDimensions for real-time updates
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'TheSeasons-Medium': require('../fonts/The-Seasons/Fontspring-DEMO-theseasons-reg.otf'),
          'TheSeasons-Light': require('../fonts/The-Seasons/Fontspring-DEMO-theseasons-lt.otf')
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Still allow the app to continue
      }
    }

    loadFonts();
  }, []);

  const isDesktop = width >= 768;

  const [loggedIn, setLoggedIn] = useState(false);

  // Show loading screen while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.navbar, { height: isDesktop ? 80 : 50 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../assets/home/Navbar/navbar-logo.png')}
            style={[styles.logo, { height: isDesktop ? 100 : 30 }]}
            resizeMode="contain"
          />
          <View style={styles.seachView}>
            <Ionicons name='search-outline' size={24} color={'#FFFFFF'} />
            <TextInput
              style={styles.searchTextInput}
              placeholder='Search'
              placeholderTextColor={'white'}
            />
          </View>
        </View>

        <View style={styles.navbarRightButtonsView}>
          <TouchableOpacity style={styles.navbarRightButton}>
            <Text style={styles.nrbText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navbarRightButton}>
            <Text style={styles.nrbText}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navbarRightButton}>
            <Text style={styles.nrbText}>Collections</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navbarRightButton}>
            <Text style={styles.nrbText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.nrbText}>Shop Now</Text>
            <Ionicons name='chevron-down-outline' color={'white'} size={20} />
          </TouchableOpacity>
          <View style={styles.account}>
            <TouchableOpacity>
              <Text style={styles.accountButtonsText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.accountButtonsText}>Shop</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>{/*Navbar */}

      <ScrollView style={styles.mainBody} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.heroView}>
          <CustomLine length={width} color='#E85A4F' style={{ marginTop: 20, marginBottom: 6.5 }} />
          <CustomLine length={width} color='#E85A4F' />
          <Image
            source={require('../assets/home/Header/logo.svg')}
            style={{ marginTop: 13, height: 75, width: 150 }}
          />
          <View style={styles.heroNavLinksView}>
            <TouchableOpacity style={styles.heroNavLinkButton}>
              <Text style={styles.heroNavLinkButtonText}>Padma</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroNavLinkButton}>
              <Text style={styles.heroNavLinkButtonText}>Fall Collection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroNavLinkButton}>
              <Text style={styles.heroNavLinkButtonText}>New Ins</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.heroNavLinkButton, { flexDirection: 'row', alignItems: 'center' }]}>
              <Text style={styles.heroNavLinkButtonText}>Shop Now</Text>
              <Ionicons name='chevron-down-outline' color={'black'} size={26} style={{ left: 10, top: 2 }} />
            </TouchableOpacity>
          </View>

          <View style={{
            marginTop: 30,
            width: '100%',
            alignItems: 'center',

          }}>{/* VIEW OF THE STUFF WIHIN HERO AND PLACEHOLDER */}
            <Image
              style={[styles.responsiveImage, {
                width: width - 195,
                borderRadius: 18
              }]}
              resizeMode='cover'
              source={require('../assets/home/Header/Placeholder Image.png')}
            />
            <View style={{
              position: 'absolute',
              top: '50%', // Position at 50% from top
              right: 240,
              transform: [{ translateY: -25 }], // Adjust this value to fine-tune centering
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'TheSeasons-Light',
                color: '#543236',
                fontSize: 50,
              }}>Everyday Luxury</Text>
              <Text style={{
                color: '#543236',
                fontSize: 24,
                fontWeight: '400'
              }}>Your everyday, in its best Bèsha</Text>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>Learn More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>{/* HERO */}
        <View style={[styles.root]}>
          <Image
            source={require('../assets/home/Layout/roots.png')}
            style={{ width: width }}
          />
          <View style={{
            position: 'absolute',
            top: '50%', // Position at 50% from top
            left: 150,
            // transform: [{ translateY: -25 }], // Adjust this value to fine-tune centering
            alignItems: 'center',
          }}>{/* ROOT TEXT CONTAINER */}
            <Text style={{
              fontFamily: 'TheSeasons-Medium',
              color: '#543236',
              fontSize: 50,
              flexWrap: 'wrap',
              width: 600,
              // Add drop shadow styles
              textShadowColor: 'rgba(0,0,0,0.4)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 9,
            }}>Where Tradition Meets Modern Fashion</Text>
            <Text style={{

              // fontFamily: 'TheSeasons-Medium',
              color: '#543236',
              fontSize: 22,
              flexWrap: 'wrap',
              width: 600,
            }}>At BÉSHAs, we redefine fashion by merging traditional handloom fabrics with contemporary designs. Our unique approach allows you to celebrate your heritage while expressing your individuality.</Text>
          </View>
        </View>
      </ScrollView>{/**MAIN BODY */}
    </View>//Container
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3'
  },
  root: {
    paddingTop: 50,
    alignItems: 'center'
  },
  heroNavLinkButton: {
    marginHorizontal: 22
  },
  heroNavLinkButtonText: {
    fontSize: 22,
    color: '#412023',
  },
  mainBody: {
    flex: 1
  },
  heroNavLinksView: {
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap', // Allow wrapping on smaller screens
    justifyContent: 'center',
  },
  heroView: {
    alignItems: 'center',
    paddingBottom: 35

  },
  // New styles for fully responsive image
  responsiveImage: {
    aspectRatio: 1312 / 632, // Adjust this ratio based on your image
  },
  seachView: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 20
  },
  account: {
    flexDirection: 'row',
    marginLeft: 18
  },
  navbarRightButton: {
    paddingHorizontal: 15
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
    flexWrap: 'wrap', // Allow wrapping on smaller screens
  },
  searchTextInput: {
    paddingHorizontal: 7,
    fontSize: 18,
  },
  navbar: {
    backgroundColor: "#2C3540",
    flexDirection: 'row',
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
      }
    })
  },
  logo: {
    marginHorizontal: 30,
  },
})