import React, { useEffect, useRef } from 'react';

const RestaurantMapComponent = ({ restaurants }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.google) {
      console.error("Google Maps JavaScript API is not loaded.");
      return;
    }
    if (!restaurants || !Array.isArray(restaurants)) {
      console.error("restaurants is not an array or not defined:", restaurants);
      return;
    }

    let defaultCenter = { lat: 25.0330, lng: 121.5654 };
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 12,
      center: defaultCenter,
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }, (error) => {
        console.error("Geolocation error:", error);
      });
    }

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    restaurants.forEach(restaurant => {
      if (restaurant.latitude && restaurant.longitude) {
        const marker = new window.google.maps.Marker({
          position: { lat: restaurant.latitude, lng: restaurant.longitude },
          map: map,
          title: restaurant.name,
        });
        marker.addListener('click', () => {
          window.alert(`Selected: ${restaurant.name}`);
        });
        markersRef.current.push(marker);
      }
    });
  }, [restaurants]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default RestaurantMapComponent;
