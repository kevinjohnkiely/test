import React, { useContext} from 'react'
import {GlobalContext} from '../context/GlobalState'
import { MovieCard } from './MovieCard'

export const Favourites = () => {
    const {favourites} = useContext(GlobalContext)
    return (
        <div className="movie-page">
            <div className="container">
                <div className="header">
                    <h1 className="heading">
                        My Favourite Movies
                    </h1>
                    <span className="count-pill">
                        {favourites.length} {favourites.length === 1 ? "Movie" : "Movies"}
                    </span>
                </div>

                {favourites.length > 0 ? (
                    <div className="movie-grid">
                    {favourites.map(movie => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
                ) : (<h2>No Movies yet !</h2>)}
                
            </div>
            
        </div>
    )
}

