import "./App.css";

import LayoutForm from "./components/Layout/LayoutForm.tsx";
import DirectoriesTree from "./components/Folders/DirectoriesTree.tsx";
import PageNotFound from "./components/Layout/PageNotFound.tsx";
import ChosenDirectory from "./components/Folders/ChosenDirectory.tsx";

import Header from "./components/Layout/Header.tsx";
import Footer from "./components/Layout/Footer.tsx";

import { Route, Routes } from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
  const chosenDirectoryId = useSelector(
    (state) => state.directoriesSlice.chosenDirectoryId
  );

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LayoutForm />} />
        <Route path="directories" element={<DirectoriesTree />} />
        <Route path="directories/:directoryId" element={<DirectoriesTree />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
