import type { Movies } from '../../types/movie';
import css from './MovieGrid.module.css';
interface MovieGridProps {
  movies: Movies[];
  modalOpen: (movieId: number) => void;
  movieId?: number | null;
}



export default function MovieGrid ({movies, modalOpen} : MovieGridProps) {
    return (
      <ul className={css.grid}>
        {movies.map((movie) => (
          <li key={movie.id} onClick={() => modalOpen(movie.id)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                }
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    );
}