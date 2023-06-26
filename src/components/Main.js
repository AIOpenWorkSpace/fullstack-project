// Main.js

import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      searchQuery: '',
      searchResult: '',
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movies`;
      let updatedMovieFromAxios = await axios.get(url);

      console.log(updatedMovieFromAxios);

      this.setState({
        movies: updatedMovieFromAxios.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSearchSubmit = async (event) => {
    event.preventDefault();
    let prompt = `Evaluate "${this.state.searchQuery}" on all of these categories for teenagers: language usage, alcohol and other drugs, portrayal of ex and romantic relationships, positive role models, positive messages, diverse representation, violence, product placement.`;

    try {
      let updatedMovieFromAxios = await axios.post(`${process.env.REACT_APP_SERVER}/ask`, { prompt });

      this.setState({
        searchResult: updatedMovieFromAxios.data,
      });

      await this.getMovies();
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSearchChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h2>Search Movies to get a Rating</h2>

        <Form onSubmit={this.handleSearchSubmit}>
          <Form.Group controlId="searchQuery">
            <Form.Control
              type="text"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search for movies"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>

        {this.state.searchResult && (
          <div>
            <h3>Result</h3>
            <p>{this.state.searchResult}</p>
          </div>
        )}

        {this.state.movies.map((movie) => (
          <div key={movie._id}>
            <h3>{movie.title}</h3>
            <p>Language Rating: {movie.languageRating}</p>
            <p>Language Description: {movie.languageDescription}</p>
            <p>Drug Rating: {movie.drugRating}</p>
            <p>Drug Description: {movie.drugDescription}</p>
            <p>Sex Description: {movie.sexDescription}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Main;


// import React from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

// class Main extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movies: [],
//       searchQuery: '',
//       searchResult: '',
//     };
//   }


//   getMovies = async () => {
//     try {
//       let url = `${process.env.REACT_APP_SERVER}/movies?search=${this.state.searchQuery}`;
//       let updatedMovieFromAxios = await axios.get(url);

//       console.log(updatedMovieFromAxios)

//       this.setState({
//         movies: updatedMovieFromAxios.data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   componentDidMount() {
//     this.getMovies();
//   }



//   handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     let prompt = `Evaluate "${this.state.searchQuery}" on all of these categories for teenagers: language usage, alcohol and other drugs, portrayal of ex and romantic relationships, positive role models, positive messages, diverse representation, violence, product placement.`;

//     try {
//       let updatedMovieFromAxios = await axios.post('/ask', { prompt });

//       this.setState({
//         searchResult: updatedMovieFromAxios.data,
//       });

//       await this.getMovies();
//     } catch (error) {
//       console.log(error.message);
//     }
//   }




//   handleSearchChange = (event) => {
//     this.setState({
//       searchQuery: event.target.value,
//     });
//   }




//   render() {
//     return (
//       <div>
//         <h2>Search Movies to get a Rating</h2>

//         <Form onSubmit={this.handleSearchSubmit}>
//           <Form.Group controlId="searchQuery">
//             <Form.Control
//               type="text"
//               value={this.state.searchQuery}
//               onChange={this.handleSearchChange}
//               placeholder="Search for movies"
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Search
//           </Button>
//         </Form>

//         {this.state.searchResult && (
//           <div>
//             <h3> Result</h3>
//             <p>{this.state.searchResult}</p>
//           </div>
//         )}

//         {this.state.movies.map((movie) => (
//           <div key={movie._id}></div>
//         ))}
//       </div>
//     );
//   }
// }

// export default Main;




// import React from 'react';
// import axios from 'axios';

// class Main extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movies: [],
//     };
//   }

//   async componentDidMount() {
//     try {
//       let url = `${process.env.REACT_APP_SERVER}/movies`;
//       let moviesFromDB = await axios.get(url);

//       this.setState({
//         movies: moviesFromDB.data
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h2 >Watch List</h2>
//       </div>
//     );
//   }
// }

// export default Main;


  // handleSearchSubmit = async (event) => {
  //   event.preventDefault();
  //   let prompt = `Evaluate "${this.state.searchQuery}" on all of these categories for teenagers: language usage, alcohol and other drugs, portrayal of ex and romantic relationships, positive role models, positive messages, diverse representation, violence, product placement.`;
  
  //   try {
  //     let updatedMovieFromAxios = await axios.post('/movies', { prompt }); 
  
  //     this.setState({
  //       searchResult: updatedMovieFromAxios.data,
  //     });
  
  //     await this.getMovies();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  