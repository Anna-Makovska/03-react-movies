import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import './App.module.css'
import { fetchMovies } from '../../services/movieService'
import { useState } from 'react'
import type { Movie } from '../../types/movie'
import { Toaster, toast } from 'react-hot-toast'
import Loader from '../Loader/Loader'
import  ErrorMessage  from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleModalOpen = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const moviesData = await fetchMovies(query);
      console.log(moviesData);
      setMovies(moviesData);
      if (moviesData.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        toast.success(`Found ${moviesData.length} movies.`);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleModalOpen} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && selectedMovie && <MovieModal onClose={handleModalClose} movie={selectedMovie}/>}
    </>
  );
}

export default App
