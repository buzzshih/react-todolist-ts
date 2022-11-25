import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./Routers";

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
};

export default AppWrapper;
