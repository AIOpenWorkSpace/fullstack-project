import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import "../style/WatchList.css";
import { withAuth0 } from "@auth0/auth0-react";

class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: [],
      error: "",
      selectedMovie: null,
      showModal: false,
      isEditing: false,
      editedLanguageDescription: "",
      editedDrugDescription: "",
      editedSexDescription: "",
      editedRoleModelDescription: "",
      editedMessageDescription: "",
      editedRepresentationDescription: "",
      editedViolenceDescription: "",
      editedProductDescription: "",
      editedLanguageRating: null,
      editedDrugRating: null,
      editedSexRating: null,
      editedRoleModelRating: null,
      editedMessageRating: null,
      editedRepresentationRating: null,
      editedViolenceRating: null,
      editedProductRating: null,
    };
  }

  componentDidMount() {
    this.fetchWatchList();
    console.log(this.props.auth0.user.email);  
  }

  async fetchWatchList() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/movies?userEmail=${this.props.auth0.user.email}`);
      this.setState({ watchlist: response.data });
    } catch (error) {
      console.log(error.message);
      this.setState({
        error: "An error occurred while fetching the watchlist.",
      });
    }
  }

  deleteMovie = async (movieId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/movies/${movieId}`);
      this.fetchWatchList();
    } catch (error) {
      console.log(error.message);
      this.setState({ error: "An error occurred while deleting the movie." });
    }
  };

  updateDescription = async (movieId, updatedMovie) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/movies/${movieId}`, updatedMovie);
      this.fetchWatchList();
    } catch (error) {
      console.log(error.message);
      this.setState({
        error: "An error occurred while updating the description.",
      });
    }
  };

  openModal = (movie) => {
    this.setState({
      selectedMovie: movie,
      showModal: true,
      isEditing: false,
      editedLanguageDescription: movie.languageDescription,
      editedDrugDescription: movie.drugDescription,
      editedSexDescription: movie.sexDescription,
      editedRoleModelDescription: movie.roleModelDescription,
      editedMessageDescription: movie.messageDescription,
      editedRepresentationDescription: movie.representationDescription,
      editedViolenceDescription: movie.violenceDescription,
      editedProductDescription: movie.productDescription,
      editedLanguageRating: movie.languageRating,
      editedDrugRating: movie.drugRating,
      editedSexRating: movie.sexRating,
      editedRoleModelRating: movie.roleModelRating,
      editedMessageRating: movie.messageRating,
      editedRepresentationRating: movie.representationRating,
      editedViolenceRating: movie.violenceRating,
      editedProductRating: movie.productRating
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, isEditing: false });
  };

  enableEditing = () => {
    this.setState({ isEditing: true });
  };

  // handleDescriptionChange = (event) => {
  //   this.setState({ editingDescription: event.target.value });
  // };

  handleAccordionDescriptionChange = (event, section) => {
    const { value } = event.target;
    this.setState({ [`edited${section}Description`]: value });
  };

  handleRatingChange = (event, section) => {
    const { value } = event.target;
    this.setState({ [`edited${section}Rating`]: value });
  };

  saveDescription = () => {
    const {
      selectedMovie,
      editedLanguageDescription,
      editedDrugDescription,
      editedSexDescription,
      editedRoleModelDescription,
      editedMessageDescription,
      editedRepresentationDescription,
      editedViolenceDescription,
      editedProductDescription,
      editedLanguageRating,
      editedDrugRating,
      editedSexRating,
      editedRoleModelRating,
      editedMessageRating,
      editedRepresentationRating,
      editedViolenceRating,
      editedProductRating,
    } = this.state;
  
    const updatedMovie = {
      languageDescription: editedLanguageDescription,
      drugDescription: editedDrugDescription,
      sexDescription: editedSexDescription,
      roleModelDescription: editedRoleModelDescription,
      messageDescription: editedMessageDescription,
      representationDescription: editedRepresentationDescription,
      violenceDescription: editedViolenceDescription,
      productDescription: editedProductDescription,
      languageRating: editedLanguageRating !== null ? editedLanguageRating : undefined,
      drugRating: editedDrugRating !== null ? editedDrugRating: undefined,
      sexRating: editedSexRating !== null ? editedSexRating: undefined,
      roleModelRating: editedRoleModelRating !== null ? editedRoleModelRating: undefined,
      messageRating: editedMessageRating !== null ? editedMessageRating: undefined,
      representationRating: editedRepresentationRating !== null ? editedRepresentationRating: undefined,
      violenceRating: editedViolenceRating !== null ? editedViolenceRating: undefined,
      productRating: editedProductRating !== null ? editedProductRating: undefined
    };
  
    this.updateDescription(selectedMovie._id, updatedMovie)
      .then(() => {
        this.closeModal();
      })
      .catch((error) => {
        console.log(error.message);
        this.setState({
          error: "An error occurred while updating the description.",
        });
      });
  };

  renderMovieCards = () => {
    const { watchlist } = this.state;
    return (
      <div className="card-container">
        {watchlist.map((movie, index) => (
          
          <Card key={index} style={{ width: "25rem" }}>
            <Card.Img variant="top" src={movie.imageURL ? movie.imageURL : `https://place-hold.it/300x450/666/fff/000?text=${movie.title}`} alt="Movie Poster" />
            <Card.Body>
              <div className="card-content">
                <Card.Title className="movie-title">
                  {movie.title.toUpperCase()}
                </Card.Title>
                <div className="button-group">
                  <Button
                    className="description-button"
                    onClick={() => this.openModal(movie)}
                  >
                    View Description
                  </Button>
                  <Button
                    className="delete-button"
                    variant="danger"
                    onClick={() => this.deleteMovie(movie._id)}
                  >
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
    const {
      error,
      selectedMovie,
      showModal,
      isEditing,
      editedLanguageDescription,
      editedDrugDescription,
      editedSexDescription,
      editedRoleModelDescription,
      editedMessageDescription,
      editedRepresentationDescription,
      editedViolenceDescription,
      editedProductDescription,
      editedLanguageRating,
      editedDrugRating,
      editedSexRating,
      editedRoleModelRating,
      editedMessageRating,
      editedRepresentationRating,
      editedViolenceRating,
      editedProductRating,
    } = this.state;

    return (
      <div>
        <h2
          id="title-watchlist"
          style={{ textAlign: "center", marginTop: "30px" }}
        >
          Your Watch List
        </h2>
        {error && <p className="error-message">{error}</p>}
        {this.renderMovieCards()}

        <Modal show={showModal} onHide={this.closeModal} dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedMovie && selectedMovie.title.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
            {selectedMovie && (
              <div>
                <Accordion className="whole-accordion">
                  <Accordion.Item eventKey="language">
                    <Accordion.Header className="accordion-header">
                      <p>Language Description</p>
                      {selectedMovie.languageRating? (<p>{'⭐️'.repeat(selectedMovie.languageRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedLanguageRating}
                            onChange={(event)=>this.handleRatingChange(event,"Language")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedLanguageDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(
                              event,
                              "Language"
                            )
                          }
                        />
                      ) : (
                        <p>{selectedMovie.languageDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="drug">
                    <Accordion.Header className="accordion-header">
                      <p>Drug Description</p>
                      {selectedMovie.drugRating? (<p>{'⭐️'.repeat(selectedMovie.drugRating)}</p>): <p>☆☆☆☆☆</p>}
                       { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedDrugRating}
                            onChange={(event)=>this.handleRatingChange(event,"Drug")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedDrugDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(event, "Drug")
                          }
                        />
                      ) : (
                        <p>{selectedMovie.drugDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="sex">
                    <Accordion.Header className="accordion-header">
                      <p>Sex Description</p>
                      {selectedMovie.sexRating? (<p>{'⭐️'.repeat(selectedMovie.sexRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedSexRating}
                            onChange={(event)=>this.handleRatingChange(event,"Sex")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedSexDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(event, "Sex")
                          }
                        />
                      ) : (
                        <p>{selectedMovie.sexDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="roleModel">
                    <Accordion.Header className="accordion-header">
                      <p>Role Model Description</p>
                      {selectedMovie.roleModelRating? (<p>{'⭐️'.repeat(selectedMovie.roleModelRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedRoleModelRating}
                            onChange={(event)=>this.handleRatingChange(event,"RoleModel")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedRoleModelDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(
                              event,
                              "RoleModel"
                            )
                          }
                        />
                      ) : (
                        <p>{selectedMovie.roleModelDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="message">
                    <Accordion.Header className="accordion-header">
                      <p>Message Description</p>
                      {selectedMovie.messageRating? (<p>{'⭐️'.repeat(selectedMovie.messageRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedMessageRating}
                            onChange={(event)=>this.handleRatingChange(event,"Message")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedMessageDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(
                              event,
                              "Message"
                            )
                          }
                        />
                      ) : (
                        <p>{selectedMovie.messageDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="representation">
                    <Accordion.Header className="accordion-header">
                      <p>Representation Description</p>
                      {selectedMovie.representationRating? (<p>{'⭐️'.repeat(selectedMovie.representationRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedRepresentationRating}
                            onChange={(event)=>this.handleRatingChange(event,"Representation")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedRepresentationDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(
                              event,
                              "Representation"
                            )
                          }
                        />
                      ) : (
                        <p>{selectedMovie.representationDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="violence">
                    <Accordion.Header className="accordion-header">
                      <p>Violence Description</p>
                      {selectedMovie.violenceRating? (<p>{'⭐️'.repeat(selectedMovie.violenceRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedViolenceRating}
                            onChange={(event)=>this.handleRatingChange(event,"Violence")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedViolenceDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(
                              event,
                              "Violence"
                            )
                          }
                        />
                      ) : (
                        <p>{selectedMovie.violenceDescription}</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>

                  <Accordion.Item eventKey="product">
                    <Accordion.Header className="accordion-header">
                      <p>Product Description</p>
                      {selectedMovie.productRating? (<p>{'⭐️'.repeat(selectedMovie.productRating)}</p>): <p>☆☆☆☆☆</p>}
                      { isEditing && (
                        <div className="rating-container">
                          <p>Change Star Rating</p>
                          <div className="rating-input-container">
                            <p>1</p>
                            <input
                            type="range"
                            min="1"
                            max="5"
                            value={editedProductRating}
                            onChange={(event)=>this.handleRatingChange(event,"Product")}
                            />
                            
                            <p>5</p>
                          </div>
                        </div>
                        
                      )}
                    </Accordion.Header>
                    <Accordion.Body>
                      {isEditing ? (
                        <textarea
                          className="form-control"
                          rows={4}
                          value={editedProductDescription}
                          onChange={(event) =>
                            this.handleAccordionDescriptionChange(
                              event,
                              "Product"
                            )
                          }
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




