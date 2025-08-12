import { useEffect, useState, useCallback, useRef } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const observerRef = useRef();
  const lastMovieRef = useRef();

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 600, [searchTerm]);

  const fetchMovies = async (query = "", pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const endpoint = query
        ? `${API_URL}/search/movie?query=${encodeURIComponent(
            query
          )}&page=${pageNum}`
        : `${API_URL}/discover/movie?sort_by=popularity.desc&page=${pageNum}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching movies!");
      }
      const data = await response.json();
      if (data.response === false) {
        setErrorMessage(
          data.error || "Something went wrong while fetching movies!"
        );
        return;
      }

      const newMovies = data.results || [];

      if (append) {
        setMovies((prev) => [...prev, ...newMovies]);
      } else {
        setMovies(newMovies);
        setPage(1);
      }

      // Check if there are more pages
      setHasMore(data.page < data.total_pages);

      if (query && newMovies.length && pageNum === 1) {
        await updateSearchCount(query, newMovies[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMoreMovies = useCallback(() => {
    if (!isLoadingMore && hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(debouncedSearchTerm, nextPage, true);
    }
  }, [isLoadingMore, hasMore, isLoading, page, debouncedSearchTerm]);

  // Intersection Observer for infinite scroll
  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreMovies();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, loadMoreMovies]
  );

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
  };

  // Reset pagination when search term changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchMovies(debouncedSearchTerm, 1, false);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero-banner" />
          <h1>
            Find <span className="text-gradient">movies</span> you'll enjoy
            without the hassle
          </h1>
          <Search searchTerm={searchTerm} handleSearch={setSearchTerm} />
        </header>

        {trendingMovies.length ? (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="all-movies">
          <h2>All movies</h2>
          <div className="movies-container">
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-center text-red-500">{errorMessage}</p>
            ) : movies.length === 0 ? (
              <p className="text-center text-gray-500">No movies found</p>
            ) : (
              <ul>
                {movies.map((movie, index) => {
                  // Add ref to last movie for intersection observer
                  if (movies.length === index + 1) {
                    return (
                      <li key={movie.id} ref={lastMovieElementRef}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={handleMovieClick}
                        />
                      </li>
                    );
                  } else {
                    return (
                      <li key={movie.id}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={handleMovieClick}
                        />
                      </li>
                    );
                  }
                })}
              </ul>
            )}

            {/* Loading indicator for more movies */}
            {isLoadingMore && (
              <div className="loading-more">
                <Spinner />
                <p className="text-center text-gray-400 mt-4">
                  Loading more movies...
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onClose={closeMovieDetail} />
      )}
    </main>
  );
};
export default Home;
