// src/components/layout/Layout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header onMenuClick={() => setIsOpen(true)} />

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main style={{ padding: "1.5rem", marginTop: "60px" }}>
        <Outlet />
      </main>
    </div>
  );
}

