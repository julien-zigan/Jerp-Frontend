import { useState } from "react";
import "../public/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileUploadCard from "./components/FileUploadCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app d-flex justify-content-center align-items-center text-center vh-100 vw-100">
      <FileUploadCard />
    </div>
  );
}

export default App;
