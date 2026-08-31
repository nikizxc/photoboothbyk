import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StudioPage from "./pages/StudioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="studio" element={<StudioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
