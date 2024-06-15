import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../Components/MovieCard";
import { MovieResults } from "../Interfaces/MoviesInterface";

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams(); //O SearchParams retorna um array
  const [moviesFound, setMoviesFound] = useState<MovieResults | undefined>();
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

  const query = searchParams.get("query");

  const searchingMovies = async (url: string) => {
    const res = await fetch(url);
    const data: MovieResults = await res.json();

    setMoviesFound(data);
    console.log("MOVIES FOUND", data);
  };

  useEffect(() => {
    const urlToSearch = `${searchUrl}?query=${query}&api_key=${apiKey}&page=${page}`;
    searchingMovies(urlToSearch);
  }, [query, page]);

  return (
    <div className="container">
      <h2 className="title">
        Results from: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {moviesFound?.results ? (
          moviesFound?.results.length > 0 ? (
            moviesFound.results.map((movie) => (
              <MovieCard key={movie.id} movieSent={movie} />
            ))
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <p>Error... Please, try again later</p>
        )}
      </div>
      <div className="pages-container">
        {page > 2 && (
          <>
            <button onClick={(e) => handlePages(e)} value={-2}>
              {page - 2}
            </button>
            <button onClick={(e) => handlePages(e)} value={-1}>
              {page - 1}
            </button>
          </>
        )}
        <p>{page}</p>
        {moviesFound && moviesFound?.total_pages > page &&
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
  );
};

export default Search;
