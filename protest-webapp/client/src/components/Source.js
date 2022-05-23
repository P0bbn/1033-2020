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
    let isPressed = this.state.showFields;
    return (
      <div className="Source">

        <PageNavbar active="sources" />
        <div class = "text-center">
          <h3 class="display-3 font-weight-bold text-white outline-this">Our Sources</h3>
        </div>
        
        <div class="jumbotron container query-container opaque-jum">
          <div class="text-center">
            <h3 class="display-6"> Our sources for the data on this site are three pubically available databases:</h3>
          </div>
          <ul class="hide display-7">
            <li >
              <div class="bolded"> 1. American Community Survey (ACS) </div>
              <ul>
                <li>https://www.kaggle.com/muonneutrino/us-census-demographic-data</li>
                <li>The ACS is an ongoing demographics survey conducted by the U.S. Census Bureau. It gathers information annually from 52 U.S. states and territories. The data here is taken from the DP03 and DP05 tables of the 2017 ACS 5-year estimates.
                </li>
                <li>3220 rows, 37 columns; 0.6MB; 2017; statistics: 3220 counties, 324473330 people</li>
              </ul>
            </li>
            <br></br>
            <li >
              <div class="bolded">2. General Services Administration (GSA) 1033 Program </div>
              <ul>
                <li>https://data.world/datasets/1033-program</li>
                <li>This CSV file represents $1.5B of ~$4.8B distributed by the GSA's 1033 Program, for years 2006-2014. All manner of equipment is here from helicopters to rifles, with prices, nomenclature, and NSNs. The 1033 Program allows local and state law enforcement agencies to receive surplus military equipment from the Department of Defense at little or no cost. Note that the police departments do not pay for the value of the gear, just the shipping and storage en route.
                </li>
                <li>243492 rows, 12 columns; 22MB; 2006–2014</li>
              </ul>
            </li>
            <br></br>
            <li >
              <div class="bolded">3. US Crisis Monitor </div>
              <ul>
                <li>https://acleddata.com/special-projects/us-crisis-monitor/</li>
                <li>“ACLED systematically collects the dates, actors, locations, fatalities, and types of all political violence and demonstration events in the US using a methodology consistent with our global coverage of conflict and disorder around the world.”
                </li>
                <li>17675 rows, 28 columns; 3MB; 2020/05/24–2020/11/21; event breakdown: 16331 protests, 753 riots, 539 strategic developments, 42 violence against civilians, 5 battles
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
