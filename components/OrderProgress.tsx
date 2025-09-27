import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONT_FAMILIES } from '../components/Fonts';


// Order tracking data
export const ORDER_STAGES = [
  {
    id: 1,
    title: 'Order Placed',
    icon: 'bag-outline',
    completed: true,
    current: false,
    location: { lat: 28.6139, lng: 77.2090, name: 'New Delhi' }
  },
  {
    id: 2,
    title: 'Dispatched',
    icon: 'cube-outline',
    completed: true,
    current: false,
    location: { lat: 28.7041, lng: 77.1025, name: 'Warehouse, Delhi' }
  },
  {
    id: 3,
    title: 'In Transit',
    icon: 'car-outline',
    completed: false,
    current: true,
    location: { lat: 26.9124, lng: 80.9420, name: 'Lucknow Hub' }
  },
  {
    id: 4,
    title: 'Delivered',
    icon: 'home-outline',
    completed: false,
    current: false,
    location: { lat: 26.8467, lng: 80.9462, name: 'Your Location, Lucknow' }
  },
];


const OrderTrackingProgress = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.progressContainer}>
      {/* Progress Header */}

      {/* Vertical Progress Steps */}
      <View style={styles.stepsContainer}>
        {ORDER_STAGES.map((stage, index) => (
          <View key={stage.id} style={styles.stepContainer}>
            {/* Step Icon and Connector */}
            <View style={styles.stepIconContainer}>
              {/* Step Circle */}
              <View style={[
                styles.stepCircle,
                stage.completed && styles.stepCircleCompleted,
                stage.current && styles.stepCircleCurrent
              ]}>
                <Ionicons
                // @ts-ignore
                  name={stage.icon} 
                  size={18} 
                  color={
                    stage.completed ? '#FCF4E3' : 
                    stage.current ? '#FCF4E3' : '#A0A0A0'
                  } 
                />
              </View>
              
              {/* Connector Line */}
              {index < ORDER_STAGES.length - 1 && (
                <View style={[
                  styles.connectorLine,
                  stage.completed && styles.connectorLineCompleted
                ]} />
              )}
            </View>

            {/* Step Content */}
            <View style={styles.stepContent}>
              <Text style={[
                styles.stepTitle,
                (stage.completed || stage.current) && styles.stepTitleActive
              ]}>
                {stage.title}
              </Text>
              <Text style={styles.stepLocation}>
                {stage.location.name}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Delivery Status */}
      {/* <View style={styles.deliveryStatus}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Estimated Delivery:</Text>
          <Text style={styles.statusValue}>Tomorrow, 2-4 PM</Text>
        </View>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Tracking ID:</Text>
          <Text style={styles.statusValue}>#TRK123456789</Text>
        </View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    // backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginRight: 20,
    minWidth: 280,
    maxWidth: 320,
    // shadowColor: '#000',
    // // shadowOffset: {
    // //   width: 0,
    // //   height: 2,
    // // },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 25,
    // paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  statusIcon: {
    width: 40,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#FCF4E3',
    borderWidth: 2,
    borderColor: '#E85A4F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_MEDIUM,
    fontSize: 18,
    color: '#412023',
    fontWeight: '600',
  },
  stepsContainer: {
    // marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 60,
  },
  stepIconContainer: {
    alignItems: 'center',
    marginRight: 15,
    minHeight: '100%',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepCircleCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  stepCircleCurrent: {
    backgroundColor: '#E85A4F',
    borderColor: '#E85A4F',
  },
  connectorLine: {
    width: 2,
    height: 100,
    backgroundColor: '#E0E0E0',
    marginTop: 4,
  },
  connectorLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepContent: {
    flex: 1,
    paddingTop: 6,
  },
  stepTitle: {
    fontFamily: FONT_FAMILIES.THESEASONS_LIGHT,
    fontSize: 18,
    color: '#A0A0A0',
    marginBottom: 2,
  },
  stepTitleActive: {
    color: '#412023',
    fontWeight: '600',
  },
  stepLocation: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 12,
    color: '#999',
  },
  deliveryStatus: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusLabel: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 12,
    color: '#666',
  },
  statusValue: {
    fontFamily: FONT_FAMILIES.FUTURA_BOOK,
    fontSize: 12,
    color: '#412023',
    fontWeight: '600',
  },
});

export default OrderTrackingProgress;