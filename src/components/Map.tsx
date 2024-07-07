import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { getCurrentLocation } from "../services/geolocation";

const Maps: React.FC<{
  routeInfo: { start: string | null; miles: number | null };
}> = ({ routeInfo }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>(null);

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

  useEffect(() => {
    if (routeInfo.start && routeInfo.miles && location) {
      calculateAndDisplayRoute(routeInfo.start, routeInfo.miles);
    }
  }, [routeInfo, location]);

  const calculateAndDisplayRoute = (start: string, miles: number) => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    if (!location) return;

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 13,
        center: { lat: location.latitude, lng: location.longitude },
      }
    );

    directionsRenderer.setMap(map);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: start }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const startLatLng = results[0].geometry.location;
        const waypoints = generateWaypoints(startLatLng, miles);

        directionsService.route(
          {
            origin: startLatLng,
            destination: startLatLng,
            travelMode: google.maps.TravelMode.WALKING,
            waypoints,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
              setDirectionsResponse(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      } else {
        console.error(`Geocode error: ${status}`);
      }
    });
  };

  const generateWaypoints = (
    start: google.maps.LatLng,
    miles: number
  ): google.maps.DirectionsWaypoint[] => {
    const km = miles * 1.60934; // Convert miles to kilometers
    const numberOfWaypoints = 5; // Half of the original number of waypoints
    const waypoints: google.maps.DirectionsWaypoint[] = [];
    const distanceBetweenWaypoints = km / 4 / numberOfWaypoints;

    let totalDistance = 0;
    let currentPoint = start;

    for (let i = 0; i < numberOfWaypoints; i++) {
      const nextPoint = calculateDestinationPoint(
        currentPoint,
        distanceBetweenWaypoints,
        (i * 360) / numberOfWaypoints
      );

      waypoints.push({
        location: nextPoint,
        stopover: false,
      });

      totalDistance += distanceBetweenWaypoints;
      currentPoint = new google.maps.LatLng(nextPoint.lat, nextPoint.lng);
    }

    return waypoints;
  };

  const calculateDestinationPoint = (
    start: google.maps.LatLng,
    distanceKm: number,
    bearing: number
  ): google.maps.LatLngLiteral => {
    const R = 6371; // Radius of the Earth in km
    const bearingRad = (bearing * Math.PI) / 180; // Convert bearing to radians
    const distanceRatio = distanceKm / R; // Angular distance in radians

    const startLatRad = (start.lat() * Math.PI) / 180;
    const startLngRad = (start.lng() * Math.PI) / 180;

    const destLatRad = Math.asin(
      Math.sin(startLatRad) * Math.cos(distanceRatio) +
        Math.cos(startLatRad) * Math.sin(distanceRatio) * Math.cos(bearingRad)
    );

    const destLngRad =
      startLngRad +
      Math.atan2(
        Math.sin(bearingRad) * Math.sin(distanceRatio) * Math.cos(startLatRad),
        Math.cos(distanceRatio) - Math.sin(startLatRad) * Math.sin(destLatRad)
      );

    return {
      lat: (destLatRad * 180) / Math.PI,
      lng: (destLngRad * 180) / Math.PI,
    };
  };

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
        <div id="map" style={{ height: "100%", width: "100%" }}></div>
      </APIProvider>
    </div>
  );
};

export default Maps;
