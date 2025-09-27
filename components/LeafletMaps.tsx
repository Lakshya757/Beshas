// LeafletMaps.tsx - Order Tracking Map Implementation
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';

// Order tracking data - matching OrderProgress component
import { ORDER_STAGES } from './OrderProgress';
// const ORDER_STAGES = [
//   {
//     id: 1,
//     title: 'Order Placed',
//     icon: 'bag-outline',
//     completed: false,
//     current: true,
//     location: { lat: 28.6139, lng: 77.2090, name: 'New Delhi' }
//   },
//   {
//     id: 2,
//     title: 'Dispatched',
//     icon: 'cube-outline',
//     completed: false,
//     current: false,
//     location: { lat: 28.7041, lng: 77.1025, name: 'Warehouse, Delhi' }
//   },
//   {
//     id: 3,
//     title: 'In Transit',
//     icon: 'car-outline',
//     completed: false,
//     current: false,
//     location: { lat: 26.9124, lng: 80.9420, name: 'Lucknow Hub' }
//   },
//   {
//     id: 4,
//     title: 'Delivered',
//     icon: 'home-outline',
//     completed: false,
//     current: false,
//     location: { lat: 26.8467, lng: 80.9462, name: 'Your Location, Lucknow' }
//   },
// ];

declare global {
  interface Window {
    L: any;
  }
}

