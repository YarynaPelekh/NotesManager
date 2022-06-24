import "./App.css";

import LayoutForm from "./components/Layout/LayoutForm.tsx";
import DirectoriesTree from "./components/Folders/DirectoriesTree.tsx";
import PageNotFound from "./components/Layout/PageNotFound.tsx";
import ChosenDirectory from "./components/Folders/ChosenDirectory.tsx";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutForm />} />
        <Route path="directories" element={<DirectoriesTree />}>
          <Route path=":directoryId" element={<ChosenDirectory />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
