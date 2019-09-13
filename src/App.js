import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from './reducers';
import Home from './home/home';
import Nav from './nav/nav';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

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
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/favorite" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
