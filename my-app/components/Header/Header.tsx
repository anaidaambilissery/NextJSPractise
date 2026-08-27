import React from "react";
import Link from "next/link";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="site-logo">
          Technical Blog
        </Link>

        <nav className="site-nav" aria-label="Main Navigation">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/articles" className="nav-link">
            Articles
          </Link>
          <Link href="/tags" className="nav-link">
            Tags
          </Link>
        </nav>
      </div>
    </header>
  );
}