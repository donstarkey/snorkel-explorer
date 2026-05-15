// src/components/layout/Layout.jsx
import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-layout">
      <Header onMenuClick={() => setIsOpen(true)} />

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main style={{ padding: "1.5rem", marginTop: "60px" }}>
        {children}
      </main>
    </div>
  );
}
