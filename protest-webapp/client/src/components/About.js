import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';


export default class Sources extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {

    }

  }

  // React function that is called when the page load.
  componentDidMount() {



  }


  render() {  
    return (
      <div className="About">

        <PageNavbar active="about" />
        <div class = "text-center">
          <h3 class="display-3 font-weight-bold text-white outline-this">About this Project</h3>
        </div>
        <div class="jumbotron container query-container opaque-jum">
          <div class="text-center">
            <h3 class="display-6"> What is "1033"?</h3>
          </div>
          

        <p>The Law Enforcement Support Office (LESO), a division of the DLA Disposition Services office 
        of the Department of Defense, is a bureau that takes surplus military grade equipment and, at a  
        cost of only shipping and storage, delivers any equipment requested to law eneforcement office 
          throughout the United States. This program, commonly known as the "1033 Program" has been cited as
        as one of the leading indicators of, and, perhaps, one of the leading causes of, the militarization of 
         of America's law enforcement agencies.</p>
        <div class="text-center">
            <h3 class="display-6"> What Does this have to do with race, protests, and poverty?</h3>
          
          </div>
        <p>Our group sought to determine whether a correlation could be determined between the amount,
        type, and value of 1033 equipment requested by law enforcement agencies in counties 
          throughout the United States, and the number of violent protests that occurred in these counties 
        during and after the turbulent Summer of 2020. Our group wanted to comb through the data and determine whether
        protests in counties with large minority populations or high rates of poverty saw more violent responses from law enforcement
        than in counties with low rates of poverty or low minority populations. Additionally, we wanted to know whether the type of equipment
        (which could be anything from a popcorn machine to a grenade launcher or mine-resistant armored vehicle) had an impact on the type
        response law enforcement showed towards protestors.
        </p>
      </div>
      </div>
    );
  }
}
