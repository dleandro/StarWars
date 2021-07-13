'use strict'

// This file defines all endpoints

const router = require('express').Router(),
    requestHandler = require('./requests/request-handler'),
    urls = require('./util/swapi-api-links'),
    apiUtils = require('./util/api-utils')

//router.route('/login')
//  .post((req, res) => {
//    res.send(req.user.profile);
//}, passport.authenticate('jwt', { session: false }))

router.route('/films')
    .get((req, res) => {

        apiUtils.fetchDataAndSetResponse(res,
            async () => requestHandler.get(urls.filmsUrl),
            (data) =>
                data.results.map(film => ({
                    id: film.episode_id,
                    title: film.title
                }))
        )
    })

router.route('/films/:filmId/characters')
    .get((req, res) => {

        apiUtils.fetchDataAndSetResponse(res,
            async () => {
                const film = await requestHandler.get(urls.specificFilmUrl(req.params.filmId))

                return Promise.all(film.characters.map(characterLink => getAllOfCharactersNeededInfo(characterLink)))
            },
            (data) =>
                data.map(character => ({
                    name: character.name,
                    gender: character.gender,
                    origin: character.origin,
                    species: character.species
                }))
        )
    })

const getAllOfCharactersNeededInfo = async (characterLink) => {

    const character = await requestHandler.get(characterLink)

    const species = character.species.map(
        (speciesLink) => requestHandler.get(speciesLink))

    character.species = (await Promise.all(species)).map(specie => specie.name).join()

    const planet = requestHandler.get(character.homeworld)

    character.origin = (await planet).name

    return character

}

module.exports = router