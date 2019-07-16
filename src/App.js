import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';

import SearchContainer from './containers/search-container';
import GifContainer from './containers/gif-container';
import FavoriteContainer from './containers/favorite-container';
import NavBar from './containers/navBar';
import GifDetails from './components/gif-details-component';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const home = () => {
  return (
    <div className="App">
      <SearchContainer />
      <GifContainer />
    </div>
  );
};

const App = () => {
  return (
    <Provider
      store={createStoreWithMiddleware(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
    >
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/favorite" exact component={FavoriteContainer} />
            <Route path="/:id" exact component={GifDetails} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
