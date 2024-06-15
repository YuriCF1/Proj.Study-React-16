import { useEffect, useState } from "react";
import { MovieResults } from "../Interfaces/MoviesInterface";
import MovieCard from "../Components/MovieCard";
import "./GeneralMoviesGrid.css"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  // const [topMovies, setTopMovies] = useState<ResultsEntity[]>() //Atribuindo o valor diretamente
  const [topMovies, setTopMovies] = useState<MovieResults | null>(null);
  const [page, setPage] = useState(1);

  const handlePages = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const value = parseInt(e.currentTarget.value); // Obtém o valor do botão clicado e transforma para um numero
    setPage((prevPage) => prevPage + value); // Usa a função de atualização do estado para garantir que está usando o valor mais recente de page
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getTopRatedMovies = async (url: string) => {
    const res = await fetch(url);
    const data: MovieResults = await res.json();

    setTopMovies(data);
    console.log('Tamanho', data.results?.length);
  }

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?api_key=${apiKey}&page=${page}`;
    getTopRatedMovies(topRatedUrl);
  }, [page]);

  return (
    <div className="container">
      <h2 className="title">Best Movies Ever!</h2>
      <div className="movies-container">
        {topMovies?.results ? topMovies?.results.length > 0 ? topMovies.results.map((movie) => (
          <MovieCard key={movie.id} movieSent={movie} />
        )) : <p>Loading...</p> : <p>Error... Please, try again later</p>}
      </div>
      <div className="pages-container">
        {page > 1 && (
          <>
            {page > 2 && (
              <button onClick={(e) => handlePages(e)} value={-2}>{page - 2}</button>
            )}
            {page > 1 && (
              <button onClick={(e) => handlePages(e)} value={-1}>{page - 1}</button>
            )}
          </>
        )}
        <p>{page}</p>
        {topMovies && topMovies?.total_pages > page &&
          <>
            <button onClick={(e) => handlePages(e)} value={1}>
              {page + 1}
            </button>
            <button onClick={(e) => handlePages(e)} value={2}>
              {page + 2}
            </button>
          </>
        }
      </div>
    </div>
  )
}

export default Home;