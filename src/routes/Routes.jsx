import React from "react";
import { Routes as ReactRouters, Route, Outlet } from "react-router-dom";
import Header from "../layout/Header/Header";
import NavBar from "../layout/NavBar/NavBar";
import MapPage from "../pages/MapPage/MapPage";
import BoardList from "../pages/BoardList/BoardList";
const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<Layout />}>
        <Route index element={<BoardList />} />
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
