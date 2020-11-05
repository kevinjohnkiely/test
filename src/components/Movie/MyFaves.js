import React from 'react'
import { MovieCard } from './MovieCard'

export const MyFaves = (props) => {
    return (
        <div className="movie-page">
            <div className="container">
                <div className="header">
                    <h1 className="heading">
                        My Favourite Movies
                    </h1>
                    <span className="count-pill">
                        {props.faves.length} {props.faves.length === 1 ? "Movie" : "Movies"}
                    </span>
                </div>

                {props.faves.length > 0 ? (
                    <div className="movie-grid">
                    {props.faves.map(movie => (
                        <MovieCard key={movie.id} movie={movie} removeMovie={props.removeMovie} />
                    ))}
                </div>
                ) : (<h2>No Movies yet !</h2>)}
                
            </div>
            
        </div>
    )
}