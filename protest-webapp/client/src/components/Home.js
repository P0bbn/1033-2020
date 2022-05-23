import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';
import Query2Row from './Query2Row';
import Query3Row from './Query3Row';
import CountryChart from './CountryChart';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      buttonList: [],
      queryResults: [],
      tableHeader: [],
      tableTitle: [],
      showJumbo: false,
      chartData: [],
      chartLabel: [],
      chartFull: []
    }
    this.showQuery2 = this.showQuery2.bind(this);
    this.showQuery3 = this.showQuery3.bind(this);
    this.showQuery5 = this.showQuery5.bind(this);
    //this.showMovies = this.showMovies.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    let buttons = [
      <button class="buttons" id={this.props.id} onClick={() => this.showQuery2()}>Protests per State</button>,
      <button class="buttons" id={this.props.id} onClick={() => this.showQuery3()}>Protests by Type</button>
    ];

    this.setState({
        buttonList: buttons
    });

    this.showQuery5();

  }

  showQuery2() {
    fetch("http://localhost:8081/country/query2",
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
      let query2Divs = genreList.map((query2_Obj, i) =>
      <Query2Row state={query2_Obj.state == 'DISTRICT OF COLUMBIA' ? 'D.C' : query2_Obj.state} population={query2_Obj.population == null ? '0' : query2_Obj.population} peaceful={query2_Obj.peaceful == null ? '0' : query2_Obj.peaceful} non_peaceful={query2_Obj.non_peaceful==null ? '0' : query2_Obj.non_peaceful} peaceful_per_100K={query2_Obj.peaceful_per_100K == null ? '0' : query2_Obj.peaceful_per_100K} non_peaceful_per_100K={query2_Obj.non_peaceful_per_100K == null ? '0' : query2_Obj.non_peaceful_per_100K}/>
      );

      let header = [
        <div className="query-header table-responsive-md"> 
          <div className="header"><strong>State</strong></div>
          <div className="header"><strong>Population</strong></div>
          <div className="header"><strong># Peaceful Protests</strong></div>
          <div className="header"><strong># Violent Protests</strong></div>
          <div className="header"><strong># Peaceful per 100K</strong></div>
          <div className="header"><strong># Violent per 100K</strong></div>
        </div>
      ];

      let title = [
        <div className="header text-center display-5 font-weight-bold">Number of Peaceful and Violent Protests in each State in 2020</div>
      ];
      

      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        queryResults: query2Divs,
        tableTitle: title,
        tableHeader: header,
        showJumbo: true
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  showQuery3() {
    fetch("http://localhost:8081/country/query3",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      
      console.log(err);
    }).then(query3List => {
      if (!query3List) return;
      // Map each genreObj in genreList to an HTML element:
      // A button which triggers the showMovies function for each genre.
      let query3Divs = query3List.map((query3_Obj, i) =>
      <Query3Row event={query3_Obj.event_type} sub_event={query3_Obj.sub_event_type} count={query3_Obj.count}/>
      );

      let title = [
        <div className="text-center display-5 font-weight-bold ">Types and Count of Different Protests throughout the US</div>
      ];
      let header = [
        <div className="query-header"> 
          <div className="header"><strong>Event Type</strong></div>
          <div className="header"><strong>Subtype</strong></div>
          <div className="header"><strong>Amount</strong></div>
        </div>
      ];


      // Set the state of the genres list to the value returned by the HTTP response from the server.
      this.setState({
        queryResults: query3Divs,
        tableTitle: title,
        tableHeader: header,
        showJumbo: true
      });
    }, err => {
    
      console.log(err);
    });
  }

  showQuery5() {

    fetch("http://localhost:8081/query5",  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {

      return res.json();
    }, err => {

      console.log(err);
    }).then(chartList => {
      if (!chartList) return;
      let labelb = chartList.map((query_Obj, i) =>
        query_Obj.event_date.substring(5,10)
      );
      let datab = chartList.map((query_Obj, i) =>
        query_Obj.num_events
      );
      let chart = [<CountryChart chartData={datab} chartLabel={labelb}/>];

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

  render() {
    let isPressed = this.state.showJumbo;
    return (
      <div className="Dashboard">

        <PageNavbar active="country" />
        <br></br>
        <div class = "text-center">
          <h3 class="display-3 font-weight-bold text-white outline-this">
          Protest Data in the United States in 2020</h3>
        </div>
        <br></br>
        <br></br>
        
        <div className="container query-container">

            <div className="buttons-container">
              {this.state.buttonList}
            </div>

          <br></br>
          { isPressed ?
          <div className="jumbotron">
            <div className="query-container">
            {this.state.tableTitle}
              {this.state.tableHeader}
              <div className="results-container" id="results">
                {this.state.queryResults}
              </div>
            </div>
          </div>
          :
          null
          }
          <img src='./us-map.png' class="rounded mx-auto d-block" alt="States with Protests during 2020"></img>
          <br></br>
          <br></br>
          <div className="jumbotron">
            {this.state.chartFull}
          </div>
          <br></br>
          <br></br>
        </div>
        <div class = "text-center">
        <h3 class="display-7 font-weight-bold text-white outline-this">
        Made by Puneet, Keith, Robby, and Yolanda</h3>
        </div>
      </div>
    );
  }
}

