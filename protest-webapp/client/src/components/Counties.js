import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';
import Query8Row from './Query8Row';


export default class Counties extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: [],
      states: [],
      selectedState: "",
      counties: [],
      selectedCounty: "",
      tableTitle: [],
      tableHeader: [],
      showFields: false
    }
    this.showQuery = this.showQuery.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.getCounties = this.getCounties.bind(this);
  }


  componentDidMount() {


    fetch("http://localhost:8081/states/query5b",  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' 
    }).then(res => {

      return res.json();
    }, err => {

      console.log(err);
    }).then(stateList => {
      if (!stateList) return;
      let stateDivs = stateList.map((state_Obj, i) => //
      <option value={state_Obj.state === 'DISTRICT OF COLUMBIA' ? 'D.C.' : state_Obj.state}>{state_Obj.state === 'DISTRICT OF COLUMBIA' ? 'D.C.' : state_Obj.state}</option>
      );
      //
      this.setState({
        states: stateDivs
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });


  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      selectedState: e.target.value
    });
  }

  handleChange2(e) {
    console.log(e.target.value);
    this.setState({
      selectedCounty: e.target.value
    });
  }

  getCounties() {
    var state = this.state.selectedState;
    if (!state || state === "" ) {
      console.log("No state was chosen");
    }

    fetch(`http://localhost:8081/counties/query8b/${state}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(countyList => {
      if (!countyList) return;
      let countyDivs = countyList.map((county_Obj, i) => //
      <option value={county_Obj.county === 'DISTRICT OF COLUMBIA' ? 'D.C.' : county_Obj.county}>{county_Obj.county === 'DISTRICT OF COLUMBIA' ? 'D.C.' : county_Obj.county}</option>
      );
      //
      this.setState({
        counties: countyDivs
      });
    }, err => {

      console.log(err);
    });


  }

  showQuery() {
    var state = this.state.selectedState;
    var county = this.state.selectedCounty;
    if (!state || !county || state === "" || county === "") {
      console.log("No state/county was chosen");
    }

    this.setState({
      showFields: true
    });

    fetch(`http://localhost:8081/counties/query8/${county}/${state}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {

      return res.json();
    }, err => {

      console.log(err);
    }).then(queryList => {
      if (!queryList) return;
      let query8Divs = queryList.map((query8_Obj, i) =>
      <Query8Row county={query8_Obj.county === 'DISTRICT OF COLUMBIA' ? 'D.C.' : query8_Obj.county} state={query8_Obj.state === 'DISTRICT OF COLUMBIA' ? '--' : query8_Obj.state} num_events={query8_Obj.num_events === null ? 0 : query8_Obj.num_events} events_per_100K={query8_Obj.events_per_100K === null ? 0 : query8_Obj.events_per_100K} item_qty={query8_Obj.item_qty === null ? 0 : query8_Obj.item_qty} cost_per_item={query8_Obj.cost_per_item === null ? 0 : query8_Obj.cost_per_item} cost_per_cap={query8_Obj.cost_per_cap === null ? 0 : query8_Obj.cost_per_cap}/>
      );
      
      let title = [
        <div className="text-center display-5 font-weight-bold ">10 Most Similar Counties</div>
      ];
      let header = [
        <div className="query-header"> 
          <div className="header"><strong>County</strong></div>
          <div className="header"><strong>State</strong></div>
          <div className="header"><strong>Number of Events</strong></div>
          <div className="header"><strong>Events per 100K</strong></div>
          <div className="header"><strong>Item Quantity</strong></div>
          <div className="header"><strong>Avg Cost per Item</strong></div>
          <div className="header"><strong>Cost per Capita</strong></div>
        </div>
      ];
      // Set the appropriate state variable to the value returned by the HTTP response from the server.
      this.setState({
        query: query8Divs,
        tableTitle: title,
        tableHeader: header
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  render() {  
    let isPressed = this.state.showFields;
    return (
      <div className="Counties">

        <PageNavbar active="counties" />
        <div class = "text-center">
          <h3 class="display-3 font-weight-bold text-white outline-this">County Comparison</h3>
        </div>

        <div className="container query-container">
          <div className="dropdown-container">
            <select value={this.state.selectedState} onChange={this.handleChange} className="dropdown" id="statesDropdown">
              <option select value> -- Select a State -- </option>
              {this.state.states}
            </select>
            <button className="submit-btn" id="stateSubmitBtn" onClick={this.getCounties}>Submit</button>
          </div>
          <div className="dropdown-container">
            <select value={this.state.selectedCounty} onChange={this.handleChange2} className="dropdown" id="countyDropdown">
              <option select value> -- Select a County -- </option>
              {this.state.counties}
            </select>
            <button className="submit-btn" id="stateSubmitBtn" onClick={this.showQuery}>Submit</button>
          </div>
        </div>
        { isPressed ?
        <div className="container query-container">
          <br></br>
          <div className="jumbotron">
            {this.state.tableTitle}
            <div className="query-container">
              {this.state.tableHeader}
              <div className="results-container" id="results">
                {this.state.query}
              </div>
            </div>
          </div>
        </div>
        : null }
      </div>
    );
  }
}
