import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

// Lazy load komponen
const Home = React.lazy(() => import("./components/Home"));
const DokterList = React.lazy(() => import("./components/Dokter/List"));
const PasienList = React.lazy(() => import("./components/Pasien/List"));
const DokterCreate = React.lazy(() => import("./components/Dokter/Create"));
const DokterEdit = React.lazy(() => import("./components/Dokter/Edit"));
const PasienCreate = React.lazy(() => import("./components/Pasien/Create"));
const PasienEdit = React.lazy(() => import("./components/Pasien/Edit"));

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            React CRUD
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dokters">
                  Dokter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/pasiens">
                  Pasien
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-3">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dokters" element={<DokterList />} />
            <Route path="/pasiens" element={<PasienList />} />
            <Route path="/dokters/create" element={<DokterCreate />} />
            <Route path="/pasiens/create" element={<PasienCreate />} />
            <Route path="/dokters/edit/:id" element={<DokterEdit />} />
            <Route path="/pasiens/edit/:id" element={<PasienEdit />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
