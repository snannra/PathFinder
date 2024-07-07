# PathFinder

## Overview

PathFinder is a React-based web application that helps runners plan their running routes. Users can specify a starting location and the total distance they want to run, and the application generates a route that directs them back to their starting point after covering the specified distance.

## Features

- Get the current location of the user
- Calculate a running route based on the specified starting point and distance
- Display the running route on a Google Map
- Generate waypoints up to half the total distance, then direct the user back to the start

## Technologies Used

- React
- Vite
- Google Maps API
- TypeScript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/snannra/PathFinder.git
2. Navigate to the project direcotry:
   ```bash
   cd PathFinder
3. Install the dependencies:
   ```bash
   npm install
4. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com).
5. Create a new _`.env`_ file in the root directory and add your API key.
   ```bash
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here

## Usage

1. Start the development server:
   ```bash
   npm run dev
2. Open your browser and go to _`http://localhost:5173/`_
3. Enter the starting location and the distance you want to run.
4. The application will display a map with the calculated running route.

## Code Structure

*_`src/components/Map.tsx`_: Main component that handles the map rendering and route calculation.
*_`src/services/geolocation.ts`_: Service to get the current location of the user.
*_`src/App.tsx`_: Main application component.
*_`src/assets`_: Folder containing static assets like images and styles.
*_`src/components`_: Folder containing reusable UI components.
*_`src/services`_: Folder containing service files for various functionalities.
