const FILMS_PATH = `starwars/v1/films`

export const webApiLinks = {

    FILMS_PATH,

    CHARACTERS_PER_FILM_PATH: (filmId) => `${FILMS_PATH}/${filmId}/characters`

}