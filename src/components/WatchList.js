import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import '../style/WatchList.css';
import { withAuth0 } from '@auth0/auth0-react';


class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: [],
      error: '',
      selectedMovie: null,
      showModal: false,
      editingDescription: '',
      isEditing: false,
      editedLanguageDescription: '',
      editedDrugDescription: '',
      editedSexDescription: '',
      editedRoleModelDescription: '',
      editedMessageDescription: '',
      editedRepresentationDescription: '',
      editedViolenceDescription: '',
      editedProductDescription: '',
    };
  }

  componentDidMount() {
    this.fetchWatchList();
  }

  async fetchWatchList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/movies?userName=${this.props.auth0.user.email}`);
      this.setState({ watchlist: response.data });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'An error occurred while fetching the watchlist.' });
    }
  }

  deleteMovie = async (movieId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/movies/${movieId}`);
      this.fetchWatchList();
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'An error occurred while deleting the movie.' });
    }
  };

  updateDescription = async (movieId, field, value) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/movies/${movieId}`, { [field]: value });
      this.setState((prevState) => {
        const updatedWatchlist = prevState.watchlist.map((movie) => {
          if (movie._id === movieId) {
            return { ...movie, [field]: value };
          }
          return movie;
        });
        return { watchlist: updatedWatchlist };
      });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'An error occurred while updating the description.' });
    }
  };

  openModal = (movie) => {
    this.setState({
      selectedMovie: movie,
      showModal: true,
      editingDescription: movie.description,
      isEditing: false,
      editedLanguageDescription: movie.languageDescription,
      editedDrugDescription: movie.drugDescription,
      editedSexDescription: movie.sexDescription,
      editedRoleModelDescription: movie.roleModelDescription,
      editedMessageDescription: movie.messageDescription,
      editedRepresentationDescription: movie.representationDescription,
      editedViolenceDescription: movie.violenceDescription,
      editedProductDescription: movie.productDescription,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, isEditing: false });
  };

  enableEditing = () => {
    this.setState({ isEditing: true });
  };

  handleDescriptionChange = (event) => {
    this.setState({ editingDescription: event.target.value });
  };

  handleAccordionDescriptionChange = (event, section) => {
    const { value } = event.target;
    this.setState({ [`edited${section}Description`]: value });
  };
  


  saveDescription = () => {
    const {
      selectedMovie,
      editingDescription,
      editedLanguageDescription,
      editedDrugDescription,
      editedSexDescription,
      editedRoleModelDescription,
      editedMessageDescription,
      editedRepresentationDescription,
      editedViolenceDescription,
      editedProductDescription
    } = this.state;
  
    const updatedMovie = {
      description: editingDescription,
      languageDescription: editedLanguageDescription,
      drugDescription: editedDrugDescription,
      sexDescription: editedSexDescription,
      roleModelDescription: editedRoleModelDescription,
      messageDescription: editedMessageDescription,
      representationDescription: editedRepresentationDescription,
      violenceDescription: editedViolenceDescription,
      productDescription: editedProductDescription
    };
  
    this.updateDescription(selectedMovie._id, 'description', editingDescription);
    this.updateDescription(selectedMovie._id, 'languageDescription', editedLanguageDescription);
    this.updateDescription(selectedMovie._id, 'drugDescription', editedDrugDescription);
    this.updateDescription(selectedMovie._id, 'sexDescription', editedSexDescription);
    this.updateDescription(selectedMovie._id, 'roleModelDescription', editedRoleModelDescription);
    this.updateDescription(selectedMovie._id, 'messageDescription', editedMessageDescription);
    this.updateDescription(selectedMovie._id, 'representationDescription', editedRepresentationDescription);
    this.updateDescription(selectedMovie._id, 'violenceDescription', editedViolenceDescription);
    this.updateDescription(selectedMovie._id, 'productDescription', editedProductDescription);
    
    axios
      .put(`${process.env.REACT_APP_SERVER}/movies/${selectedMovie._id}`, updatedMovie)
      .then(() => {
        this.closeModal();
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({ error: 'An error occurred while updating the description.' });
      });
  };
  
  renderMovieCards = () => {
    const { watchlist } = this.state;
  
    return (
      <div className="card-container">
        {watchlist.map((movie, index) => (
          <Card key={index} style={{ width: '25rem' }}>
            <Card.Body>
              <div className="card-content">
                <Card.Title className="movie-title">{movie.title.toUpperCase()}</Card.Title>
                <div className="button-group">
                  <Button className="description-button" onClick={() => this.openModal(movie)}>
                    View Description
                  </Button>
                  <Button className="delete-button" variant="danger" onClick={() => this.deleteMovie(movie._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };
  

  render() {
    const { error, selectedMovie, showModal, editingDescription, isEditing, editedLanguageDescription, editedDrugDescription, editedSexDescription, editedRoleModelDescription, editedMessageDescription, editedRepresentationDescription, editedViolenceDescription, editedProductDescription } = this.state;

    return (
      <div>
        <h2 id="title-watchlist" style={{ textAlign: 'center', marginTop: '30px' }}>
          Your Watch List
        </h2>
        {error && <p className="error-message">{error}</p>}
        {this.renderMovieCards()}

        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie && selectedMovie.title.toUpperCase()}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {selectedMovie && (
              <div>
                <p>{editingDescription}</p>
                {/* {isEditing ? (
                  <textarea
                    className="form-control"
                    rows={4}
                    value={editingDescription}
                    onChange={this.handleDescriptionChange}
                  />
                ) : ( */}
                  <p>{selectedMovie.description}</p>
                {/* )} */}
            <Accordion className="whole-accordion">
  <Accordion.Item eventKey="language">
    <Accordion.Header className="accordion-header">
      <p>Language Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedLanguageDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Language')}
        />
      ) : (
        <p>{selectedMovie.languageDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="drug">
    <Accordion.Header className="accordion-header">
      <p>Drug Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedDrugDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Drug')}
        />
      ) : (
        <p>{selectedMovie.drugDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="sex">
    <Accordion.Header className="accordion-header">
      <p>Sex Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedSexDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Sex')}
        />
      ) : (
        <p>{selectedMovie.sexDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="roleModel">
    <Accordion.Header className="accordion-header">
      <p>Role Model Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedRoleModelDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'RoleModel')}
        />
      ) : (
        <p>{selectedMovie.roleModelDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="message">
    <Accordion.Header className="accordion-header">
      <p>Message Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedMessageDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Message')}
        />
      ) : (
        <p>{selectedMovie.messageDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="representation">
    <Accordion.Header className="accordion-header">
      <p>Representation Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedRepresentationDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Representation')}
        />
      ) : (
        <p>{selectedMovie.representationDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="violence">
    <Accordion.Header className="accordion-header">
      <p>Violence Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedViolenceDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Violence')}
        />
      ) : (
        <p>{selectedMovie.violenceDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>

  <Accordion.Item eventKey="product">
    <Accordion.Header className="accordion-header">
      <p>Product Description</p>
    </Accordion.Header>
    <Accordion.Body>
      {isEditing ? (
        <textarea
          className="form-control"
          rows={4}
          value={editedProductDescription}
          onChange={(event) => this.handleAccordionDescriptionChange(event, 'Product')}
        />
      ) : (
        <p>{selectedMovie.productDescription}</p>
      )}
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {!isEditing && (
              <Button variant="primary" onClick={this.enableEditing}>
                Edit
              </Button>
            )}
            {isEditing && (
              <>
                <Button variant="secondary" onClick={this.closeModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={this.saveDescription}>
                  Save Changes
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withAuth0(WatchList);
