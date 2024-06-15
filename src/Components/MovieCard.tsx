import { FaStar } from "react-icons/fa"
import { Link } from "react-router-dom"
import { MovieResults, ResultsEntity } from "../Interfaces/MoviesInterface"

const imageURL = import.meta.env.VITE_IMG

const MovieCard = ({ movieSent }: { movieSent: ResultsEntity }, showLink = true) => {
    return (
        <div className="movie-card">
            <img src={imageURL + movieSent.poster_path} alt={movieSent.title} />
            <h2>{movieSent.title}</h2>
            <p>
                <FaStar />
                {movieSent.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movieSent.id}`}>More details</Link>}
        </div>
        // <div className="movies-container">
        //     {movieSent?.results ? movieSent?.results.length > 0 ? movieSent.results.map((movie) => (
        //         <h1 key={movie.id}>{movie.title}</h1>
        //     )) : <p>Carregando</p> : <p>Erro... Tente novamente mais tarde</p>}
        // </div>
    )
}

export default MovieCard