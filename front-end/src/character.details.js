// CharacterDetails.js

import React, { Component } from 'react';
import axios from 'axios'; // Importa Axios

class CharacterDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: null,
    };
  }

  componentDidMount() {
    // Obtenemos el ID del personaje desde los parámetros de la URL
    const { id } = this.props.match.params;

    // Hacemos una solicitud al backend de Nest.js para obtener los detalles del personaje por su ID
    axios
      .get(`http://localhost:3001/rick-and-morty/character/${id}`)
      .then((response) => {
        this.setState({ character: response.data });
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del personaje:', error);
      });
  }

  render() {
    const { character } = this.state;

    if (!character) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container mt-4">
        <h2>Character Details</h2>
        <div className="card">
          <img src={character.image} alt={character.name} className="card-img-top" />
          <div className="card-body">
            <h3 className="card-title">Name: {character.name}</h3>
            <p className="card-text">Status: {character.status}</p>
            <p className="card-text">Species: {character.species}</p>
            <p className="card-text">Type: {character.type}</p>
            <p className="card-text">Gender: {character.gender}</p>
            <p className="card-text">Origin: {character.origin.name}</p>
            <p className="card-text">Location: {character.location.name}</p>
            {/* Puedes agregar más detalles aquí según las propiedades del modelo de personaje */}
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterDetails;



