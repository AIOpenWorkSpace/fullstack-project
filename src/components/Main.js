import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import '../style/Main.css';
import Card from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';


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


  addToWatchlist = async (movie) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/movies`, movie);
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSaveMovie = async () => {
    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/movies',
        data: this.state.searchResult
      }
/**NOTE: do we want the return set to state?  */
      let savedMovie = await axios(config);
    }
  }


  renderMovieDetailsAccordion = () => {
    const { searchResult } = this.state;

    if (!searchResult) {
      return null;
    }

    return (
      <div className="div-accordion">
        <div className="card-div">
          <Card style={{ width: '18rem' }} className="text-center">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${searchResult.imageURL}`} alt="Movie Poster" />
            <Card.Body>
              <Card.Title>{searchResult.title.toUpperCase()}</Card.Title>
              <Button onClick={() => this.addToWatchlist(searchResult)}>Add to Watch List</Button>
            </Card.Body>
          </Card>
        </div>


   <Accordion className="whole-accordion">
  <Accordion.Item eventKey="0">
    <Accordion.Header className="accordion-header">
      <p>Language Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.languageDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header className="accordion-header">
      <p>Drug Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.drugDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="2">
    <Accordion.Header className="accordion-header">
      <p>Sex Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.sexDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="3">
    <Accordion.Header className="accordion-header">
      <p>Role Model Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.roleModelDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="4">
    <Accordion.Header className="accordion-header">
      <p>Message Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.messageDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="5">
    <Accordion.Header className="accordion-header">
      <p>Representation Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.representationDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="6">
    <Accordion.Header className="accordion-header">
      <p>Violence Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.violenceDescription}</Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="7">
    <Accordion.Header className="accordion-header">
      <p>Product Description</p>
    </Accordion.Header>
    <Accordion.Body>{searchResult.productDescription}</Accordion.Body>
  </Accordion.Item>
</Accordion>

    </div>
    
    );
  };

  render() {
    const error = this.state.error;
    const searchResult = this.state.searchResult;
    // const watchlist = this.state.watchlist; 
  
    return (

      <div className="movie-container">
        <h2>Title Restrictions for:</h2>
        <p>Use the search bar to check the maturity level of movies.</p>
  
        <div className="search-container">
          <Form onSubmit={this.handleSearchSubmit}>
            <div className="d-flex">
              <Form.Group controlId="searchQuery" className="me-2">
                <Form.Control
                  type="text"
                  value={this.state.searchQuery}
                  onChange={this.handleSearchChange}
                  placeholder="Search Movies"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </div>
          </Form>
        </div>
  
        {error && <p className="error-message">{error}</p>}
        {searchResult && this.renderMovieDetailsAccordion()}
      </div>
    );
  }
}

export default withAuth0(Main);

