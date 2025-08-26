import React, { useEffect, useState } from "react";

const SearchResults = ({ query }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 
  const apiKey = "oRhG-kWxWLnQivqDWEn5RWv83oFLkFbp1cEGdFxrIaE";

  // Fetch data
  const getData = async () => {
    setLoading(true);
    try {
      const url = query
        ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${apiKey}`
        : `https://api.unsplash.com/photos?page=${page}&client_id=${apiKey}`;

      const response = await fetch(url);
      const jsonData = await response.json();

      if (query) {
        if (jsonData.results && jsonData.results.length > 0) {
          setData((prev) => [...prev, ...jsonData.results]);
        }
      } else {
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          setData((prev) => [...prev, ...jsonData]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    getData();
  }, [page, query]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="search-results">
      <h1>{query ? `Search Results For: ${query}` : "Trending Gallery"}</h1>
      <div className="gallery">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage(item);
                }}
              >
                <img
                  src={item.urls.small}
                  alt={item.alt_description || "Unsplash Image"}
                  loading="lazy"
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          ))
        ) : !loading ? (
          <p>No results found</p>
        ) : null}
      </div>
      {loading && <p>Loading images...</p>}

      {/* Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflowY: "auto",
              textAlign: "center",
            }}
          >
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || "Unsplash Image"}
              style={{ maxWidth: "100%", borderRadius: "10px" }}
            />
            <p style={{ marginTop: "10px" }}>
              {selectedImage.description ||
                selectedImage.alt_description ||
                "No description available"}
            </p>
            <button onClick={() => setSelectedImage(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
