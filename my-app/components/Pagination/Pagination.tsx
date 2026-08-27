import React from "react";
import Link from "next/link";
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  tag?: string;
  search?: string;
  baseUrl?: string;
};

function createPageUrl(
  page: number,
  limit: number,
  tag?: string,
  search?: string,
  baseUrl: string = "/articles"
): string {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (limit !== 10) params.set("limit", limit.toString());
  if (tag) params.set("tag", tag);
  if (search) params.set("search", search);

  return `${baseUrl}?${params.toString()}`;
}

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function Pagination({
  currentPage,
  totalPages,
  limit,
  tag,
  search,
  baseUrl = "/articles",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination Navigation">
      {currentPage === 1 ? (
        <span className="pagination-btn disabled" aria-disabled="true">
          &larr; Previous
        </span>
      ) : (
        <Link
          href={createPageUrl(currentPage - 1, limit, tag, search, baseUrl)}
          className="pagination-btn"
        >
          &larr; Previous
        </Link>
      )}

      <div className="pagination-numbers">
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              aria-current="page"
              className="pagination-number active"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(Number(page), limit, tag, search, baseUrl)}
              className="pagination-number"
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage === totalPages ? (
        <span className="pagination-btn disabled" aria-disabled="true">
          Next &rarr;
        </span>
      ) : (
        <Link
          href={createPageUrl(currentPage + 1, limit, tag, search, baseUrl)}
          className="pagination-btn"
        >
          Next &rarr;
        </Link>
      )}
    </nav>
  );
}