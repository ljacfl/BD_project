// App.routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharacterList from './CharacterList'; // Importa tu componente de lista de personajes
import CharacterDetails from './CharacterDetails'; // Importa tu componente de detalles de personaje

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CharacterList} />
        <Route path="/character/:id" component={CharacterDetails} />
      </Switch>
    </Router>
  );
}

export default AppRoutes;
