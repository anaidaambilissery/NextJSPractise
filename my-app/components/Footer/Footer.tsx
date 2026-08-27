import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Technical Blog. Built with Next.js App Router.</p>
      </div>
    </footer>
  );
}
