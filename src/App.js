import "./App.css";

import LayoutForm from "./components/Layout/LayoutForm.tsx";
// import DirectoriesTree from "./components/Folders/DirectoriesTree.tsx";
import MainPage from "./components/UI/MainPage.tsx";
import PageNotFound from "./components/Layout/PageNotFound.tsx";

import Header from "./components/Layout/Header.tsx";
import Footer from "./components/Layout/Footer.tsx";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LayoutForm />} />
        <Route path="directories" element={<MainPage />} />
        <Route path="directories/:directoryId" element={<MainPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
