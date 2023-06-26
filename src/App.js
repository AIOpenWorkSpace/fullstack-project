import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
// import WatchList from './components/WatchList';
import About from './components/About';
// import Footer from './components/Footer';



import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>

          <Header />

          <Routes>
            
          <Route exact path="/" element={<Main />}>
           </Route>

            {/* <Route exact path="/watchlist" element={<WatchList/>}>
            </Route>  */}

            <Route exact path="/about" element={<About/>} >
            </Route>

          </Routes>
          {/* <Footer /> */}
        </Router>
      </>
    );
  }
}

export default App;
