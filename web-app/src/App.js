import React, { useState, useEffect } from 'react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Dropdown, Icon, Menu, Table } from 'semantic-ui-react'
import { getStarWarsFilms, getCharactersPerFilm } from './services/ApiServices'
import { Loader } from 'semantic-ui-react'



function App() {

  require('dotenv').config()

  const [starWarsMovies, setStarWarsMovies] = useState([])

  const [starWarsCharacters, setStarWarsCharacters] = useState([])

  const [selectedFilm, setSelectedFilm] = useState(undefined)

  useEffect(() => {
    const fetchData = async () => {
      setStarWarsMovies((await getStarWarsFilms()).data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setStarWarsCharacters([])
      if (selectedFilm !== undefined) {
        setStarWarsCharacters((await getCharactersPerFilm(selectedFilm)).data)
      }
    }
    fetchData()
  }, [selectedFilm])

  const updateSelectedFilm = (event, text) => {
    if (text.value === "") {
      setSelectedFilm(undefined)
    } else {
      setSelectedFilm(text.value)
    }
  }

  return (
    <div className="App" >
      <main style={{
        backgroundImage: `url(https://wallpaperaccess.com/full/4620521.jpg)`, backgroundPosition: 'center',
        backgroundSize: 'cover', 'backgroundAttachment': 'fixed', height: '100vh', overflow: 'auto',
      }}>
        <Dropdown
          onChange={updateSelectedFilm}
          style={{ marginTop: '10%', width: '30%', marginLeft: '35%' }}
          clearable
          fluid
          search
          selection
          options={starWarsMovies.map(movie => ({ key: movie.id, value: movie.id, flag: movie.id, text: movie.title }))}
          placeholder='Select a Movie'
        />

        {selectedFilm !== undefined ?
          <Table celled style={{ width: '70%', marginLeft: '15%' }}>
            <Table.Header>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Species</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
            </Table.Header>

            <Table.Body>
              {starWarsCharacters.map(character =>
                <Table.Row>
                  <Table.Cell>{character.name}</Table.Cell>
                  <Table.Cell>{character.gender}</Table.Cell>
                  <Table.Cell>{character.species}</Table.Cell>
                  <Table.Cell>{character.origin}</Table.Cell>
                </Table.Row>
              )}

            </Table.Body>

          </Table> :
          undefined}


        {starWarsCharacters.length === 0 && selectedFilm !== undefined ? <Loader active inline='centered' /> : undefined}

      </main>

    </div>
  );
}

export default App;
