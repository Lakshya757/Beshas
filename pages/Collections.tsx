import React, { useCallback, useRef, useState, useEffect } from "react";
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
  Alert,
  FlatList
} from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useScrollNavbar } from "../components/ScrollNavbar";
import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "../components/CustomLine";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import ShopifyService, { ShopifyProduct } from '../services/shopify-service';


export default function Collections() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentScrollViewRef = useRef(null);
  const touchStartY = useRef(0);
  const overlayRef = useRef<any>(null);
  const animationFrameRef = useRef<number>();
  const [menSelected, setMenSelected] = useState(true);
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


  const ANIMATION_THRESHOLD = 300;

  const animationProgress = Math.min(scrollProgress / ANIMATION_THRESHOLD, 1);

  // Manual interpolations 
  const image1Scale = 1 + (animationProgress * 1.5);
  const image1Opacity = 1 - animationProgress;
  const image2Scale = 1.2 - (animationProgress * 0.2);
  const image2CompleteScale = 1.2 - (1 * 0.2);
  const image2Opacity = animationProgress;

  // Set up native wheel event listener
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Cancel any pending animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Use requestAnimationFrame for smooth updates
      animationFrameRef.current = requestAnimationFrame(() => {
        const delta = e.deltaY;

        setScrollProgress(prev => {
          const newProgress = Math.max(0, Math.min(ANIMATION_THRESHOLD, prev + delta));
          // scrollY.setValue(newProgress);

          if (newProgress >= ANIMATION_THRESHOLD && !isAnimationComplete) {
            // Delay completion slightly to ensure final frame renders
            setTimeout(() => setIsAnimationComplete(true), 50);
          }

          return newProgress;
        });
      });
    };

    overlay.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      overlay.removeEventListener('wheel', handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  });

  const handleTouchStart = (event: any) => {
    const touch = event.nativeEvent.touches[0];
    touchStartY.current = touch.pageY;
  };

  const handleTouchMove = (event: any) => {
    const touch = event.nativeEvent.touches[0];
    const delta = touchStartY.current - touch.pageY;

    setScrollProgress(prev => {
      const newProgress = Math.max(0, Math.min(ANIMATION_THRESHOLD, prev + delta * 0.5));
      scrollY.setValue(newProgress);
      touchStartY.current = touch.pageY;

      if (newProgress >= ANIMATION_THRESHOLD && !isAnimationComplete) {
        setTimeout(() => setIsAnimationComplete(true), 50);
      }

      return newProgress;
    });
  };

  const navigation: any = useNavigation();
  const { width, height } = useWindowDimensions();
  const { fontsLoaded } = useFonts();

  useFocusEffect(
    useCallback(() => {
      setScrollProgress(0) 
      setIsAnimationComplete(false);
      scrollY.setValue(0);
      if (contentScrollViewRef.current) {
        //@ts-ignore
        contentScrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    }, [])
  );

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  const navbarHeight = isDesktop ? 80 : isMobile ? 60 : 70;
  const { handleScroll, navbarTranslateY, isNavbarVisible } = useScrollNavbar(navbarHeight);
  const bannerHeight = height - navbarHeight;

  const handleLink = async (url: any) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  if (!fontsLoaded) { return null };

  return (
    <View style={styles.container}>
      {/* ANIMATED NAVBAR - Fixed Position */}
      <NavBar
        userLoggedIn={false}
        handleScroll={handleScroll}
        navbarTranslateY={navbarTranslateY}
        navbarHeight={navbarHeight}
      />

 {/* FIXED ANIMATION OVERLAY - Covers screen during animation */}
      {!isAnimationComplete && (
        <View
          ref={overlayRef}
          style={{
            position: 'absolute',
            top: navbarHeight,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            backgroundColor: '#FCF4E3',

          }}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={handleTouchStart}
          onResponderMove={handleTouchMove}
        >
          <View style={{ height: bannerHeight, position: 'relative', overflow: 'hidden' }}>
            <Image
              source={require('../assets/collections/start-og-169.jpg')}
              resizeMode="cover"
              style={{
                width: '100%',
                height: bannerHeight,
                opacity: image1Opacity,
                transform: [{ scale: image1Scale }],
                position: 'absolute',
              }}
            />
            <Image
              source={require('../assets/collections/end169.png')}
              resizeMode="cover"
              style={{
                width: width,
                height: (width * 9 / 16),
                opacity: image2Opacity,
                transform: [{ scale: image2Scale }],
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop: -navbarHeight
              }}
            />
          </View>

          {/* Progress indicator */}
          <View style={{
            position: 'absolute',
            bottom: 50,
            alignSelf: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ color: '#412023', marginBottom: 10, fontFamily: FONT_FAMILIES.FUTURA_BOOK }}>
              Scroll to continue 
              {/* ({Math.round(animationProgress * 100)}%) */}
            </Text>
            <View style={{
              width: 200,
              height: 4,
              backgroundColor: 'rgba(65, 32, 35, 0.2)',
              borderRadius: 2,
            }}>
              <View style={{
                width: `${animationProgress * 100}%`,
                height: '100%',
                backgroundColor: '#412023',
                borderRadius: 2,
              }} />
            </View>
          </View>
        </View>
      )}



      {/* SCROLLABLE CONTENT - Only active after animation */}
      <ScrollView
        ref={contentScrollViewRef}
        onScroll={handleScroll}
        style={[styles.mainBody, {
          opacity: isAnimationComplete ? 1 : 0,
          pointerEvents: isAnimationComplete ? 'auto' : 'none'
        }]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      >
        {/* Show final animation state as static background */}
        <View style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#FCF4E3' }}>
          <Image
            source={require('../assets/collections/end169.png')}
            // resizeMode="cover"
            style={{
              width: width,
              height: (width * 9 / 16),
              transform: [{ scale: image2CompleteScale }],
            }}
          />
        </View>



        {/* Chapter View */}
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 100,
        }}>


          <Image
            source={require('../assets/home/Header/logo.svg')}
          />
          <View
            style={[
              styles.heroNavLinksView,
              {
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
              },

            ]}
          >
            {['Padma', 'Fall Collection', 'New Ins', 'Shop Now'].map((label, i) => (
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
          </View>

          <View style={{ marginTop: 120, alignItems: 'center' }}>
            <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM, fontSize: 65, color: '#543236' }}>The First Chapter: PADMA</Text>
            <Text style={{ fontFamily: FONT_FAMILIES.THESEASONS_LIGHT, fontSize: 25, color: '543236', marginTop: 30 }}>WHERE IKAT BLOOMS IN MOTION</Text>
          </View>

          <Image
            source={require('../assets/collections/Placeholder Image.png')}
            style={{
              marginTop: 55
            }}
          />
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
          </View>
        )}
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

        <View style={styles.explore}>

          <TouchableOpacity style={{ alignItems: 'center', marginRight: 100 }}>
            <Image
              source={require('../assets/store/Placeholder Image-Long.png')}
            />
            <Text style={{ position: 'absolute', top: 650, fontSize: 20, fontFamily: FONT_FAMILIES.THESEASONS_LIGHT }}>Men's Collection</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', marginLeft: 100 }}>
            <Image
              source={require('../assets/store/Placeholder Image-Long.png')}
            />
            <Text style={{ position: 'absolute', top: 650, fontSize: 20, fontFamily: FONT_FAMILIES.THESEASONS_LIGHT }}>Women's Collection</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 100, alignItems: 'center', paddingTop: 25 }}>
          <Image
            source={require('../assets/collections/Placeholder Image-Wide.png')}
            style={{
              width: width
            }}
          />
          <View style={{ position: 'absolute', top:'25%', alignItems:'center' }}>
            {['Men', 'Women', 'Boys', 'Girls', 'Lifestyle'].map((label, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  marginVertical: isMobile ? 5 : 0
                }}
              >
                <Text
                  style={{ 
                    fontSize: isMobile ? 22 : 28,
                    fontFamily:FONT_FAMILIES.THESEASONS_LIGHT,
                    marginTop:25
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

          <Footer/>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  explore: {
    marginVertical: 100,
    marginHorizontal: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  firstProductsRow: {
    marginTop: 40,
    alignItems: 'center'
  },
  productsContainer: {

  },
  secondDemosView: {
    alignItems: 'center',
    marginVertical: 100,
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
  craftedView: {
    backgroundColor: '#FCF4E3',
    paddingHorizontal: 100,
    paddingVertical: 100,
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