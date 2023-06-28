import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import WatchList from './components/WatchList';
import About from './components/About';
// import Footer from './components/Footer';
import Login from './Login';
// import Logout from './Logout';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        {
          this.props.auth0.isAuthenticated ?
            <Router>
               
              <Header />
              <Routes>

                <Route exact path="/" element={<Main />}>
                </Route>

                {/* <Route exact path="/watchlist" element={<WatchList/>}>
                </Route>  */}

              <Route exact path="/watchlist" element={<WatchList />} />
              <Route exact path="/about" element={<About />} />


              </Routes>
              {/* <Footer /> */}
            </Router>
            :
            <Login />

        }
      </>
    );
  }
}

export default withAuth0(App);
