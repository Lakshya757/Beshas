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
} from "react-native";

import { useFonts, FONT_FAMILIES } from "../components/Fonts";
import CustomLine from "./CustomLine";

export default function Footer() {
  const { fontsLoaded } = useFonts();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      {/* First Row */}
      <View
        style={[
          styles.firstRow,
          {
            flexDirection: isMobile ? "column" : "row",
            marginHorizontal: isMobile ? 20 : 120,
            alignItems: isMobile ? "center" : "flex-start",
          },
        ]}
      >
        {/* Logo + Columns */}
        <View
          style={{
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          <Image
            source={require("../assets/home/Footer/footer-logo.svg")}
            style={{ marginBottom: isMobile ? 20 : 0 }}
          />

          {/* Connect With Us */}
          <View
            style={[
              styles.colView,
              {
                marginHorizontal: isMobile ? 20 : 90,
                alignItems: isMobile ? "center" : "flex-start",
              },
            ]}
          >
            <Text style={styles.colTopText}>Connect With Us</Text>
            {["About Us", "Shop Now", "Our Story", "Contact Us", "FAQs"].map(
              (item, i) => (
                <TouchableOpacity key={i} style={styles.colTopButton}>
                  <Text style={styles.colTopButtonText}>{item}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Follow Us */}
          <View
            style={[
              styles.colView,
              {
                marginHorizontal: isMobile ? 20 : 90,
                alignItems: isMobile ? "center" : "flex-start",
              },
            ]}
          >
            <Text style={styles.colTopText}>Follow Us</Text>
            {["Instagram", "Facebook", "Twitter", "Pinterest", "Youtube"].map(
              (item, i) => (
                <TouchableOpacity key={i} style={styles.colTopButton}>
                  <Text style={styles.colTopButtonText}>{item}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Stay Updated */}
          <View
            style={[
              styles.colView,
              {
                marginHorizontal: isMobile ? 20 : 90,
                alignItems: isMobile ? "center" : "flex-start",
              },
            ]}
          >
            <Text style={styles.colTopText}>Stay Updated</Text>
            {[
              "Special Offers",
              "New Arrivals",
              "Exclusive Access",
              "VIP Club",
              "FAQs",
            ].map((item, i) => (
              <TouchableOpacity key={i} style={styles.colTopButton}>
                <Text style={styles.colTopButtonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Subscribe Section */}
        <View
          style={[
            styles.colView,
            {
              marginTop: isMobile ? 30 : 0,
              alignItems: isMobile ? "center" : "flex-start",
            },
          ]}
        >
          <Text style={styles.colTopText}>Subscribe</Text>
          <Text
            style={[
              styles.colTopButtonText,
              {
                flexWrap: "wrap",
                width: isMobile ? "90%" : 430,
                textAlign: isMobile ? "center" : "left",
              },
            ]}
          >
            Join our newsletter to stay updated on our latest features and
            releases.
          </Text>
          <View
            style={{
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              marginTop: 30,
              width: isMobile ? "100%" : "auto",
            }}
          >
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={"rgba(255,255,255,0.6)"}
              selectionColor={"#FCF4E3"}
              style={{
                borderBottomColor: "rgba(255,255,255,0.2)",
                borderBottomWidth: 1,
                paddingVertical: 12,
                fontSize: 15,
                outlineWidth: 0,
                color: "#FCF4E3",
                width: isMobile ? "90%" : 327,
                textAlign: isMobile ? "center" : "left",
                ...Platform.select({
                  web: {
                    caretColor: "rgba(255,255,255,0.2)",
                  },
                }),
              }}
            />
            <TouchableOpacity
              style={{
                borderWidth: 1.5,
                borderColor: "#FCF4E3",
                borderRadius: 13,
                marginTop: isMobile ? 15 : 0,
                marginLeft: isMobile ? 0 : 18,
              }}
            >
              <Text
                style={{
                  color: "#FCF4E3",
                  fontFamily: FONT_FAMILIES.NUNITO_SANS,
                  paddingVertical: 7,
                  paddingHorizontal: 14,
                  borderRadius: 13,
                  fontSize: 16,
                }}
              >
                Join
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={{ alignItems: "center" }}>
        <CustomLine
          color="rgba(255,255,255,0.2)"
          thickness={1}
          length={width - (isMobile ? 40 : 150)}
        />
      </View>

      {/* Ending Section */}
      <View
        style={[
          styles.ending,
          {
            flexDirection: isMobile ? "column" : "row",
            marginHorizontal: isMobile ? 20 : 120,
            alignItems: "center",
          },
        ]}
      >
        {/* Left side */}
        <View
          style={{
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            marginBottom: isMobile ? 20 : 0,
          }}
        >
          <Text
            style={{
              color: "#FCF4E3",
              marginRight: isMobile ? 0 : 50,
              fontFamily: FONT_FAMILIES.NUNITO_SANS,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            © 2024 BÉSHAs. All rights reserved.
          </Text>
          {["Privacy Policy", "Terms & Conditions", "Cookie Settings"].map(
            (item, i) => (
              <TouchableOpacity key={i} style={styles.endingLink}>
                <Text style={styles.endingLinksText}>{item}</Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Right side - Socials */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >          <TouchableOpacity style={{marginHorizontal:10}}>
            <Image
              source={require('../assets/home/Footer/fb.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:10}}>
            <Image
              source={require('../assets/home/Footer/insta.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:10}}>
            <Image
              source={require('../assets/home/Footer/twitter.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:10}}>
            <Image
              source={require('../assets/home/Footer/linkedin.svg')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal:10}}>
            <Image
              source={require('../assets/home/Footer/yt.svg')}
            />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  endingLink: {
    marginHorizontal: 30,
  },
  endingLinksText: {
    textDecorationLine: "underline",
    color: "#FCF4E3",
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
    fontWeight: "200",
  },
  ending: {
    marginTop: 39,
    marginBottom: 70,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colTopButton: {
    marginBottom: 18,
  },
  colTopButtonText: {
    color: "#FCF4E3",
    fontSize: 15,
    fontFamily: FONT_FAMILIES.NUNITO_SANS,
    letterSpacing: 0.6,
    fontWeight: "100",
  },
  colTopText: {
    color: "#FCF4E3",
    fontSize: 20,
    fontFamily: FONT_FAMILIES.FUTURA_LIGHT,
    marginBottom: 27,
  },
  colView: {
    marginHorizontal: 90,
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  container: {
    backgroundColor: "#2C3540",
    paddingTop: 90,
  },
});
