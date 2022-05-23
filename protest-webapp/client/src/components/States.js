import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';
import Query7Row from './Query7Row';
import Query6Row from './Query6Row';
import StateChart from './StateChart';


export default class States extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      selectedState: "",
      states: [],
      query: [],
      queryb: [],
      queryC: [],
      tableAHeader: [],
      tableBHeader: [],
      tableCHeader: [],
      tableATitle: [],
      tableBTitle: [],
      tableCTitle: [],
      chartLabel: [],
      chartData: [],
      chartFull: [],
      showFields: false
    }
    this.showQuery = this.showQuery.bind(this);
    this.showQueryb = this.showQueryb.bind(this);
    this.showQueryc = this.showQueryc.bind(this);
    this.submitState = this.submitState.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  // React function that is called when the page loads
  // if you want a query to load immediately then you need a fetch here
  componentDidMount() {

    fetch("http://localhost:8081/states/query5b",  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
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

    this.showQuery();
    this.showQueryb()

  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      selectedState: e.target.value
    });
  }


  submitState() {

    // if (this.state.selectedState === "") {
    //   return;
    // }
    //console.log(this.selectedState);
    this.setState({
        showFields: true
    });

    this.showQuery();
    this.showQueryb();
    this.showQueryc();

  }

  showQuery() {
    var chosen = this.state.selectedState;
    if (!chosen || chosen === "" ) {
      console.log("No decade was chosen");
    }
    fetch(`http://localhost:8081/states/query7/${chosen}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' 
    }).then(res => {

      return res.json();
    }, err => {
  
      console.log(err);
    }).then(queryList => {
      if (!queryList) return;
      let queryDivs = queryList.map((query_Obj, i) =>
      <Query7Row event_date={query_Obj.event_date.substring(0,10)} event_type={query_Obj.event_type} sub_event_type={query_Obj.sub_event_type} fatalities={query_Obj.fatalities} notes={query_Obj.notes}/>
      );

      let title = [
        <div className="text-center display-5 font-weight-bold ">10 Most Recent Events in the State</div>
      ];
      let header = [
        <div className="query-header"> 
          <div className="header"><strong>Event Date</strong></div>
          <div className="header"><strong>Event Type</strong></div>
          <div className="header"><strong>Subtype</strong></div>
          <div className="header"><strong>Number of Fatalities</strong></div>
          <div className="header"><strong>Description</strong></div>
        </div>
      ];
      
      // Set the appropriate state variable to the value returned by the HTTP response from the server.
      this.setState({
        query: queryDivs,
        tableATitle: title,
        tableAHeader: header
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  showQueryb() {
    //const myChartRef = this.chartRef.current.getContext("2d");
    console.log("B");
    var chosen = this.state.selectedState;
    if (!chosen || chosen === "" ) {
      console.log("No state was chosen");
    }
    fetch(`http://localhost:8081/states/query9a/${chosen}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
  
      return res.json();
    }, err => {
    
      console.log(err);
    }).then(chartList => {
      if (!chartList) return;
      let labelb = chartList.map((query_Obj, i) =>
        query_Obj.date.substring(5,10)
      );
      let datab = chartList.map((query_Obj, i) =>
        query_Obj.num_events
      );
      let chart = [<StateChart chartData={datab} chartLabel={labelb}/>];

      this.setState({
        chartData: datab,
        chartLabel: labelb,
        chartFull: chart
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  showQueryc() {
    console.log("C");
    ///states/query9c/
    var chosen = this.state.selectedState;
    if (!chosen || chosen === "" ) {
      console.log("No decade was chosen");
    }
    fetch(`http://localhost:8081/states/query6/${chosen}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {

      return res.json();
    }, err => {
    
      console.log(err);
    }).then(queryList => {
      if (!queryList) return;
      let queryDivs = queryList.map((query_Obj, i) => 
      <Query6Row 
        county={query_Obj.county === 'DISTRICT OF COLUMBIA' ? 'D.C' : query_Obj.county} 
        population={query_Obj.population}
        income_per_cap={query_Obj.income_per_cap == null ? '0' : query_Obj.income_per_cap}
        unemployment={query_Obj.unemployment == null ? '0' : query_Obj.unemployment}
        events_per_100K={query_Obj.events_per_100K == null ? '0' : query_Obj.events_per_100K}
        item_qty={query_Obj.item_qty == null ? '0' : query_Obj.item_qty}
        item_cost={query_Obj.item_cost == null ? '0' : query_Obj.item_cost}
        cost_per_item={query_Obj.cost_per_item == null ? '0' : query_Obj.cost_per_item}
        cost_per_cap={query_Obj.cost_per_cap == null ? '0' : query_Obj.cost_per_cap}        
      />
      );

      let title = [
        <div className="text-center display-5 font-weight-bold ">Data about 10 Most Populated Counties in the State during 2020</div>
      ];
      let header = [
        <div className="query-header"> 
          <div className="header"><strong>County</strong></div>
          <div className="header"><strong>Population</strong></div>
          <div className="header slightly"><strong>Annual Income per Capita</strong></div>
          <div className="header slightly"><strong>Unemployment</strong></div>
          <div className="header slightly"><strong># Protests per 100K</strong></div>
          <div className="header slightly"><strong># Police Weapon Purchases</strong></div>
          <div className="header slightly"><strong>Police Weapons Expense</strong></div>
          <div className="header slightly"><strong>Avg Cost per Weapon</strong></div>
          <div className="header slightly"><strong>Police Weapon Cost per Capita</strong></div>
        </div>
      ];
      
      // Set the appropriate state variable to the value returned by the HTTP response from the server.
      this.setState({
        queryC: queryDivs,
        tableCTitle: title,
        tableCHeader: header
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }


  render() {
    let isPressed = this.state.showFields;
    return (
      <div className="States">

        <PageNavbar active="states" />
        <div class = "text-center">
          <h3 class="display-3 font-weight-bold text-white outline-this">State Breakdown</h3>
        </div>

        <div className="container query-container">

          <br></br>
          <div className="dropdown-container">
            <select value={this.state.selectedState} onChange={this.handleChange} className="dropdown" id="statesDropdown">
              <option select value> -- Select a State -- </option>
              {this.state.states}
            </select>
            <button className="submit-btn" id="stateSubmitBtn" onClick={this.submitState} title="Doubleclick please">Submit</button>
          </div>
          <div class = "text-center">
            <h3 class="display-4 font-weight-bold text-white double-outline">{this.state.selectedState}</h3>
          </div>
        </div>
        { isPressed ?
        <div className="container query-container">
          <div className="jumbotron">
            {this.state.chartFull}
          </div>
          <div className="jumbotron">
            {this.state.tableATitle}
            <div className="query-container">
              {this.state.tableAHeader}
              <div className="results-container" id="results">
                {this.state.query}
              </div>
            </div>
          </div>
          <div className="jumbotron">
            {this.state.tableCTitle}
            <div className="query-container more-height">
              {this.state.tableCHeader}
              <br></br>
              <div className="results-container flex-gap" id="results">
                {this.state.queryC}
              </div>
            </div>
          </div>
        </div>
        : null }
      </div>
    );
  }
}
