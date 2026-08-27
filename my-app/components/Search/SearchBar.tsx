"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./SearchBar.css";

type SearchBarProps = {
  initialSearch?: string;
};

export default function SearchBar({ initialSearch = "" }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialSearch);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`/articles?${params.toString()}`);
  }

  function handleClear() {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.set("page", "1");
    router.push(`/articles?${params.toString()}`);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Search articles by keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search articles"
      />
      <button type="submit" className="search-button">
        Search
      </button>
      {query && (
        <button
          type="button"
          className="search-clear-button"
          onClick={handleClear}
          aria-label="Clear search query"
        >
          Clear
        </button>
      )}
    </form>
  );
}
