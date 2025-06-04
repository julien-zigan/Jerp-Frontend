import "../public/css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import MainContent from "./pages/MainContent";

function App() {
 return (
    <Router>
      <Routes>
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="*" element={<MainContent />} />
      </Routes>
    </Router>
  );
}

export default App;
