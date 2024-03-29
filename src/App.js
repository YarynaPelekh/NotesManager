import React from "react";

import LoginForm from "./components/Auth/LoginForm.tsx";
import MainPage from "./components/MainPage.tsx";
import PageNotFound from "./components/UI/Layout/PageNotFound.tsx";
import SearchResults from "./components/Notes/Search/SearchResults.tsx";

import Header from "./components/UI/Layout/Header.tsx";
import Footer from "./components/UI/Layout/Footer.tsx";

import { Route, Routes } from "react-router-dom";

import "./App.css";
import RequireAuth from "./components/Auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginForm />} />
        <Route
          path="directories/:directoryId"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route
          path="/search/:mode/:values"
          element={
            <RequireAuth>
              <SearchResults />
            </RequireAuth>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
