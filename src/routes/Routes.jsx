import React from "react";
import { Routes as ReactRouters, Route, Outlet } from "react-router-dom";
import Header from "../layout/Header/Header";
import NavBar from "../layout/NavBar/NavBar";
import MapPage from "../pages/MapPage/MapPage";
const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route path="/map" element={<MapPage />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <NavBar />
    </>
  );
};
