import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import './index.css';
import rootReducer from './reducers';
import Game from './containers/Game';
import Register from './Pages/register';
import Login from './Pages/login';

const store = createStore(rootReducer);

function App() {
  return (
    <div>
      <Router>
        <div>
          <Provider store={store}>
            <>
              <Navbar bg="dark" variant="primary">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                  <Nav.Link>
                    <Link to="/">Home</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/register">Register</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/login">Login</Link>
                  </Nav.Link>
                </Nav>
              </Navbar>
            </>

            {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}

            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Game />
              </Route>
            </Switch>
          </Provider>
        </div>
      </Router>
    </div>
  );
}

export default App;
