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
  LayoutAnimation,
  FlatList
} from "react-native";
import DropdownMenu from "../components/Dropdown";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ShopifyService, { ShopifyProduct } from '../services/shopify-service';
import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
import { useScrollNavbar } from "../components/ScrollNavbar";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { LinearGradient } from "expo-linear-gradient";



export default function Store() {

  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setError(null);
      const fetchedProducts = await ShopifyService.getAllProducts(50);
      setProducts(fetchedProducts);
      // console.log(fetchedProducts)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };


  const [newArrivalsHovered, setNewArrivalsHovered] = useState(false);


  const navigation: any = useNavigation();
  const { fontsLoaded } = useFonts();
  const { width, height } = useWindowDimensions();

  const [menSelected, setMenSelected] = useState(true);

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
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  if (!fontsLoaded) return null;




  const renderFRProduct = ({ item }: { item: ShopifyProduct }) => {
    const imageUrl = item.images?.edges[0]?.node?.url;
    const price = item.priceRange?.minVariantPrice?.amount;
    const currency = item.priceRange?.minVariantPrice?.currencyCode;

    return (
      <View style={{
        marginHorizontal: 75
      }}>
        <TouchableOpacity
          style={{}}
          // @ts-ignore
          onPress={() => navigation.navigate('ProductDetail', { handle: item.handle })}
        >
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={{
                height: 445,
                width: 300,
                borderRadius: 18,

              }}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, fontWeight: '100', fontSize: 24, color: '#43282B' }} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  const renderSRProduct = ({ item }: { item: ShopifyProduct }) => {
    const imageUrl = item.images?.edges[0]?.node?.url;
    const price = item.priceRange?.minVariantPrice?.amount;
    const currency = item.priceRange?.minVariantPrice?.currencyCode;

    return (
      <View style={{
        marginHorizontal: 75
      }}>
        <TouchableOpacity
          style={{}}
          // @ts-ignore
          onPress={() => navigation.navigate('ProductDetail', { handle: item.handle })}
        >
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={{
                height: 480,
                width: 420,
                borderRadius: 18,

              }}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, fontWeight: '100', fontSize: 24, color: '#43282B' }} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, fontWeight: '100', fontSize: 24, color: '#43282B' }}>
            {/* {item.} */}
          </Text>
        </View>
      </View>
    );
  };




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
                  height: isMobile ? 68 : isTablet ? 87 : 100,
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
                <View
                  key={i}
                  //@ts-ignore
                  onMouseEnter={() => {
                    if (Platform.OS === 'web') {
                      if (label == 'New Arrivals') { setNewArrivalsHovered(true); }
                    }
                  }}
                  // @ts-ignore
                  onMouseLeave={() => {
                    if (Platform.OS === 'web' && label === 'New Arrivals') {
                      setNewArrivalsHovered(false);
                    }
                  }}
                >
                  <TouchableOpacity
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
                </View>
              ))}
            </View>

            <View style={{ //MIDDLE VIEW 
              // position: 'absolute',
              top: '25%',
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 0
            }}>
              <Text style={{
                textAlign: 'center',
                fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
                fontSize: 50,
                color: '#543236',
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

        <View style={styles.craftedView}>
          <View style={{
            alignItems: 'center'

          }}>

            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              color: '#412023',
              fontSize: isMobile ? 14 : 15
            }}>Crafted</Text>

            <Text style={{
              fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
              fontSize: 55,
              textAlign: 'center',
              color: '#43282B',
              marginTop: 20
            }}>Experience the modern elegance{'\n'} of our newest designs</Text>

            <Text style={{
              fontFamily: FONT_FAMILIES.FUTURA_BOOK,
              textAlign: 'center',
              fontSize: isMobile ? 16 : 18,
              marginTop: 28,
              color: '#43282B',
              lineHeight: 28
            }}>Indulge in the refined elegance of our latest contemporary designs.{'\n'}Crafted to inspire, each creation echoes modern luxury and taste.{'\n'}Where every detail whispers sophistication.</Text>

          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 50
          }}>

            <View style={{ width: 100 }}></View>{/* EMTPY VIEW  */}
            {/* MEN/WOMEN TOGGLE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                // marginTop: isMobile ? 25 : 50,
                width: 100
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
                    fontFamily: FONT_FAMILIES.NUNITO_SANS,
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
                    fontFamily: FONT_FAMILIES.NUNITO_SANS,
                    color: !menSelected ? 'white' : '#451b17',
                  }}
                >
                  Women
                </Text>
              </TouchableOpacity>
            </View>
            {/* TOGGLES */}



            {/* SORT AND FILTER */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                // marginTop: isMobile ? 25 : 50,
                width: 100

              }}
            >
              <TouchableOpacity
                onPress={() => setMenSelected(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10

                }}
              >
                <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, fontSize: 22, marginRight: 5 }}>Sort</Text>
                <Image
                  source={require('../assets/store/sort-icon.svg')}
                  style={{
                    tintColor: '#43282B'
                  }}
                />
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => setMenSelected(false)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10
                }}
              >
                <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, fontSize: 22, marginRight: 5 }}>Filter</Text>
                <Image
                  source={require('../assets/store/sort-icon.svg')}
                  style={{
                    tintColor: '#43282B'
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ marginTop: 50 }}>{/* PRODUCTS LIST */}
            <View style={styles.firstProductsRow}>{/* FIRST ROW */}
              <FlatList
                data={products.slice(2, 6)} // Only take first 4 products
                renderItem={renderFRProduct}
                keyExtractor={(item) => item.id}
                horizontal={true} // Make it horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              />
            </View>
            <View style={{ marginTop: 120, alignItems: 'center' }}>
              <FlatList
                data={products.slice(5, 8)} // Only take first 4 products
                renderItem={renderSRProduct}
                keyExtractor={(item) => item.id}
                horizontal={true} // Make it horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              />
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <CustomLine
            length={width - 250}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
            style={{
              marginTop: isMobile ? 30 : isTablet ? 60 : 80,
              marginBottom: isMobile ? 7 : 9.5
            }}
          />
          <CustomLine
            length={width - 250}
            color="#E85A4F"
            thickness={isMobile ? 3 : 4}
          />
        </View>

        
        {/* EXPLORE VIEW */}
        <View style={styles.explore}>

          <TouchableOpacity style={{ alignItems: 'center', marginRight: 100 }}>
            <Image
              source={require('../assets/store/Placeholder Image-Long.png')}
            />
            <Text style={{ position: 'absolute', top: 650 }}>Explore the Collection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', marginLeft: 100 }}>
            <Image
              source={require('../assets/store/Placeholder Image-Long.png')}
            />
            <Text style={{ position: 'absolute', top: 650 }}>Explore the Collection</Text>
          </TouchableOpacity>


        </View>

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


      </Animated.ScrollView >
      <DropdownMenu hovered={newArrivalsHovered} />
    </View >
  )
};

const styles = StyleSheet.create({
  explore: {
    marginVertical: 100,
    marginHorizontal: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  
  newsletterView: {
    backgroundColor: '#2C3540',
    justifyContent: 'space-evenly',
    marginTop:75
  },

  firstProductsRow: {
    marginTop: 40,
    alignItems: 'center'
  },
  productsContainer: {
  },
  productCard: {
    width: 280, // Fixed width for horizontal layout
    // margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 80
  },
  productImage: {
    // width: 280, // Match card width
    height: 440, // Adjust height as needed
    backgroundColor: '#f0f0f0',
    resizeMode: 'contain'
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
    marginTop: 18
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
  craftedView: {
    backgroundColor: '#FCF4E3',
    paddingHorizontal: 100,
    paddingVertical: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3',
  },
  mainBody: {
    flex: 2
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