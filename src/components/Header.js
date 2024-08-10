// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";

function Header() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://products2-tt3o.onrender.com/api/products`
      );
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    }
  };

  const handleChange = (value) => {
    setQuery(value);
    if (value.trim() === "") {
      setFilteredProducts([]);
    } else {
      const fuse = new Fuse(products, {
        keys: ["title", "description"],
        includeScore: true,
        threshold: 0.4,
      });
      const results = fuse.search(value);
      const matches = results.map((result) => result.item);
      setFilteredProducts(matches);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const fuse = new Fuse(products, {
      keys: ["title", "description"],
      includeScore: true,
      threshold: 0.4,
    });
    const results = fuse.search(query);
    const matches = results.map((result) => result.item);
    navigate("/search-results", { state: { results: matches } });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  // Determine screen width
  const screenWidth = window.innerWidth;

  return (
    <header className="header">
      {screenWidth > 768 ? (
        // Desktop view
        <div className="top-bar">
          <div className="unlockdiscounts">
            <Link to="/">UnlockDiscounts</Link>
          </div>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                name="searchInput"
                placeholder="Looking for something..."
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onKeyPress={handleKeyPress} // Handle Enter key press
                autoComplete="off"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/distancelearning">Online Learning</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      ) : (
        // Mobile view
        <div className="top-bar">
          <div className="mobile-row-1">
            <div className="unlockdiscounts">UnlockDiscounts</div>
            <div className="search-bar">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="searchInput"
                  placeholder="Looking for something..."
                  value={query}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyPress={handleKeyPress} // Handle Enter key press
                  autoComplete="off"
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
          <div className="mobile-row-2">
            <nav className="nav-links">
              <Link to="/">
                <i className="fas fa-home"></i>
              </Link>
              <Link to="/blog">
                <i className="fas fa-blog"></i>
              </Link>
              <Link to="/distancelearning">
                <i className="fas fa-graduation-cap"></i>
              </Link>
              <Link to="/about">
                <i className="fas fa-info-circle"></i>
              </Link>
              <Link to="/contact">
                <i className="fas fa-envelope"></i>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
