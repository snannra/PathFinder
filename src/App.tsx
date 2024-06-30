// src/App.tsx
import { useState } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import Maps from "./components/Map"; // Import the updated Maps component
import { APIProvider } from "@vis.gl/react-google-maps";
import "./App.css"; // Import the CSS file

function App() {
  const [startingAddress, setStartingAddress] = useState("");
  const [endingAddress, setEndingAddress] = useState("");
  const [milesRan, setMilesRan] = useState("");

  const handleSubmit = () => {
    console.log("Starting Address: ", startingAddress);
    console.log("Ending Address: ", endingAddress);
    console.log("Miles Ran: ", milesRan);
  };

  return (
    <div className="app-container">
      <h1 className="title">Path Finder</h1>
      <div className="form-container">
        <Form
          label="Starting Address"
          placeholder="1234 Berry Lane"
          onChange={setStartingAddress}
        />
        <Form
          label="Ending Address"
          placeholder="1234 Berry Lane"
          onChange={setEndingAddress}
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
          apiKey="AIzaSyAf8saf84jOHdc3hRPRWlohg8jMboERkd8"
          onLoad={() => console.log("Maps API has loaded.")}
        >
          <div className="map-container">
            <Maps
              defaultZoom={13}
              defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
            />
          </div>
        </APIProvider>
      </main>
    </div>
  );
}

export default App;
