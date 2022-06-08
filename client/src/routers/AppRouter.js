import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import Home
import ProfilePage from '../components/HomePage';
import Gallery from '../components/Gallery';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <div className="main-content">
        <Switch>
          <Route component={ProfilePage} path="./src/pages/Profile.js" exact={true} />
          <Route component={Gallery} path="./src/components/Gallery.js" />
         
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter;