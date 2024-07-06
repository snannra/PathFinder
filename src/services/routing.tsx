/*import { useState } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface RoutingProps {
    center: google.maps.LatLngLiteral;
    miles: number;
}

const RADIUS_OF_EARTH_KM = 6371;

const Routing = ({miles, center}: RoutingProps) {
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const calculateRoute = () => {
        if (miles <= 0) return;

        const directionsService = new google.maps.DirectionsService();

        directionsService.route(
            {
              origin: center,
              destination: center,
              travelMode: google.maps.TravelMode.WALKING,
              waypoints: generateWaypoints(center, miles),
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                setDirectionsResponse(result);
              } else {
                console.error(`Error fetching directions ${result}`);
              }
            }
          );      

    };

    const generateWaypoints = (start: google.maps.LatLngLiteral, miles: number): google.maps.DirectionsWaypoint[] => {
        const km = miles * 1.60934; // Convert miles to kilometers
        const numberOfWaypoints = 4; // Number of waypoints to create
        const waypoints: google.maps.DirectionsWaypoint[] = [];
        const distanceBetweenWaypoints = km / numberOfWaypoints;
    
        for (let i = 1; i <= numberOfWaypoints; i++) {
          const bearing = (360 / numberOfWaypoints) * i; // Divide circle into equal parts
          const waypoint = calculateDestinationPoint(start, distanceBetweenWaypoints * i, bearing);
          waypoints.push({
            location: waypoint,
            stopover: false,
          });
        }
    
        return waypoints;
      };
    
      const calculateDestinationPoint = (start: google.maps.LatLngLiteral, distanceKm: number, bearing: number) => {
        const bearingRad = (bearing * Math.PI) / 180; // Convert bearing to radians
        const distanceRatio = distanceKm / RADIUS_OF_EARTH_KM; // Angular distance in radians
    
        const startLatRad = (start.lat * Math.PI) / 180;
        const startLngRad = (start.lng * Math.PI) / 180;
    
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
          lat: (destLatRad * 180) / 360,
          lng: (destLngRad * 180) / 360,
        };
      };

      
      return (
        <>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </>
      );    
    
};

export default Routing;

*/