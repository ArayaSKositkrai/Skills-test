import { useState } from "react";
import DataTypeExample from "./pages/01_DataTypeExample/DataTypeExample"; // ✅ Import Component
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  return (
    <div className="d-flex flex-column vh-100 vw-100">
      {/* Header */}
      <div className="bg-light text-center p-3 border">
        <h4>Skills Test</h4>
      </div>

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <div className="d-flex flex-column border-end p-3 bg-light" style={{ width: "200px" }}>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent(<DataTypeExample />)} // ✅ แสดง DataTypeExample เมื่อคลิก Btn1
          >
            01 DataTypeExample
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent("You clicked Btn2")}
          >
            Btn2
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent("You clicked Btn3")}
          >
            Btn3
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent("You clicked Btn4")}
          >
            Btn4
          </div>
          <div
            className="mb-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent("You clicked Btn5")}
          >
            Btn5
          </div>
        </div>

        {/* Main Content Display */}
        <div className="flex-grow-1 p-3 bg-light">
          {selectedComponent ? selectedComponent : <h5><center>😺</center></h5>}
        </div>
      </div>
    </div>
  );
}

export default App;
