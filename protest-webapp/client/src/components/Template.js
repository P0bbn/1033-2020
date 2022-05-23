import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import GenreButton from './GenreButton';
import DashboardMovieRow from './DashboardMovieRow';

export default class States extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      genres: [],
      movies: []
    }

    this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch("http://localhost:8081/genres",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(genreList => {
      if (!genreList) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let genreDivs = genreList.map((genreObj, i) =>
      <GenreButton state={genreObj.state} population={genreObj.population} peaceful={genreObj.peaceful} non_peaceful={genreObj.non_peaceful} peaceful_per_100K={genreObj.peaceful_per_100K} non_peaceful_per_100K={genreObj.non_peaceful_per_100K}/>
      );

      

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        genres: genreDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  /* ---- Q1b (Dashboard) ---- */
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showMovies(genre) {
    fetch(`http://localhost:8081/genres/${genre}`,
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(movieList => {
      if (!movieList) return;

      let movieRows = movieList.map((movieObj, i) =>
      <DashboardMovieRow title={movieObj.title} rating={movieObj.rating} votes={movieObj.vote_count} />
      );
      
      this.setState({
        movies: movieRows
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="Home" />
        <div class = "text-center">
                <h3 class="display-3 font-weight-bold text-white">Protest Data in the United States in 2020</h3>
            </div>

        <div className="container movies-container">
          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>State</strong></div>
                <div className="header"><strong>Population</strong></div>
                <div className="header"><strong># Peaceful Protests</strong></div>
                <div className="header"><strong># Violent Protests</strong></div>
                <div className="header"><strong># Peaceful per 100K</strong></div>
                <div className="header"><strong># Violent per 100K</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.genres}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}