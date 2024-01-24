import "./App.css";
import MapRoutingComponent from "./components/MapRoutingComponent";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RoutePlanner from "./pages/RoutePlanner";

function App() {
  return (
    <Router>
      <MapRoutingComponent />
      <Route path="/routeplanner" component={RoutePlanner} />
    </Router>
  );
}

export default App;
