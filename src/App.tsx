import { useState } from "react";
import Button from "./components/Button";
import Form from "./components/Form";
import Maps from "./components/Map";
import "./App.css"; // Import the CSS file

function App() {
  const [startingAddress, setStartingAddress] = useState("");
  const [milesRan, setMilesRan] = useState("");
  const [routeInfo, setRouteInfo] = useState<{
    start: string | null;
    miles: number | null;
  }>({ start: null, miles: null });

  const handleSubmit = () => {
    console.log("Starting Address: ", startingAddress);
    console.log("Miles Ran: ", milesRan);

    setRouteInfo({ start: startingAddress, miles: parseFloat(milesRan) });
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
          label="How Many Miles Do You Want To Run?"
          placeholder="e.g. 5"
          onChange={setMilesRan}
        />
        <div className="button-wrapper">
          <Button children="Submit" color="secondary" onClick={handleSubmit} />
        </div>
      </div>
      <hr className="separator" />
      <main className="map-container">
        <Maps routeInfo={routeInfo} />
      </main>
    </div>
  );
}

export default App;
