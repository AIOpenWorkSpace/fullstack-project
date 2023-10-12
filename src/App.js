import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import WatchList from './components/WatchList';
import About from './components/About';
import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    const { isAuthenticated, isLoading } = this.props.auth0;

    if(isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <>
        {
          isAuthenticated ?
            <Router>
               
              <Header />
              <Routes>
                <Route exact path="/" element={<Main />}/>
                <Route exact path="/watchlist" element={<WatchList />} />
                <Route exact path="/about" element={<About />} />
              </Routes>
              
            </Router>
            :
            <Login />

        }
      </>
    );
  }
}

export default withAuth0(App);
