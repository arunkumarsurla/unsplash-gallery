import React from "react";
import SearchBar from "./SearchBar";

const categories = ["Wallpapers", "Nature", "Travel", "Illustrations", "Animals"];

const Header = ({ onSearch }) => {
  const handleCategoryClick = (category) => {
    onSearch(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="header">
      <nav>
        <h1>
          U<small>nsplash</small> G<small>allery</small>
        </h1>
        <SearchBar onSearch={onSearch} />

        <ul className="category-list" style={{cursor: "pointer"}}>
          {categories.map((category) => (
            <li key={category} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        👆
      </button>
    </div>
  );
};

export default Header;
