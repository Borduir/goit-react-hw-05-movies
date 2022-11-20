import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

export default function Home() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=54ae14b77c512b5ac8b687e8ee5bab33`
    )
      .then(response => response.json())
      .then(response => {
        setResults([...response.results]);
      });
  }, []);
  const location = useLocation();
  return (
    <>
      <h1>Tranding today</h1>
      <ul>
        {results.map(result => {
          return (
            <li key={result.id}>
              <NavLink to={`movies/${result.id}`} state={{ from: location }}>
                {result.title ? result.title : result.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
