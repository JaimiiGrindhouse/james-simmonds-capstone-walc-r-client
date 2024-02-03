import "./App.css";
import "./App.scss";
import SantanderBikeStations from "./pages/SantanderBikeStations";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoutePlanner from "./pages/RoutePlanner";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import BikeStoragePage from "./pages/BikeStoragePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/routeplanner" element={<RoutePlanner />} />
        <Route
          path="/santanderbikefinder"
          element={<SantanderBikeStations />}
        />
        <Route path="/bikestorage" element={<BikeStoragePage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
