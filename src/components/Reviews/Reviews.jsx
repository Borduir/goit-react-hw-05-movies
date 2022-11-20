import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=54ae14b77c512b5ac8b687e8ee5bab33&language=en-US&page=1`
    )
      .then(response => response.json())
      .then(response => {
        setReviews(response.results);
      });
  }, [movieId]);

  return (
    <>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map(review => {
            const { content, author, id } = review;
            return (
              <li key={id}>
                <p>
                  <b>{author}</b>
                </p>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Movie have no reviews yet</p>
      )}
    </>
  );
}
