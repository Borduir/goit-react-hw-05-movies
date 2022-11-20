import { useState, useEffect } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

export default function Movies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [requiredMovies, setRequiredMovies] = useState([]);

  useEffect(() => {
    if (query && query.length > 0) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=54ae14b77c512b5ac8b687e8ee5bab33&language=en-US&page=1&include_adult=false&query=${query}`
      )
        .then(response => response.json())
        .then(response => {
          setRequiredMovies(response.results);
        });
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = event => {
    const { value } = event.currentTarget;
    setSearchParams(value !== '' ? { query: value } : {});
  };

  const onSubmit = event => {
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=54ae14b77c512b5ac8b687e8ee5bab33&language=en-US&page=1&include_adult=false&query=${query}`
    )
      .then(response => response.json())
      .then(response => {
        setRequiredMovies(response.results);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={query} onChange={handleChange}></input>
      <button type="submit">Search</button>
      {requiredMovies !== [] && (
        <ul>
          {requiredMovies.map(requiredMovie => {
            return (
              <li key={requiredMovie.id}>
                <NavLink to={`${requiredMovie.id}`} state={{ from: location }}>
                  {requiredMovie.title
                    ? requiredMovie.title
                    : requiredMovie.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
