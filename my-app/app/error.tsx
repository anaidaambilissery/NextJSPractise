"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main style={{ textAlign: "center", padding: "80px 20px" }}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "#dc2626",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "8px",
        }}
      >
        Something went wrong
      </p>
      <h1 style={{ fontSize: "32px", marginBottom: "16px", color: "#111827" }}>
        Unable to load page content
      </h1>
      <p
        style={{
          color: "#6b7280",
          maxWidth: "480px",
          margin: "0 auto 28px",
          fontSize: "15px",
        }}
      >
        {error.message ||
          "An unexpected error occurred while communicating with the server. Please try again."}
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button type="button" onClick={() => reset()} className="btn">
          Try Again
        </button>
        <Link href="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
