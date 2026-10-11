import { useEffect, useRef, useState, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails, IMAGE_URL } from '../../services/tmdbApi';
import css from './MovieDetails.module.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getMovieDetails(movieId)
      .then(setMovie)
      .catch((err) => setError(err.message));
  }, [movieId]);

  return (
    <section>
      <Link to={backLink.current} className={css.back}>
        ← Назад
      </Link>
      {error && <p>{error}</p>}
      {movie && (
        <>
          <div className={css.card}>
            {movie.poster_path && (
              <img
                src={`${IMAGE_URL}${movie.poster_path}`}
                alt={movie.title}
                width="240"
              />
            )}
            <div>
              <h1 className={css.title}>
                {movie.title} ({movie.release_date?.slice(0, 4)})
              </h1>
              <p>Рейтинг: {Math.round(movie.vote_average * 10)}%</p>
              <h2>Опис</h2>
              <p className={css.text}>{movie.overview || 'Опису немає.'}</p>
              <h2>Жанри</h2>
              <p>{movie.genres.map((g) => g.name).join(', ')}</p>
            </div>
          </div>
          <nav className={css.extra}>
            <Link to="cast" state={{ from: backLink.current }}>
              Акторський склад
            </Link>
            <Link to="reviews" state={{ from: backLink.current }}>
              Огляди
            </Link>
          </nav>
          <Suspense fallback={<p>Завантаження…</p>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </section>
  );
}
