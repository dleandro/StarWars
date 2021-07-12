const { FILMS_PATH, CHARACTERS_PER_FILM_PATH } = require('./links').webApiLinks;

const DEFAULT_OPTIONS = met => ({method: met, credentials: 'include', headers: {'Content-Type': 'application/json'}});


const request = (url, init) => fetch(url, init)
    .then(async resp => {
        const jsonResponse = await resp.json()
        if (resp.ok) {
            return jsonResponse
        }
        const error = new Error(jsonResponse.message)
        error.status = resp.status
        throw error
    })

export const getStarWarsFilms = () => request(FILMS_PATH, DEFAULT_OPTIONS('GET'))


export const getCharactersPerFilm = (filmId) => request(CHARACTERS_PER_FILM_PATH(filmId), DEFAULT_OPTIONS('GET'))
