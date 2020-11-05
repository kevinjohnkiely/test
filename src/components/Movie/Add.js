import React, { useState, useEffect } from 'react'
import { Modal, Button, Spinner, Alert} from 'react-bootstrap'
import {ResultCard} from './ResultCard'
import { useAuth } from '../../context/AuthContext'
import {MyFaves} from '../../components/Movie/MyFaves'

export const Add = () => {

    const [faves, setFaves] = useState([])
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [users, setUsers] = useState([])
    const [lookingFor, setLookingFor] = useState('')
    const [username, setUsername] = useState('')
    const { currentUser } = useAuth()
    const [matches, setMatches] = useState([])
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [showError, setShowError] = useState(false)

    const onChange = e => {
        e.preventDefault()
        setQuery(e.target.value)

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`)
        .then(response => response.json())
        .then(data => {
            if(!data.errors){
                setResults(data.results)
            } else {
                setResults([])
            }
        })
    }

    // get current users desired gender and name for a match
    useEffect(() => {
        fetch('https://movie-match-4fe2b.firebaseio.com/db/users/' + currentUser.uid + '/userdetails.json')
        .then(response => response.json())
        .then(responseData => {
            let loadedGender = ''
            let loadedName = ''
            
            for(const key in responseData) {
                loadedGender = responseData[key].lookingFor
                loadedName = responseData[key].name
            }
            setLookingFor(loadedGender)
            setUsername(loadedName)
        })
        .catch(error => {
            setError('Error connecting to database. Please try again soon.')
            setShowError(true)
        })
    }, [currentUser.uid])

    // Get current user favourite movies
    useEffect(() => {
        setIsLoading(true)
        fetch('https://movie-match-4fe2b.firebaseio.com/db/users/' + currentUser.uid + '/favourites.json')
        .then(response => {
            setIsLoading(false)
            return response.json()
        })
        .then(responseData => {
            const loadedMovies = []
            for(const key in responseData) {
                
                loadedMovies.push({
                    movid: key,
                    ...responseData[key]
                })
            }
            setFaves(loadedMovies)
        })
        .catch(error => {
            setError('Error loading your favourite movies. Please try again soon.')
            setShowError(true)
        })
    }, [currentUser.uid])

    // get all other user details from db
    useEffect(() => {
        fetch('https://movie-match-4fe2b.firebaseio.com/db/users.json')
        .then(response => {
            return response.json()
        })
        .then(responseData => {
            
            const loadedUsers = []
            
            for(const key in responseData) {
                const userMovies = []
                let userName = ''
                let gender = ''
                for(const fkey in responseData[key].favourites) {
                    userMovies.push(responseData[key].favourites[fkey].id)
                }

                for(const nkey in responseData[key].userdetails) {
                    userName = responseData[key].userdetails[nkey].name
                    gender = responseData[key].userdetails[nkey].gender
                }

                if (key !== currentUser.uid) {
                    loadedUsers.push({
                        userid: key,
                        name: userName,
                        gender: gender,
                        movies: userMovies
                    })
                }
            }
            setUsers(loadedUsers)
        })
        .catch(error => {
            setError('Error connecting to database. Please try again soon.')
            setShowError(true)
        })
    }, [currentUser.uid])
    
    // Add a new movie to favourites
    const addMovie = movie => {
        setIsLoading(true)
        fetch('https://movie-match-4fe2b.firebaseio.com/db/users/' + currentUser.uid + '/favourites.json',
        {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type':'application/json'}
        }).then(response => {
            setIsLoading(false)
            return response.json()
        }).then(responseData => {
            setFaves(prevFaves => [...prevFaves, {
                movid: responseData.name, ...movie
            }
        ])
        })
        .catch(error => {
            setError('Error adding a movie. Please try again.')
            setShowError(true)
        })
    }

    // Remove a movie from favourites
    const removeMovie = movieId => {
        setIsLoading(true)
        fetch('https://movie-match-4fe2b.firebaseio.com/db/users/' + currentUser.uid + '/favourites/' + movieId + '.json',
        {
            method: 'DELETE'            
        }).then(response => {
            setIsLoading(false)
            setFaves(prevFaves => prevFaves.filter(movie => movie.movid !== movieId))
        })
        .catch(error => {
            setError('Error removing a movie. Please try again.')
            setShowError(true)
        })
    }

    const findMatches = (myfaves, objectFaves) => {
        const yourMatches = []
        let prevName = ''
        for(let x=0;x<objectFaves.length;x++) { // this loops thru the array of objects
            //now in first object
            for(let y=0;y<objectFaves[x].movies.length;y++) { // loop thru movie array of object

                for(let z=0;z<myfaves.length;z++){

                    if(objectFaves[x].movies[y] === myfaves[z] && objectFaves[x].gender === lookingFor) {
                        if (prevName !== objectFaves[x].name) {
                            yourMatches.push({
                                user: objectFaves[x].name,
                                counter: 1
                            })
                        } else if (prevName === objectFaves[x].name) {
                            yourMatches[yourMatches.length - 1].counter ++
                        }
                        prevName = objectFaves[x].name
                    }
                }
            }
        }
        setMatches(yourMatches)
    }

    // putting current users favourite movie IDs into array
    const arrayFaves = []
    faves.map(movie => arrayFaves.push(movie.id))
    const areThereFaves = arrayFaves.length > 0 ? false : true

    let matchesOutput

    if(matches.length) {
    matchesOutput = matches.map(match => {
        return <div key={match.user}>You have <strong>{match.counter} </strong>
        {match.counter > 1 ? ' matches' : ' match'} with <span style={{
            backgroundColor:'#21d07a',
            padding: '3px',
            color: 'white',
            textTransform: 'uppercase'
        }}>{match.user}</span></div>
    }) } else {
        matchesOutput = <div>Nothing yet!</div>
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        {error && showError && <Alert variant="danger" onClose={() => setShowError(false)} dismissible >{error}</Alert> }
        <div className="add-page">
        
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                    <h2 className="text-center mb-4">Hi {username}, 
                    please add movies and...
                    <Button
                        disabled={areThereFaves}
                        variant="primary" 
                        onClick={() => { findMatches(arrayFaves, users); handleShow();}}
                    >find your matches!</Button></h2>
                        <input type="text" 
                        placeholder="Search Movies!"
                        value={query}
                        onChange={onChange} />
                    </div>
                    {results.length > 0 && (
                        // <ul className="results">
                        <div className="movie-grid-results">
                            {results.map(movie => (
                                <div className="movie-card" key={movie.id}>
                                    <ResultCard 
                                        addMovie={addMovie} 
                                        movie={movie} 
                                        faves={faves}
                                        />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <div className="container">
        
        {isLoading ? <Spinner animation="border" variant="primary" /> : <MyFaves faves={faves} removeMovie={removeMovie}/>}
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Movie Matches!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{matchesOutput}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </>
    )
}
