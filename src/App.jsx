import { useState } from "react";
import "./App.css";
import Search from "./components/Search";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
        </header>
        <Search searchTerm={searchTerm} handleSearch={setSearchTerm} />
      </div>
    </main>
  );
};
export default App;
