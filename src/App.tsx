import { Routes, Route, Navigate } from "react-router-dom";
import { LoadComponent } from "./components/loading";         
import HomePage from "./pages/Home"; 
import "./index.css"
function App() {
  return (
    <Routes>
      <Route path="/loading" element={<LoadComponent />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/loading" />} />
    </Routes>
  );
}

export default App;
