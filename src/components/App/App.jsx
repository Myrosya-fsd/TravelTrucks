import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header.jsx";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import CatalogPage from "../../pages/CatalogPage/CatalogPage.jsx";
import TruckDetailsPage from "../../pages/TruckDetailsPage/TruckDetailsPage.jsx";
import Features from "../Features/Features.jsx";
import Reviews from "../Reviews/Revies.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/truck/:id" element={<TruckDetailsPage />}>
            <Route index element={<Features />} />
            <Route path="features" element={<Features />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
