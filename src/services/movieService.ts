import axios from "axios";
import type { Movies } from "../types/movies";

interface moviesHttpResponse {
    results: Movies[];
}

const myKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export const fetchMovies = async (query: string) : Promise<Movies[]> => {
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