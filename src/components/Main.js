import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    try {
      let url = `${process.env.REACT_APP_SERVER}/movies`;
      let moviesFromDB = await axios.get(url);

      this.setState({
        movies: moviesFromDB.data
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    return (
      <div>
        <h2 >Watch List</h2>
      </div>
    );
  }
}

export default Main;
