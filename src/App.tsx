import Button from "./components/Button";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Form label="Starting Address" placeholder="1234 Berry lane" />
      <Form label="Ending Address" placeholder="1234 Berry lane" />
      <Button
        children="Submit"
        color="secondary"
        onClick={() => console.log("clicked")}
      />
    </>
  );
}

export default App;
