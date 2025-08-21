import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import CatalogPage from "../../pages/CatalogPage/CatalogPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
