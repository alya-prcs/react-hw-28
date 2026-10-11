import { useEffect, useState } from 'react';
import { getTrending } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTrending()
      .then((data) => setMovies(data.results))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h1 className={css.title}>Популярне сьогодні</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </section>
  );
}
