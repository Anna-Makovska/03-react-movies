import axios from "axios";
import type { Movie } from "../types/movie";

interface moviesHttpResponse {
    results: Movie[];
}

const myKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (query: string) : Promise<Movie[]> => {
    const response = await axios.get<moviesHttpResponse>(BASE_URL, {
      params: {
        query: query,
      },
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    });
    return response.data.results;
}