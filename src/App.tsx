// src/App.tsx
import { useState } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";
import "./App.css"; // Import the CSS file

function App() {
  const [startingAdress, setStartingAdress] = useState("");
  const [endingAdress, setEndingAdress] = useState("");
  const [milesRan, setMilesRan] = useState("");

  const handleSubmit = () => {
    console.log("Starting Adress: ", startingAdress);
    console.log("Ending Adress: ", endingAdress);
    console.log("Miles Ran: ", milesRan);
  };

  return (
    <div className="app-container">
      <h1 className="title">Path Finder</h1>
      <div className="form-container">
        <Form
          label="Starting Address"
          placeholder="1234 Berry Lane"
          onChange={setStartingAdress}
        />
        <Form
          label="Ending Address"
          placeholder="1234 Berry Lane"
          onChange={setEndingAdress}
        />
        <Form
          label="How Many Miles Do You Want To Run?"
          placeholder="e.g. 5"
          onChange={setMilesRan}
        />
        <div className="button-wrapper">
          <Button children="Submit" color="secondary" onClick={handleSubmit} />
        </div>
      </div>
      <hr className="separator" />
      <main>
        <APIProvider
          apiKey={"AIzaSyAf8saf84jOHdc3hRPRWlohg8jMboERkd8"}
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <div className="map-container">
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
              onCameraChanged={(ev: MapCameraChangedEvent) =>
                console.log(
                  "camera changed:",
                  ev.detail.center,
                  "zoom:",
                  ev.detail.zoom
                )
              }
            />
          </div>
        </APIProvider>
      </main>
    </div>
  );
}

export default App;
