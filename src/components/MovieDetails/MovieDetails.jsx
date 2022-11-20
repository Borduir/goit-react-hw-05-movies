import { useState, useEffect, useRef } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';

import css from './MovieDetails.module.css';

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [releaseYear, setReleaseYear] = useState('');
  const [genreList, setGenreList] = useState('');
  const { movieId } = useParams();
  const location = useLocation();
  const currentLocation = useRef(location);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=54ae14b77c512b5ac8b687e8ee5bab33`
    )
      .then(response => response.json())
      .then(response => {
        setMovie(response);
        setReleaseYear(response.release_date.slice(0, 4));
        setGenreList(
          response.genres.reduce((previousValue, genre) => {
            return previousValue + ' ' + genre.name;
          }, '')
        );
      });
  }, [movieId]);

  const { title, name, vote_average, overview, poster_path } = movie;

  return (
    <>
      <section className={css.section}>
        <button>
          <NavLink to={currentLocation.current.state.from}>Go back</NavLink>
        </button>
        <div className={css.wrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={`${title ? title : name} poster`}
          />
          <div>
            <h1>
              {/* {в одних фільмів ім'я вказане в параметрі "title", в інших - в "name"} */}
              {title ? title : name} {'(' + releaseYear + ')'}
            </h1>
            <p>User Score: {Math.round(vote_average)}%</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h3>Genres</h3>
            <p>{genreList}</p>
          </div>
        </div>
        <h4>Additional Information</h4>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: location }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: location }}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Outlet movieId={movieId} />
      </section>
    </>
  );
}
