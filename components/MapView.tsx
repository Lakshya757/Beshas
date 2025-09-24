import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function MapComponent() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [driverLocation, setDriverLocation] = useState({
    latitude: -6.200000, // Default latitude (Jakarta)
    longitude: 106.816666, // Default longitude (Jakarta)
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setDriverLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.warn('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const toggleAvailability = () => {
    setIsAvailable((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      {/* Driver Info Section */}
      <View style={styles.driverInfo}>
        <View style={styles.driverRow}>
          <Ionicons name="person-outline" size={20} color="#412023" />
          <Text style={styles.driverText}>Driver: John Doe</Text>
        </View>
        <View style={styles.driverRow}>
          <Ionicons name="car-outline" size={20} color="#412023" />
          <Text style={styles.driverText}>Vehicle: Toyota Prius</Text>
        </View>
      </View>

      {/* Availability Toggle */}
      <View style={styles.toggleContainer}>
        <View style={styles.availabilityRow}>
          <Ionicons 
            name={isAvailable ? "checkmark-circle" : "close-circle"} 
            size={20} 
            color={isAvailable ? "#28a745" : "#dc3545"} 
          />
          <Text style={[styles.toggleText, { color: isAvailable ? "#28a745" : "#dc3545" }]}>
            {isAvailable ? 'Available for Orders' : 'Currently Unavailable'}
          </Text>
        </View>
        <Switch value={isAvailable} onValueChange={toggleAvailability} />
      </View>

      {/* Map Placeholder with Location Info */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="location-outline" size={48} color="#412023" />
          <Text style={styles.mapTitle}>Live Location Tracking</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Current Location:</Text>
            <Text style={styles.locationCoords}>
              {driverLocation.latitude.toFixed(4)}, {driverLocation.longitude.toFixed(4)}
            </Text>
          </View>
          <View style={styles.statusIndicator}>
            <View style={[
              styles.statusDot, 
              { backgroundColor: isAvailable ? '#28a745' : '#dc3545' }
            ]} />
            <Text style={styles.statusText}>
              {isAvailable ? 'Online' : 'Offline'}
            </Text>
          </View>
          {Platform.OS === 'web' && (
            <Text style={styles.webNote}>
              Interactive map available on mobile devices
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
  },
  driverInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
    }),
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#412023',
    marginLeft: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
    }),
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    minHeight: 200,
  },
  mapPlaceholder: {
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderWidth: 2,
    borderColor: '#D1E9F6',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 20,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#412023',
    marginBottom: 16,
    marginTop: 8,
  },
  locationInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  locationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  locationCoords: {
    fontSize: 16,
    fontWeight: '600',
    color: '#412023',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#412023',
  },
  webNote: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
});