import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import '../style/WatchList.css';


class WatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: [],
      error: '',
      selectedMovie: null,
      showModal: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/movies`);
      this.setState({ watchlist: response.data });
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'An error occurred while fetching the watchlist.' });
    }
  }

  deleteMovie = async (movieId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/movies/${movieId}`);
  
      this.setState((prevState) => ({
        watchlist: prevState.watchlist.filter((movie) => movie.id !== movieId),
      }));
    } catch (error) {
      console.log(error.message);
      this.setState({ error: 'An error occurred while deleting the movie.' });
    }
  };


  updateDescription = async (movieId, description) => {
    try {
      await axios.put(`${process.env.REACT_APP_SERVER}/movies/${movieId}`, { description });
        this.setState(prevState => {
        const updatedWatchlist = prevState.watchlist.map(movie => {
          if (movie.id === movieId) {
            return { ...movie, description };
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
    this.setState({ selectedMovie: movie, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  renderMovieCards = () => {
    const { watchlist } = this.state;

    console.log(watchlist);

    return (
      <div className="card-container">
      {watchlist.map((movie, index) => (
        
        <Card key={index} style={{ width: '25rem' }}>

        {/* <Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${searchResult.imageURL}`} alt="Movie Poster" /> */}


        {/* < Card.Img variant="top" src={`https://image.tmdb.org/t/p/original${movie.imageURL}`} alt="Movie Poster" /> */}

          <Card.Body>
            <div className="card-content">
              <Card.Title className="movie-title">{movie.title.toUpperCase()}</Card.Title>
              <div className="button-group">
                <Button className="description-button" onClick={() => this.openModal(movie)}>View Description</Button>
                <Button className="delete-button" variant="danger" onClick={() => this.deleteMovie(movie.id)}>Delete</Button>
              </div>
            </div>
          </Card.Body>
  
        </Card>
      ))}
    </div>
  );
};

  render() {
    const { error, selectedMovie, showModal } = this.state;

    return (
      <div>
<h2 id="title-watchlist" style={{ textAlign: 'center', marginTop: '30px' }}> Your Watch List</h2>
        {error && <p className="error-message">{error}</p>}
        {this.renderMovieCards()}

        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie && selectedMovie.title.toUpperCase()}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {selectedMovie && (
              <div>
                <p>{selectedMovie.description}</p>
                <Accordion className="whole-accordion">
                  <Accordion.Item eventKey="language">
                    <Accordion.Header className="accordion-header">
                      <p>Language Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.languageDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="drug">
                    <Accordion.Header className="accordion-header">
                      <p>Drug Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.drugDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="sex">
                    <Accordion.Header className="accordion-header">
                      <p>Sex Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.sexDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="roleModel">
                    <Accordion.Header className="accordion-header">
                      <p>Role Model Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.roleModelDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="message">
                    <Accordion.Header className="accordion-header">
                      <p>Message Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.messageDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="representation">
                    <Accordion.Header className="accordion-header">
                      <p>Representation Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.representationDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="violence">
                    <Accordion.Header className="accordion-header">
                      <p>Violence Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.violenceDescription}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="product">
                    <Accordion.Header className="accordion-header">
                      <p>Product Description</p>
                    </Accordion.Header>
                    <Accordion.Body>{selectedMovie.productDescription}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default WatchList;

// import React from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal';
// import Accordion from 'react-bootstrap/Accordion';
// import '../style/WatchList.css';

// class WatchList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       watchlist: [],
//       error: '',
//       selectedMovie: null,
//       showModal: false,
//       editedDescription: '',
//       isEditing: false,
//     };
//   }

//   async componentDidMount() {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_SERVER}/movies`);
//       this.setState({ watchlist: response.data });
//     } catch (error) {
//       console.log(error.message);
//       this.setState({ error: 'An error occurred while fetching the watchlist.' });
//     }
//   }

//   deleteMovie = async (movieId) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_SERVER}/movies/${movieId}`);

//       this.setState((prevState) => ({
//         watchlist: prevState.watchlist.filter((movie) => movie.id !== movieId),
//       }));
//     } catch (error) {
//       console.log(error.message);
//       this.setState({ error: 'An error occurred while deleting the movie.' });
//     }
//   };

//   updateDescription = async (movieId, description) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_SERVER}/movies/${movieId}`, { description });
//       this.setState((prevState) => {
//         const updatedWatchlist = prevState.watchlist.map((movie) => {
//           if (movie.id === movieId) {
//             return { ...movie, description };
//           }
//           return movie;
//         });
//         return { watchlist: updatedWatchlist, isEditing: false };
//       });
//     } catch (error) {
//       console.log(error.message);
//       this.setState({ error: 'An error occurred while updating the description.' });
//     }
//   };

//   openModal = (movie) => {
//     this.setState({ selectedMovie: movie, showModal: true });
//   };

//   closeModal = () => {
//     this.setState({ showModal: false });
//   };

//   handleEdit = () => {
//     const { selectedMovie } = this.state;
//     this.setState({ editedDescription: selectedMovie.description, isEditing: true });
//   };
  
//   handleSave = () => {
//     const { selectedMovie, editedDescription } = this.state;
//     this.updateDescription(selectedMovie.id, editedDescription);
//   };
  
//   handleCancel = () => {
//     this.setState({ isEditing: false });
//   };
  
//   handleDescriptionChange = (event) => {
//     this.setState({ editedDescription: event.target.value });
//   };
  
//   renderMovieCards = () => {
//     const { watchlist } = this.state;

//     return (
//       <div className="card-container">
//         {watchlist.map((movie, index) => (
//           <Card key={index} style={{ width: '25rem' }}>
//             <Card.Body>
//               <div className="card-content">
//                 <Card.Title className="movie-title">{movie.title.toUpperCase()}</Card.Title>
//                 <div className="button-group">
//                   <Button className="description-button" onClick={() => this.openModal(movie)}>
//                     View Description
//                   </Button>
//                   <Button className="delete-button" variant="danger" onClick={() => this.deleteMovie(movie.id)}>
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     );
//   };

//   render() {
//     const { error, selectedMovie, showModal, editedDescription, isEditing } = this.state;

//     return (
//       <div>
//         <h2 id="title-watchlist" style={{ textAlign: 'center', marginTop: '30px' }}>
//           Your Watch List
//         </h2>
//         {error && <p className="error-message">{error}</p>}
//         {this.renderMovieCards()}

//         <Modal show={showModal} onHide={this.closeModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>{selectedMovie && selectedMovie.title.toUpperCase()}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
//             {selectedMovie && (
//               <div>
//                 {isEditing ? (
//                   <textarea
//                     value={editedDescription}
//                     onChange={this.handleDescriptionChange}
//                     rows={4}
//                     cols={50}
//                   />
//                 ) : (
//                   <p>{selectedMovie.description}</p>
//                 )}
//                 <Accordion className="whole-accordion">
//              <Accordion.Item eventKey="language">
// <Accordion.Header className="accordion-header">
// <p>Language Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.languageDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="drug">
// <Accordion.Header className="accordion-header">
// <p>Drug Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.drugDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="sex">
// <Accordion.Header className="accordion-header">
// <p>Sex Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.sexDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="roleModel">
// <Accordion.Header className="accordion-header">
// <p>Role Model Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.roleModelDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="message">
// <Accordion.Header className="accordion-header">
// <p>Message Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.messageDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="representation">
// <Accordion.Header className="accordion-header">
// <p>Representation Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.representationDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="violence">
// <Accordion.Header className="accordion-header">
// <p>Violence Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.violenceDescription}</Accordion.Body>
// </Accordion.Item>
// <Accordion.Item eventKey="product">
// <Accordion.Header className="accordion-header">
// <p>Product Description</p>
// </Accordion.Header>
// <Accordion.Body>{selectedMovie.productDescription}</Accordion.Body>
// </Accordion.Item>
//                 </Accordion>
//               </div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             {isEditing ? (
//               <div>
//                 <Button variant="success" onClick={this.handleSave}>
//                   Save
//                 </Button>
//                 <Button variant="secondary" onClick={this.handleCancel}>
//                   Cancel
//                 </Button>
//               </div>
//             ) : (
//               <Button variant="primary" onClick={this.handleEdit}>
//                 Edit
//               </Button>
//             )}
//             <Button variant="secondary" onClick={this.closeModal}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default WatchList;
