import { useEffect, useState } from "react";
import { MovieResults, ResultsEntity } from "../Interfaces/MoviesInterface";
import MovieCard from "../Components/MovieCard";
import "./GeneralMoviesGrid.css"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  // const [topMovies, setTopMovies] = useState<ResultsEntity[]>() //Atribuindo o valor diretamente
  const [topMovies, setTopMovies] = useState<MovieResults | null>(null);

  const getTopRatedMovies = async (url: string) => {
    const res = await fetch(url);
    const data: MovieResults = await res.json();

    setTopMovies(data);
    console.log('Tamanho', data.results?.length);
  }

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Best Movies Ever!</h2>
      <div className="movies-container">
        {topMovies?.results ? topMovies?.results.length > 0 ? topMovies.results.map((movie) => (
          <MovieCard key={movie.id} movieSent={movie} />
        )) : <p>Loading...</p> : <p>Error... Please, try again later</p>}
      </div>
    </div>
  )
}

export default Home;