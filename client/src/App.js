
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Switch } from 'react-router-dom';

//IMPORT PAGES
import Home from './pages/Home'
import Profile from './pages/Profile';

// IMPORT COMPONENTS
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
        <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
              <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
            </Switch>
          </>
        </Router>
      </ApolloProvider>
  );
}

export default App;
