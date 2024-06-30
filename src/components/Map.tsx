import {
  Map,
  APIProvider,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "../services/geolocation";

const Maps = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentLocation()
      .then((location) => {
        setLocation(location);
      })
      .catch((error) => {
        console.error("Error getting location", error);
        setError("Error getting location");
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <div className="map-container">
      <APIProvider
        apiKey={"AIzaSyAf8saf84jOHdc3hRPRWlohg8jMboERkd8"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: location.latitude, lng: location.longitude }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log(
              "camera changed:",
              ev.detail.center,
              "zoom:",
              ev.detail.zoom
            )
          }
        ></Map>
      </APIProvider>
    </div>
  );
};

export default Maps;
