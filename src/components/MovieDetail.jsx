import { useEffect } from "react";

const MovieDetail = ({ movie, onClose }) => {
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    original_language,
    overview,
    vote_count,
  } = movie;

  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Add keyboard event listener for Escape key
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Re-enable scroll and remove event listener when component unmounts
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    // Close modal only if clicking on the overlay, not on the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e) => {
    // Prevent clicks inside the modal from closing it
    e.stopPropagation();
  };

  return (
    <div className="movie-detail-overlay" onClick={handleOverlayClick}>
      <div className="movie-detail-modal" onClick={handleModalClick}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="movie-detail-content">
          <div className="movie-detail-poster">
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/original${poster_path}`
                  : "/no-movie.png"
              }
              alt={title}
            />
          </div>

          <div className="movie-detail-info">
            <h1 className="movie-detail-title">{title}</h1>

            <div className="movie-detail-meta">
              <div className="rating-large">
                <img src="/star.svg" alt="Star Icon" />
                <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
                <span className="vote-count">({vote_count} votes)</span>
              </div>

              <div className="meta-details">
                <span className="year">
                  {release_date ? release_date : "N/A"}
                </span>
                <span className="language">
                  {original_language?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="movie-detail-overview">
              <h3>Overview</h3>
              <p>{overview || "No overview available."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
