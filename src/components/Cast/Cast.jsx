import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, IMAGE_URL } from '../../services/tmdbApi';
import css from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getMovieCredits(movieId)
      .then((data) => setCast(data.cast))
      .catch((err) => setError(err.message));
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>Інформації про акторів немає.</p>;

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.item}>
          {profile_path ? (
            <img src={`${IMAGE_URL}${profile_path}`} alt={name} width="80" />
          ) : (
            <div className={css.placeholder} aria-hidden="true" />
          )}
          <p>
            {name}
            <br />
            <small>{character}</small>
          </p>
        </li>
      ))}
    </ul>
  );
}
