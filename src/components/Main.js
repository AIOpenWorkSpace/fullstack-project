import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Main.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchQuery: '',
      searchResult: null,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movies`;
      let updatedMovieFromAxios = await axios.get(url);

      this.setState({
        movies: updatedMovieFromAxios.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    let prompt = `Evaluate "${this.state.searchQuery}" on all of these categories for teenagers: language usage, alcohol and other drugs, portrayal of ex and romantic relationships, positive role models, positive messages, diverse representation, violence, product placement.`;

    try {
      let updatedMovieFromAxios = await axios.post(`${process.env.REACT_APP_SERVER}/ask/${this.state.searchQuery}`, { prompt });

      this.setState({
        searchResult: updatedMovieFromAxios.data.data,
      });

      await this.getMovies();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Title Restrictions for: </h2>
        <p>Please use the search bar below to check the maturity level of movies.</p>
        {this.state.searchResult && (
          <>
            <img src={this.state.searchResult.imageURL} alt={this.state.searchResult.title} />
            <h3>Result</h3>
            <p>{this.state.searchResult.description}</p>
          </>
        )}
        <Form onSubmit={this.handleSearchSubmit}>
          <Form.Group controlId="searchQuery">
            <Form.Control
              type="text"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search Movies"
            />
          </Form.Group>
          <div className="button-container">
            <Button variant="primary" type="submit">
              Search
            </Button>
          </div>
        </Form>
        {/* {this.state.movies.map((movie) => (
          <div key={movie._id}>
            <h3>{movie.title}</h3>
            <p>Language Rating: {movie.languageRating}</p>
            <p>Language Description: {movie.languageDescription}</p>
            <p>Drug Rating: {movie.drugRating}</p>
            <p>Drug Description: {movie.drugDescription}</p>
            <p>Sex Description: {movie.sexDescription}</p>
          </div>
        ))} */}
      </div>
    );
  }
}

export default Main;
