import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
    </Routes>
  );
};

export default CustomRoutes;
