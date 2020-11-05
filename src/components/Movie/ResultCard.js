import React from 'react'

export const ResultCard = (props) => {

    const {movie, addMovie, faves} = props

    let storedMovie = faves.find((obj) => obj.id === movie.id)

    const favouritesDisabled = storedMovie ? true : false
    const buttonText = !storedMovie ? 'Add' : 'Added'

    return (
        <div>
            <div className="result-card">
                <div className="poster-wrapper">
                    {movie.poster_path ? (
                    <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                  />
                    ) : (
                        <div className="filler-poster"></div>
                    )}
                </div>
                <div className="info">
                    <div className="header">
                        <h3 className="title">{movie.title}</h3>
                        <h4 className="release-date">
                            {movie.release_date ? movie.release_date.substring(0, 4) : '-'}
                        </h4>
                    </div>

                    <div className="controls">
                        <button className="btn"
                        disabled={favouritesDisabled}
                            onClick={() => addMovie(movie)}>
                            {buttonText} to Favourites!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
