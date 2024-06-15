import { useEffect, useState } from "react"
import { BsCalendar3, BsFillFileEarmarkTextFill, BsGraphUp, BsHourglassSplit, BsWallet2 } from "react-icons/bs"
import { useParams } from "react-router-dom"

import MovieCard from "../Components/MovieCard"

import './Movie.css'
import { MovieDetails } from "../Interfaces/MovieDetails"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const { id } = useParams()//Todos os atributos que tiverem mapeados no arquivo de rotas, virá para o useState
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)

    const getMovie = async (url: string) => {
        const res = await fetch(url)
        const data: MovieDetails = await res.json()

        setMovieDetails(data)
    }

    useEffect(() => {
        const urlUniqueMovie = `${moviesURL}${id}?api_key=${apiKey}`
        getMovie(urlUniqueMovie)
    }, [])

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    };


    return (
        <div className="movie-page">
            {movieDetails && <MovieCard movieSent={movieDetails} showLink={false}></MovieCard>}
            <p className="tagline">{movieDetails?.tagline}</p>
            <div className="info">
                <div className="info">
                    <h3> <BsWallet2 /> Budge</h3>
                    <p>{movieDetails?.budget ? movieDetails.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}</p>
                </div>
                <div className="info">
                    <h3> <BsGraphUp /> Profit:</h3>
                    <p>{movieDetails?.revenue ? movieDetails.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'N/A'}</p>
                </div>
                <div className="info">
                    <h3> <BsHourglassSplit /> Movie length:</h3>
                    <p>{movieDetails?.runtime ? formatRuntime(movieDetails.runtime) : 'N/A'}</p>
                </div>
                <div className="info">
                    <h3> <BsCalendar3 /> Release Date:</h3>
                    <p>{movieDetails?.runtime ? movieDetails.release_date : 'N/A'}</p>
                </div>
                <div className="info description">
                    <h3> <BsFillFileEarmarkTextFill /> Description:</h3>
                    <p>{movieDetails?.overview ? movieDetails.overview : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default Movie