import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BestMovies from './components/BestMovies';
import WatchList from './components/WatchList';
import About from './components/About';
import Footer from './components/Footer';


class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<BestMovies />} />
            <Route exact path="/watchlist" element={<WatchList/>} />
            <Route exact path="/about" element={<About/>} />
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
