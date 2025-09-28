import { useEffect, useRef, useState } from "react";
import "./FilterComponent.css";

const FilterComponent = () => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [cache, setCache] = useState<{ [key: string]: any[] }>({});
  const [hasSearched, setHasSearched] = useState(false);

  const fetchData = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setHasSearched(false);

    if (cache[query]) {
      setResults(cache[query]);
      setHasSearched(true);
      return;
    }

    try {
      const data = await fetch(
        `https://dummyjson.com/recipes/search?q=${query}`, {
          signal: controller.signal
        }
      );
      const json = await data.json();
      setResults(json?.recipes || []);
      setCache((prev) => ({ ...prev, [query]: json?.recipes }));
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // Request was aborted, do nothing
        setResults([]);
      }
    } finally {
      setHasSearched(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchData(input), 300);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const highlightMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1 || query.trim() === "") return <>{text}</>;

    const before = text.slice(0, index);
    const match = text.slice(index, index + query.length);
    const after = text.slice(index + query.length);

    return (
      <>
        {before}
        <mark>{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div className="search-container">
      <div className="search-header">ReactJS Auto-complete Search Bar</div>

      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={input}
          className="search-input"
          placeholder="Press '/' to start search.."
          onChange={(e) => {
            setInput(e.target.value);
            setShowResults(true);
            setActiveIndex(-1);
          }}
          onFocus={() => {
            setShowResults(true)
            if (input.trim() != "") {
                fetchData(input);
            }
          }}
          onBlur={() => setTimeout(() => setShowResults(false), 100)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "Enter" && activeIndex >= 0) {
              setInput(results[activeIndex].name);
              setShowResults(false);
              setActiveIndex(-1);
            } else if (e.key === "Escape") {
              setShowResults(false);
              setActiveIndex(-1);
            }
          }}
        />

        {input && (
          <button className="clear-button" onClick={() => setInput("")}>
            ×
          </button>
        )}

        {showResults && input.trim() !== "" && (
          <div className="results-container">
            {hasSearched && results.length === 0 ? (
              <div className="no-results">No results found</div>
            ) : (
              results.map((r, index) => (
                <div
                  key={r.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  tabIndex={0}
                  className={`result-item ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onMouseDown={() => {
                    setInput(r.name);
                    setShowResults(false);
                    setActiveIndex(-1);
                  }}
                >
                  <img src={r.image} alt={r.name} className="thumbnail" />
                  <div className="result-details">
                    <div className="result-name">
                      {highlightMatch(r.name, input)}
                    </div>
                    <div className="result-meta">
                      <span>
                        {r.cuisine} • {r.mealType?.join(" • ")}
                      </span>
                      <span>
                        ⭐ {r.rating} ({r.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterComponent;
