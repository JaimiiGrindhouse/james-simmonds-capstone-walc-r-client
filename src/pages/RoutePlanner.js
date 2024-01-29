import ButtonsNavBar from "../components/ButtonsNavBar";
import MapRoutingComponent from "../components/MapRoutingComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RoutePlanner() {
  console.log(window.location.pathname);
  return (
    <>
      <MapRoutingComponent />
      <ButtonsNavBar />
    </>
  );
}

export default RoutePlanner;
