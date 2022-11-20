import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=54ae14b77c512b5ac8b687e8ee5bab33&language=en-US`
    )
      .then(response => response.json())
      .then(response => {
        setActors(response.cast);
      });
  }, [movieId]);

  return (
    <>
      {actors && (
        <ul>
          {actors.map(actor => {
            const { id, profile_path, name, character } = actor;
            return (
              <li key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt=""
                />
                <p>{name}</p>
                <p>{character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
