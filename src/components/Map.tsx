// src/components/Map.tsx
import React, { useEffect, useRef, useState } from "react";

interface Props {
  defaultZoom: number;
  defaultCenter: { lat: number; lng: number };
}

const Maps: React.FC<Props> = ({ defaultZoom, defaultCenter }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        zoom: defaultZoom,
        center: defaultCenter,
      });
      setMap(mapInstance);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            mapInstance.setCenter(userLocation);
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      }
    }
  }, [map, defaultZoom, defaultCenter]);

  return <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>;
};

export default Maps;
