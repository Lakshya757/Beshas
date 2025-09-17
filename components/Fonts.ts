// hooks/useFonts.ts
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

// Define font family names as constants for better type safety
export const FONT_FAMILIES = {
  THESEASONS_MEDIUM: 'TheSeasons-Medium',
  THESEASONS_LIGHT: 'TheSeasons-Light',
  FUTURA_MEDIUM: 'Futura-Medium',
  FUTURA_BOOK: 'Futura-Book',
  FUTURA_LIGHT: 'Futura-Light',
  NUNITO_SANS:'Nunito-Sans'
} as const;

// Font map for loading
const FONT_MAP = {
  [FONT_FAMILIES.THESEASONS_MEDIUM]: require('../fonts/The-Seasons/Fontspring-DEMO-theseasons-reg.otf'),
  [FONT_FAMILIES.THESEASONS_LIGHT]: require('../fonts/The-Seasons/Fontspring-DEMO-theseasons-lt.otf'),
  [FONT_FAMILIES.FUTURA_MEDIUM]: require('../fonts/Futura/FuturaStdMedium.otf'),
  [FONT_FAMILIES.FUTURA_BOOK]: require('../fonts/Futura/FuturaStdBook.otf'),
  [FONT_FAMILIES.FUTURA_LIGHT]: require('../fonts/Futura/FuturaStdLight.otf'),
  [FONT_FAMILIES.NUNITO_SANS]: require('../fonts/Nunito-Sans/NunitoSans.ttf'),
};

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync(FONT_MAP);
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Set to true to prevent infinite loading
      }
    }

    loadFonts();
  }, []);

  return { fontsLoaded };
};

// Utility function to get font family with fallback
export const getFontFamily = (fontFamily: keyof typeof FONT_FAMILIES, fallback: string = 'System'): string => {
  return FONT_FAMILIES[fontFamily] || fallback;
};