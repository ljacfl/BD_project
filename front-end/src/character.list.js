// CharacterList.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CharacterList extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    // Hacemos una solicitud al backend de Nest.js para obtener la lista de personajes
    fetch('http://localhost:3001/rick-and-morty/characters')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ characters: data });
      })
      .catch((error) => {
        console.error('Error al obtener la lista de personajes:', error);
      });
  }

  handleUpdateData = () => {
    // Realiza una solicitud al backend para actualizar los datos desde la API de Rick and Morty
    fetch('http://localhost:3001/rick-and-morty/update-data', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('Datos actualizados exitosamente desde la API de Rick and Morty');
        } else {
          alert('Error al actualizar datos desde la API');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar datos:', error);
      });
  };

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        <h2 className="my-4">Character List</h2>
        <button
          className="btn btn-primary mb-3"
          onClick={this.handleUpdateData}
        >
          Actualizar Datos desde la API
        </button>
        <ul className="list-group">
          {characters.map((character) => (
            <li key={character._id} className="list-group-item">
              {/* Enlace a la página de detalles del personaje */}
              <Link to={`/character/${character._id}`}>{character.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CharacterList;


