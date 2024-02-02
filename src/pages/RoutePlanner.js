import ButtonsNavBar from "../components/ButtonsNavBar";
import MapRoutingComponent from "../components/MapRoutingComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";

function RoutePlanner() {
  console.log(window.location.pathname);
  return (
    <>
      <Header />
      <MapRoutingComponent />
      <ButtonsNavBar />
    </>
  );
}

export default RoutePlanner;
