import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTypeExample from "./pages/01_DataTypeExample/DataTypeExample";
import ElementAndEvent from "./pages/02_ElementAndEvent/ElementAndEvent";
import PseudocodeAndEvent from "./pages/03_PseudocodeAndAlgorithm/PseudocodeAndAlgorithm";
import DemoProject from "./pages/04_DemoProject/DemoProject";

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="d-flex flex-column vh-100 vw-100">
      {/* Header */}
      <div className="bg-light text-center p-3 border">
        <h2>Skills Test</h2>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="d-flex flex-column border-end p-3 bg-light" style={{ width: "250px" }}>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent(<DataTypeExample />)}
          >
            01 DataTypeExample
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent(<ElementAndEvent />)}
          >
            02 ElementAndEvent
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent(<PseudocodeAndEvent />)}
          >
            03 PseudocodeAndAlgorithm
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent(<DemoProject />)}
          >
            04 DemoProject
          </div>
        </div>

        {/* Main Content Display */}
        <div className="flex-grow-1 p-3 bg-light">
          {selectedComponent ? selectedComponent : <h5><center>😺 66048395 อารยา โฆษิตไกร 😺</center></h5>}
        </div>
      </div>
    </div>
  );
}

export default App;
