import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import { FONT_FAMILIES } from './Fonts';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
// Version with smooth animation using Animated
const AnimatedFAQDropdown = ({ question, answer, isExpanded, onToggle, qDex }: any) => {
  const [animation] = useState(new Animated.Value(isExpanded ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded]);

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Adjust based on your content
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.faqContainer, {
      borderTopWidth: qDex=='1'?1:0,
      borderTopColor: 'rgba(67, 40, 43,1)',
    }]}>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Image
          source={isExpanded
            ? require('../assets/icons/chevron-up-outline.svg')
            : require('../assets/icons/chevron-forward-outline.svg')
          }
          style={{
            height: 25,
            width: 25,
            tintColor: '#412023'
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.answerContainer,
          {
            height: heightInterpolate,
            opacity: opacityInterpolate,
          }
        ]}
      >
        <Text style={styles.answerText}>{answer}</Text>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  faqContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#43282B',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 19,
    fontWeight: '500',
    color: '#412023',
    flex: 1,
    marginRight: 15,
  },
  answerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  answerText: {
    fontSize: 16,
    color: '#412023',
    lineHeight: 20,
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
  },

});
export default AnimatedFAQDropdown;