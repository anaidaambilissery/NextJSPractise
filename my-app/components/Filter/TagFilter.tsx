"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./TagFilter.css";

type TagFilterProps = {
  tags: string[];
  selectedTag?: string;
};

export default function TagFilter({ tags, selectedTag = "" }: TagFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleTagChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newTag = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (newTag) {
      params.set("tag", newTag);
    } else {
      params.delete("tag");
    }

    params.set("page", "1");

    router.push(`/articles?${params.toString()}`);
  }

  return (
    <div className="tag-filter-container">
      <label htmlFor="tag-select" className="tag-filter-label">
        Filter by Tag:
      </label>
      <select
        id="tag-select"
        className="tag-filter-select"
        value={selectedTag}
        onChange={handleTagChange}
        aria-label="Filter articles by tag"
      >
        <option value="">All Tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}
