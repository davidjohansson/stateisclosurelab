import { useState } from "react";

function App() {
  //closedOverVariable här är definierad utanför den här funktionen, det finns en omgivande funktion
  const [closedOverVariable, setClosedOverVariable] = useState(0)
  return (
    <h1>{closedOverVariable}</h1>
    
  );
}

export default App;
