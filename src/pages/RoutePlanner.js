import MapRoutingComponent from "../components/MapRoutingComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RoutePlanner() {
  console.log(window.location.pathname);
  return (
    <>
      <h1>route planner</h1>
      <MapRoutingComponent />
    </>
  );
}

export default RoutePlanner;
