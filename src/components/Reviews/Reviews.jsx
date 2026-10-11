import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/tmdbApi';
import css from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getMovieReviews(movieId)
      .then((data) => setReviews(data.results))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>Оглядів поки немає.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h4 className={css.author}>{author}</h4>
          <p className={css.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}
