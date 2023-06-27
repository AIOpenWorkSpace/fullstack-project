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
      searchQuery: '',
      searchResult: null,
      error: '',
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    let prompt = `Evaluate "${this.state.searchQuery}" on all of these categories for teenagers: language usage, alcohol and other drugs, portrayal of ex and romantic relationships, positive role models, positive messages, diverse representation, violence, product placement.`;

    try {
      let updatedMovieFromAxios = await axios.post(
        `${process.env.REACT_APP_SERVER}/ask/${this.state.searchQuery}`,
        { prompt }
      );

      this.setState({
        searchResult: updatedMovieFromAxios.data.data,
        error: '',
      });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    const { searchResult, error } = this.state;
  
    return (
      <div className="container">
        <h2>Title Restrictions for: </h2>
        <p>Please use the search bar below to check the maturity level of movies.</p>
        {error && <p className="error-message">{error}</p>}
        {searchResult && (
          <>
            <div>
              <img
                src={searchResult.imageURL}
                alt={searchResult.title}
                className="result-image"
              />
            </div>
            <div>
              <h3>Result</h3>
              <p>{searchResult.languageDescription}</p>
              <p>{searchResult.drugDescription}</p>
              <p>{searchResult.sexDescription}</p>
              <p>{searchResult.roleModelDescription}</p>
              <p>{searchResult.messageDescription}</p>
              <p>{searchResult.representationDescription}</p>
              <p>{searchResult.violenceDescription}</p>
              <p>{searchResult.productDescription}</p>
            </div>
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
      </div>
    );
  }
};

export default Main;