const LeafletMaps: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routeLineRef = useRef<any>(null);

  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [isLibraryLoading, setIsLibraryLoading] = useState<boolean>(true);

  // Load Leaflet library
  const loadLeafletLibrary = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.L) {
        resolve();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      cssLink.crossOrigin = '';
      document.head.appendChild(cssLink);

      // Load JavaScript
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsLibraryLoading(false);
        resolve();
      };

      script.onerror = () => {
        setIsLibraryLoading(false);
        reject(new Error('Failed to load Leaflet library'));
      };

      document.head.appendChild(script);
    });
  };

  // Initialize map
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const initializeMap = async () => {
      try {
        await loadLeafletLibrary();
        if (mapRef.current && window.L) {
          createMap();
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
        setIsLibraryLoading(false);
      }
    };

    initializeMap();
  }, []);

  // Create the map instance
  const createMap = (): void => {
    if (!mapRef.current || !window.L) return;

    // Create map centered on India, focusing on the route
    const map = window.L.map(mapRef.current, {
      center: [27.5, 79.0], // Centered between Delhi and Lucknow
      zoom: 7,
      zoomControl: true,
      attributionControl: true,
    });

    // Add OpenStreetMap tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;
    setIsMapLoaded(true);
    setIsLibraryLoading(false);
  };

  // Update markers when map loads
  useEffect(() => {
    if (isMapLoaded && leafletMapRef.current) {
      updateOrderTrackingMarkers();
    }
  }, [isMapLoaded]);

  // Clear existing markers and add order tracking markers
  const updateOrderTrackingMarkers = (): void => {
    // Clear existing markers
    markersRef.current.forEach((marker: any) => {
      leafletMapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Clear existing route line
    if (routeLineRef.current) {
      leafletMapRef.current.removeLayer(routeLineRef.current);
    }

    // Create route line connecting all locations
    const routeCoordinates = ORDER_STAGES.map(stage => [stage.location.lat, stage.location.lng]);
    
    // Add route line with different colors for completed vs pending segments
    const completedStages = ORDER_STAGES.filter(stage => stage.completed);
    if (completedStages.length > 1) {
      const completedCoords = completedStages.map(stage => [stage.location.lat, stage.location.lng]);
      const completedRoute = window.L.polyline(completedCoords, {
        color: '#4CAF50',
        weight: 4,
        opacity: 0.8
      });
      completedRoute.addTo(leafletMapRef.current);
    }

    // Add pending route segments
    const currentIndex = ORDER_STAGES.findIndex(stage => stage.current);
    if (currentIndex > 0 && currentIndex < ORDER_STAGES.length - 1) {
      const pendingCoords = ORDER_STAGES.slice(currentIndex).map(stage => [stage.location.lat, stage.location.lng]);
      const pendingRoute = window.L.polyline(pendingCoords, {
        color: '#E85A4F',
        weight: 3,
        opacity: 0.6,
        dashArray: '10, 10'
      });
      pendingRoute.addTo(leafletMapRef.current);
    }

    // Add markers for each order stage
    ORDER_STAGES.forEach((stage, index) => {
      // Determine marker color and style based on status
      let markerColor = '#A0A0A0'; // Default for pending
      let markerSize = 'medium';

      // Map Ionicons to SVG paths for minimalist icons
      const iconMap = {
        'bag-outline': `<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
          <path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.08 72.08 0 0072-72V192a32 32 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm240 296a40 40 0 01-40 40H120a40 40 0 01-40-40V192h48v24a16 16 0 0032 0v-24h192v24a16 16 0 0032 0v-24h48z"/>
        </svg>`,
        'cube-outline': `<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 48L96 112v288l160 64 160-64V112L256 48z"/>
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M96 112l160 64 160-64M256 176v288"/>
        </svg>`,
        'car-outline': `<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M80 224l37.78-88.15C125.93 109.19 149.81 96 176 96h160c26.19 0 50.07 13.19 58.22 39.85L432 224M80 224h352v144a32 32 0 01-32 32H320v-32h-32v32h-64v-32h-32v32H160a32 32 0 01-32-32V224z"/>
          <circle cx="144" cy="288" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
          <circle cx="368" cy="288" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>`,
        'home-outline': `<svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor">
          <path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
          <path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>`
      };

      const iconSvg = iconMap[stage.icon as keyof typeof iconMap] || `<svg width="19" height="19" viewBox="0 0 512 512" fill="currentColor"><circle cx="270" cy="270" r="2"/></svg>`;

      if (stage.completed) {
        markerColor = '#4CAF50'; // Green for completed
      } else if (stage.current) {
        markerColor = '#E85A4F'; // Red for current
        markerSize = 'large';
      }

      // Create custom marker icon
      const customIcon = window.L.divIcon({
        className: 'custom-order-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            width: ${markerSize === 'large' ? '40px' : '32px'};
            height: ${markerSize === 'large' ? '40px' : '32px'};
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            position: relative;
            ${stage.current ? 'animation: pulse 2s infinite;' : ''}
          ">
            ${iconSvg}
          </div>
          ${stage.current ? `
            <div style="
              position: absolute;
              top: -3px;
              left: -3px;
              width: ${markerSize === 'large' ? '46px' : '38px'};
              height: ${markerSize === 'large' ? '46px' : '38px'};
              border-radius: 50%;
              border: 2px solid ${markerColor};
              opacity: 0.6;
              animation: ripple 2s infinite;
            "></div>
          ` : ''}
        `,
        iconSize: [markerSize === 'large' ? 40 : 32, markerSize === 'large' ? 40 : 32],
        iconAnchor: [markerSize === 'large' ? 20 : 16, markerSize === 'large' ? 20 : 16]
      });

      const marker = window.L.marker([stage.location.lat, stage.location.lng], {
        icon: customIcon
      });

      // Create popup content with stage-specific styling
      const statusText = stage.completed ? 'Completed' : stage.current ? 'In Progress' : 'Pending';
      const statusColor = stage.completed ? '#4CAF50' : stage.current ? '#E85A4F' : '#A0A0A0';

      const popupContent = `
        <div style="
          font-family: 'Futura', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          min-width: 220px; 
          padding: 12px;
        ">
          <div style="
            display: flex;
            align-items: center;
            margin-bottom: 8px;
          ">
            <div style="
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: ${statusColor};
              margin-right: 8px;
            "></div>
            <span style="
              font-size: 11px;
              color: ${statusColor};
              font-weight: 600;
              text-transform: uppercase;
            ">${statusText}</span>
          </div>
          
          <h3 style="
            margin: 0 0 8px 0; 
            font-size: 16px; 
            color: #412023; 
            font-weight: 600;
          ">${stage.title}</h3>
          
          <p style="
            margin: 0 0 8px 0; 
            font-size: 14px; 
            color: #5D4037; 
            line-height: 1.4;
          ">${stage.location.name}</p>
          
          <p style="
            margin: 0; 
            font-size: 12px; 
            color: #8D6E63; 
            font-family: monospace;
          ">
            ${stage.location.lat.toFixed(4)}, ${stage.location.lng.toFixed(4)}
          </p>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(leafletMapRef.current);
      markersRef.current.push(marker);
    });

    // Add CSS animations
    if (!document.getElementById('marker-animations')) {
      const style = document.createElement('style');
      style.id = 'marker-animations';
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes ripple {
          0% { 
            transform: scale(1);
            opacity: 0.6;
          }
          100% { 
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Show error for non-web platforms
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            This Order Tracking Map is designed for React Native Web.
            {'\n\n'}
            For mobile platforms, consider using react-native-leaflet or similar libraries.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Map Container */}
      <View style={styles.mapContainer}>
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            minWidth: '400px',
            minHeight: '500px',
            borderRadius: '8px',
            border: '1px solid #D7CCC8'
          }}
        />

        {/* Loading State */}
        {(isLibraryLoading || !isMapLoaded) && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>
              {isLibraryLoading ? 'Loading Order Tracking...' : 'Initializing Map...'}
            </Text>
            <Text style={styles.loadingSubtext}>
              Preparing your delivery tracking map
            </Text>
          </View>
        )}

        {/* Map Legend */}
        {isMapLoaded && (
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.legendText}>Completed</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E85A4F' }]} />
              <Text style={styles.legendText}>Current</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#A0A0A0' }]} />
              <Text style={styles.legendText}>Pending</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(65, 32, 35, 0.15)',
      },
      default: {
        elevation: 4,
        shadowColor: '#412023',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
    }),
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    minHeight: 500,
    margin: 12,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 244, 227, 0.95)',
    zIndex: 1000,
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#412023',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 12,
    color: '#8D6E63',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#8D6E63',
    textAlign: 'center',
    lineHeight: 24,
  },
  legendContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(252, 244, 227, 0.95)',
    borderRadius: 8,
    padding: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  legendText: {
    fontSize: 12,
    color: '#412023',
    fontWeight: '500',
  },
});

export default LeafletMaps;