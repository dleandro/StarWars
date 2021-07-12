'use strict'

const baseUrl = 'https://swapi.dev/api/',
filmsUrl = `${baseUrl}films/`

module.exports = {

    baseUrl,

    filmsUrl,

    specificFilmUrl: (filmId) => `${filmsUrl}${filmId}`

}