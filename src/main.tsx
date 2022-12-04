import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchNews from "./components/FetchNews";
import FetchNewsJa from "./components/FetchNewsJa";
import NotFound from "./components/NotFound";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<FetchNews />} />
      <Route path="/ja" element={<FetchNewsJa />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
