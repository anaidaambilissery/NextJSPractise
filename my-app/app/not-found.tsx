import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ textAlign: "center", padding: "80px 20px" }}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "#2563eb",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "8px",
        }}
      >
        404 Error
      </p>
      <h1 style={{ fontSize: "36px", marginBottom: "16px", color: "#111827" }}>
        Page Not Found
      </h1>
      <p
        style={{
          color: "#6b7280",
          maxWidth: "480px",
          margin: "0 auto 28px",
          fontSize: "16px",
        }}
      >
        Sorry, the article, tag, or page you are looking for does not exist or has
        been moved.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <Link href="/" className="btn">
          Go to Home
        </Link>
        <Link href="/articles" className="btn btn-secondary">
          Browse Articles
        </Link>
      </div>
    </main>
  );
}
