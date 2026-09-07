import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import DatabasePage from "./pages/DatabasePage";
import UserReportPage from "./pages/UserReportPage";
import GradingDetailPage from "./pages/GradingDetailPage";
import PdfReportPage from "./pages/PdfReportPage";
import SpecialistsPage from "./pages/SpecialistsPage";

export default function App() {
  return (
    <AppProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/database" element={<DatabasePage />} />
          <Route path="/report" element={<UserReportPage />} />
          <Route path="/grading" element={<GradingDetailPage />} />
          <Route path="/pdf-report" element={<PdfReportPage />} />
          <Route path="/specialists" element={<SpecialistsPage />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </AppProvider>
  );
}
