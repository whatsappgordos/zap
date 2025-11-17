/**
 * GOOGLE MAPS FRONTEND INTEGRATION - ESSENTIAL GUIDE
 *
 * USAGE FROM PARENT COMPONENT:
 * ======
 *
 * const mapRef = useRef<google.maps.Map | null>(null);
 *
 * <MapView
 *   initialCenter={{ lat: 40.7128, lng: -74.0060 }}
 *   initialZoom={15}
 *   onMapReady={(map) => {
 *     mapRef.current = map; // Store to control map from parent anytime, google map itself is in charge of the re-rendering, not react state.
 * </MapView>
 *
 * ======
 * Available Libraries and Core Features:
 * -------------------------------
 * 📍 MARKER (from `marker` library)
 * - Attaches to map using { map, position }
 * new google.maps.marker.AdvancedMarkerElement({
 *   map,
 *   position: { lat: 37.7749, lng: -122.4194 },
 *   title: "San Francisco",
 * });
 *
 * -------------------------------
 * 🏢 PLACES (from `places` library)
 * - Does not attach directly to map; use data with your map manually.
 * const place = new google.maps.places.Place({ id: PLACE_ID });
 * await place.fetchFields({ fields: ["displayName", "location"] });
 * map.setCenter(place.location);
 * new google.maps.marker.AdvancedMarkerElement({ map, position: place.location });
 *
 * -------------------------------
 * 🧭 GEOCODER (from `geocoding` library)
 * - Standalone service; manually apply results to map.
 * const geocoder = new google.maps.Geocoder();
 * geocoder.geocode({ address: "New York" }, (results, status) => {
 *   if (status === "OK" && results[0]) {
 *     map.setCenter(results[0].geometry.location);
 *     new google.maps.marker.AdvancedMarkerElement({
 *       map,
 *       position: results[0].geometry.location,
 *     });
 *   }
 * });
 *
 * -------------------------------
 * 📐 GEOMETRY (from `geometry` library)
 * - Standalone service; use for calculations.
 * const distance = google.maps.geometry.spherical.computeDistanceBetween(
 *   new google.maps.LatLng(37.7749, -122.4194),
 *   new google.maps.LatLng(40.7128, -74.0060)
 * );
 *
 * ======
 * CRITICAL NOTES:
 * - Do NOT use `useEffect` to attach listeners; use map.addListener() directly
 * - Do NOT use React state to manage map state; Google Maps manages it
 * - Do NOT recreate map on every render; use useCallback to memoize init function
 * - Do NOT call setState inside map listeners; use refs or direct DOM updates
 * - The proxy handles all API authentication; no API key needed
 */

import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    google: any;
  }
}

interface MapViewProps {
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onMapReady?: (map: any) => void;
  motelData?: {
    name: string;
    distance: string;
    rating: string;
    latitude: number;
    longitude: number;
  };
}

export function MapView({
  initialCenter = { lat: 40.7128, lng: -74.006 },
  initialZoom = 12,
  onMapReady,
  motelData,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const infoWindowRef = useRef<any>(null);

  const init = useCallback(async () => {
    if (!containerRef.current || !window.google) return;
    if (map.current) return; // Prevent re-initialization

    // Initialize map
    map.current = new window.google.maps.Map(containerRef.current, {
      zoom: initialZoom,
      center: initialCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      mapId: "DEMO_MAP_ID",
    });

    // Adicionar marcador do motel se os dados forem fornecidos
    if (motelData && window.google?.maps?.marker?.AdvancedMarkerElement) {
      const motelPosition = {
        lat: motelData.latitude,
        lng: motelData.longitude,
      };

      // Criar conteudo da InfoWindow
      const infoContent = document.createElement("div");
      infoContent.style.padding = "12px";
      infoContent.style.fontFamily = "Arial, sans-serif";
      infoContent.style.maxWidth = "250px";
      infoContent.innerHTML = `
        <div>
          <h3 style="margin: 0 0 8px 0; color: #d32f2f; font-size: 16px;">${motelData.name}</h3>
          <p style="margin: 4px 0; color: #666; font-size: 14px;">
            <strong>Distancia:</strong> ${motelData.distance}
          </p>
          <p style="margin: 4px 0; color: #666; font-size: 14px;">
            <strong>Avaliacao:</strong> ⭐ ${motelData.rating}
          </p>
        </div>
      `;

      infoWindowRef.current = new window.google.maps.InfoWindow({
        content: infoContent,
      });

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: map.current,
        position: motelPosition,
        title: motelData.name,
      });

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.open({
            anchor: marker,
            map: map.current,
          });
        }
      });

      // Centralizar mapa no motel
      map.current.setCenter(motelPosition);
      map.current.setZoom(15);
    }

    if (onMapReady) {
      onMapReady(map.current);
    }
  }, [initialCenter, initialZoom, onMapReady, motelData]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
}
