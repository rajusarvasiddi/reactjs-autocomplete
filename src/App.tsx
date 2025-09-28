import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterComponent from "./features/filterComponent/FilterComponent";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app-container">
          <header className="logo-header">
            <img
              src="/logo.svg"
              height={150}
              alt="React Logo"
              className="logo"
            />
          </header>

          <Routes>
            <Route path="/" element={<FilterComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
