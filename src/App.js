import "./App.css";
import "./App.scss";
import SantanderBikeStations from "./pages/SantanderBikeStations";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePlanner from "./pages/RoutePlanner";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/routeplanner" element={<RoutePlanner />} />
        <Route
          path="/santanderbikefinder"
          element={<SantanderBikeStations />}
        />
      </Routes>
    </Router>
  );
}

export default App;
