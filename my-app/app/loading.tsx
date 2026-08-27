import React from "react";

export default function Loading() {
  return (
    <main style={{ textAlign: "center", padding: "80px 20px" }}>
      <div
        style={{
          display: "inline-block",
          width: "40px",
          height: "40px",
          border: "4px solid #e5e7eb",
          borderTopColor: "#2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "16px",
        }}
        aria-hidden="true"
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#374151" }}>
        Loading content...
      </h2>
      <p style={{ color: "#6b7280", marginTop: "8px" }}>
        Please wait while we fetch the latest data.
      </p>
    </main>
  );
}
