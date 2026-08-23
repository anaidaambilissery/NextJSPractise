import React from 'react'
import Link from 'next/link'
import './Header.css'
const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Technical Blog</Link>

        <div>
          <Link href="/">Home</Link>
          <Link href="/articles">Articles</Link>
          <Link href="/tags">Tags</Link>
          <Link href="/search">Search</Link>
          <Link href="/about">About</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header