import React, { useContext} from 'react'
import { useAuth } from '../../context/AuthContext'
import { MovieCard } from './MovieCard'


const Favourites = () => {

    const { currentUser } = useAuth()
    
    return (
        <div className="movie-page">
            <div className="container">
                <div className="header">
                    <h1 className="heading">
                        My Favourite Movies
                    </h1>
                    {/* <span className="count-pill">
                        {appFaves.length} {appFaves.length === 1 ? "Movie" : "Movies"}
                    </span> */}
                    <div>{currentUser.uid}</div>
                </div>

                {/* {appFaves.length > 0 ? (
                    <div className="movie-grid">
                    {appFaves.map(movie => (
                        <MovieCard movie={movie} />
                    ))}
                </div>
                ) : (<h2>No Movies yet !</h2>)} */}
                
            </div>
            
        </div>
    )
}
export default Favourites