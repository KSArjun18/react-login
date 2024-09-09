import React, { useEffect, useState } from 'react';
import NoImage from "../assets/No-Image.png";
import { fetchMovies } from "../utils/api";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies();
        setMovies(movies);
      } catch (error) {
        console.error('Error loading movies', error);
      } finally {
        setLoading(false); 
      }
    };

    loadMovies();
  }, []);

  const handleCompanyInfoClick = () => {
    setShowCompanyInfo(!showCompanyInfo);
  };

  const filteredMovies = movies.filter(movie => 
    movie.stars.some(star => star.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded-5">
        <a className="navbar-brand ms-lg-5 ms-3" href="#">Movies</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="navbar-brand me-lg-5 ms-3" href="#" onClick={handleCompanyInfoClick}>
                Company Info
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Company Info Section */}
      {showCompanyInfo && (
        <div className="card mb-4 rounded-5 bg-secondary">
          <div className="card-body">
            <h5 className="card-title">Company Info</h5>
            <p className="card-text"><strong>Company:</strong> Geeksynergy Technologies Pvt Ltd</p>
            <p className="card-text"><strong>Address:</strong> Sanjayanagar, Bengaluru-56</p>
            <p className="card-text"><strong>Phone:</strong> XXXXXXXXX09</p>
            <p className="card-text"><strong>Email:</strong> XXXXXX@gmail.com</p>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control p-2 rounded-4" 
          placeholder="Search by star name" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="spinner-border"
          role="status" 
          style={{ borderTopColor: '#ff5733' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4" key={movie._id}>
                <div className="card movie-card shadow-sm h-100">
                  <div className="row g-0">
                    <div className="col-md-4 col-12">
                      <img 
                        src={movie.poster || NoImage} 
                        className="img-fluid rounded-start" 
                        alt={movie.title} 
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-8 col-12">
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text"><strong>Genre:</strong> {movie.genre}</p>
                        <p className="card-text"><strong>Director:</strong> {movie.director.join(', ')}</p>
                        <p className="card-text"><strong>Stars:</strong> {movie.stars.join(', ')}</p>
                        <p className="card-text"><strong>Votes:</strong> {movie.voting}</p>
                        <p className="card-text"><strong>Release Date:</strong> {movie.releasedDate}</p>
                        <a href="#" className="btn btn-primary btn-block">Watch Trailer</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No movies found...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MoviesList;
