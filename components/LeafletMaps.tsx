// LeafletMaps.tsx - Support Page Themed OpenStreetMap Implementation
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Platform 
} from 'react-native';

// TypeScript interfaces
interface Coordinate {
  latitude: number;
  longitude: number;
}

interface MarkerData {
  id: number;
  coordinate: Coordinate;
  title: string;
  description: string;
}

declare global {
  interface Window {
    L: any;
  }
}

const LeafletMaps: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: 1,
      coordinate: { latitude: 26.8467, longitude: 80.9462 },
      title: 'Lucknow',
      description: 'Capital of Uttar Pradesh'
    },
    {
      id: 2,
      coordinate: { latitude: 28.6139, longitude: 77.2090 },
      title: 'New Delhi',
      description: 'Capital of India'
    }
  ]);

  const [newMarkerTitle, setNewMarkerTitle] = useState<string>('');
  const [newMarkerDescription, setNewMarkerDescription] = useState<string>('');
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

    // Create map centered on India
    const map = window.L.map(mapRef.current, {
      center: [26.8467, 80.9462],
      zoom: 6,
      zoomControl: true,
      attributionControl: true,
    });

    // Add OpenStreetMap tile layer (completely free)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    leafletMapRef.current = map;
    setIsMapLoaded(true);
    setIsLibraryLoading(false);

    // Add click listener for adding markers
    map.on('click', (e: any) => {
      handleMapClick(e);
    });
  };

  // Update markers when state changes
  useEffect(() => {
    if (isMapLoaded && leafletMapRef.current) {
      updateMapMarkers();
    }
  }, [markers, isMapLoaded]);

  // Clear existing markers and add new ones
  const updateMapMarkers = (): void => {
    // Clear existing markers
    markersRef.current.forEach((marker: any) => {
      leafletMapRef.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData: MarkerData) => {
      const marker = window.L.marker([
        markerData.coordinate.latitude, 
        markerData.coordinate.longitude
      ]);

      // Create popup content with support theme colors
      const popupContent = `
        <div style="font-family: 'Futura', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 200px; background: #FCF4E3; border-radius: 8px; padding: 4px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #412023; font-weight: 600;">${markerData.title}</h3>
          <p style="margin: 0 0 8px 0; font-size: 14px; color: #5D4037; line-height: 1.4;">${markerData.description}</p>
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #8D6E63; font-family: monospace;">
            ${markerData.coordinate.latitude.toFixed(4)}, ${markerData.coordinate.longitude.toFixed(4)}
          </p>
          <button 
            onclick="removeMarkerGlobal(${markerData.id})" 
            style="
              background: #E85A4F; 
              color: #FCF4E3; 
              border: none; 
              padding: 6px 12px; 
              border-radius: 4px; 
              cursor: pointer;
              font-size: 12px;
              font-weight: 500;
              transition: background-color 0.3s ease;
            "
            onmouseover="this.style.background='#D32F2F'"
            onmouseout="this.style.background='#E85A4F'"
          >
            Remove Marker
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.addTo(leafletMapRef.current);
      markersRef.current.push(marker);
    });
  };


  const newMarkerTitleRef = useRef(newMarkerTitle);

// Keep ref updated with latest value
useEffect(() => {
  newMarkerTitleRef.current = newMarkerTitle;
}, [newMarkerTitle]);

  // Handle map click to add new markers
const handleMapClick = (e: any): void => {
  const title = newMarkerTitleRef.current.trim();
  if (title) {
    const newMarker: MarkerData = {
      id: Date.now(),
      coordinate: {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      },
      title,
      description: newMarkerDescription.trim() || 'Custom marker'
    };
    
    setMarkers(prevMarkers => [...prevMarkers, newMarker]);
    setNewMarkerTitle('');
    setNewMarkerDescription('');
    
    alert(`Added marker "${title}" at the selected location`);
  } else {
    alert('Please enter a title for the marker before clicking on the map');
  }
};

  // Set up global remove function
  useEffect(() => {
    if (Platform.OS === 'web') {
      (window as any).removeMarkerGlobal = (markerId: number) => {
        removeMarker(markerId);
      };
    }
    
    return () => {
      if (Platform.OS === 'web') {
        delete (window as any).removeMarkerGlobal;
      }
    };
  }, [markers]);

  // Remove a specific marker
  const removeMarker = (markerId: number): void => {
    setMarkers(prevMarkers => prevMarkers.filter(marker => marker.id !== markerId));
    alert('Marker has been removed from the map');
  };

  // Zoom to a specific location
  const zoomToLocation = (coordinate: Coordinate): void => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([coordinate.latitude, coordinate.longitude], 15);
    }
  };

  // Clear all markers
  const clearAllMarkers = (): void => {
    setMarkers([]);
    alert('All markers cleared');
  };

  // Add different map layers
  const changeMapLayer = (layerType: string): void => {
    if (!leafletMapRef.current) return;

    // Remove existing tile layers
    leafletMapRef.current.eachLayer((layer: any) => {
      if (layer instanceof window.L.TileLayer) {
        leafletMapRef.current.removeLayer(layer);
      }
    });

    let tileUrl = '';
    let attribution = '';

    switch (layerType) {
      case 'osm':
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        attribution = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
        break;
      case 'satellite':
        // Using free satellite imagery from Esri
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        attribution = '© <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics';
        break;
      case 'terrain':
        tileUrl = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        attribution = '© <a href="https://opentopomap.org/">OpenTopoMap</a> contributors';
        break;
      default:
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        attribution = '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    }

    window.L.tileLayer(tileUrl, {
      attribution: attribution,
      maxZoom: 19,
    }).addTo(leafletMapRef.current);
  };

  // Show error for non-web platforms
  if (Platform.OS !== 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            This Leaflet Maps implementation is designed for React Native Web.
            {'\n\n'}
            For mobile platforms, consider using react-native-leaflet or similar libraries.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Order Tracking Map</Text>
        <Text style={styles.subtitle}>
          Track your delivery • Add custom locations • Fully integrated support
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        {/* Input Controls */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Location Name"
            value={newMarkerTitle}
            onChangeText={setNewMarkerTitle}
            placeholderTextColor="#8D6E63"
          />
          <TextInput
            style={styles.input}
            placeholder="Description (Optional)"
            value={newMarkerDescription}
            onChangeText={setNewMarkerDescription}
            placeholderTextColor="#8D6E63"
          />
        </View>

        {/* Map Type Controls */}
        <View style={styles.mapTypeContainer}>
          <TouchableOpacity 
            style={styles.mapTypeButton} 
            onPress={() => changeMapLayer('osm')}
          >
            <Text style={styles.mapTypeText}>Street</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.mapTypeButton} 
            onPress={() => changeMapLayer('satellite')}
          >
            <Text style={styles.mapTypeText}>Satellite</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.mapTypeButton} 
            onPress={() => changeMapLayer('terrain')}
          >
            <Text style={styles.mapTypeText}>Terrain</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.clearButton, 
              markers.length === 0 && styles.clearButtonDisabled
            ]} 
            onPress={clearAllMarkers}
            disabled={markers.length === 0}
          >
            <Text style={[
              styles.clearButtonText,
              markers.length === 0 && styles.clearButtonTextDisabled
            ]}>
              Clear All
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            minHeight: '400px',
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
      </View>

      {/* Marker List */}
      <View style={styles.markerListContainer}>
        <View style={styles.markerListHeader}>
          <Text style={styles.listTitle}>Tracked Locations ({markers.length})</Text>
        </View>
        <ScrollView style={styles.markerScrollContainer}>
          {markers.map((marker: MarkerData) => (
            <TouchableOpacity
              key={marker.id}
              style={styles.markerItem}
              onPress={() => zoomToLocation(marker.coordinate)}
              activeOpacity={0.7}
            >
              <View style={styles.markerItemContent}>
                <Text style={styles.markerTitle}>{marker.title}</Text>
                <Text style={styles.markerDescription}>{marker.description}</Text>
                <Text style={styles.coordinates}>
                  📍 {marker.coordinate.latitude.toFixed(4)}, {marker.coordinate.longitude.toFixed(4)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeMarker(marker.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
          
          {markers.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No locations tracked yet</Text>
              <Text style={styles.emptySubtext}>
                Add a location name and click on the map to start tracking
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF4E3',
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
  header: {
    backgroundColor: '#412023',
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF4E3',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#D7CCC8',
    textAlign: 'center',
    lineHeight: 16,
  },
  controlsContainer: {
    backgroundColor: '#FCF4E3',
    borderBottomWidth: 1,
    borderBottomColor: '#D7CCC8',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: 'white',
    minHeight: 40,
    color: '#412023',
  },
  mapTypeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
    alignItems: 'center',
  },
  mapTypeButton: {
    backgroundColor: '#412023',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minHeight: 32,
    justifyContent: 'center',
  },
  mapTypeText: {
    color: '#FCF4E3',
    fontSize: 11,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#E85A4F',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minHeight: 32,
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  clearButtonDisabled: {
    backgroundColor: '#D7CCC8',
  },
  clearButtonText: {
    color: '#FCF4E3',
    fontSize: 11,
    fontWeight: '600',
  },
  clearButtonTextDisabled: {
    color: '#8D6E63',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    minHeight: 400,
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
  markerListContainer: {
    backgroundColor: '#FCF4E3',
    maxHeight: 200,
    borderTopWidth: 1,
    borderTopColor: '#D7CCC8',
  },
  markerListHeader: {
    backgroundColor: '#F3E5AB',
    borderBottomWidth: 1,
    borderBottomColor: '#D7CCC8',
  },
  listTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 12,
    color: '#412023',
  },
  markerScrollContainer: {
    maxHeight: 150,
  },
  markerItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  markerItemContent: {
    flex: 1,
  },
  markerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#412023',
    marginBottom: 2,
  },
  markerDescription: {
    fontSize: 12,
    color: '#8D6E63',
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 11,
    color: '#A1887F',
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: 'monospace',
      default: 'monospace',
    }),
  },
  deleteButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E85A4F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#FCF4E3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#8D6E63',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#A1887F',
    textAlign: 'center',
  },
});

export default LeafletMaps;