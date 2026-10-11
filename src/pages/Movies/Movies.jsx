import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdbApi';
import MovieList from '../../components/MovieList/MovieList';
import css from './Movies.module.css';

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoaded(false);
    searchMovies(query)
      .then((data) => {
        setMovies(data.results);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoaded(true));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.query.value.trim();
    if (value) setSearchParams({ query: value });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="query"
          type="text"
          defaultValue={query}
          placeholder="Назва фільму"
          aria-label="Назва фільму"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Шукати
        </button>
      </form>
      {error && <p>{error}</p>}
      {query && loaded && !error && movies.length === 0 && (
        <p>За запитом «{query}» нічого не знайдено.</p>
      )}
      <MovieList movies={movies} />
    </section>
  );
}
