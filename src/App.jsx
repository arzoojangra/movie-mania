import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const endpoint = `${API_URL}/discover/movie?sort_by=popularity.desc`;
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
      setMovies(data.results || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
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
        <section className="all-movies">
          <h2 className="mt-[40px]">All movies</h2>
          <div className="movies-container">
            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-center text-red-500">{errorMessage}</p>
            ) : movies.length === 0 ? (
              <p className="text-center text-gray-500">No movies found</p>
            ) : (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
export default App;
