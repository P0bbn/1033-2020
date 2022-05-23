
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';
import Query10Row from './Query10Row';
import Query11Row from './Query11Row';
import RaceChart from './RaceChart';


export default class Race extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: [],
      queryb: [],
      questions:[],
      selectedQuestion: "",
      selectedQuestionB: "",
      tableATitle: [],
      tableBTitle: [],
      tableAHeader: [],
      tableBHeader: [],
      chartLabel: [],
      chartData: [],
      chartFull: []
    }
    this.showQuery = this.showQuery.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.showQueryb = this.showQueryb.bind(this);
    this.submitQuestionb = this.submitQuestionb.bind(this);
  }

  // React function that is called when the page load.
  componentDidMount() {
    // I made buttons like this that will go at the top. Need a state variable for this in the constructor though. See Home.js
    // let buttons = [
    //   <button class="buttons" id={this.props.id} onClick={() => this.showQuery2()}>Protests per State</button>,
    //   <button class="buttons" id={this.props.id} onClick={() => this.showQuery3()}>Protests by Type</button>
    // ];

   

  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      selectedQuestion: e.target.value
    });
  }

  handleChange2(e) {
    console.log(e.target.value);
    this.setState({
      selectedQuestionB: e.target.value
    });
  }


  submitQuestion() {
    this.showQuery();
  }
  submitQuestionb(){
    this.showQueryb();

  }
  //example function I made based on Home.js
  showQuery() {
    var chosen = this.state.selectedQuestion;
    if (!chosen || chosen ===""){
      console.log("No question asked.")
    }
    fetch(`http://localhost:8081/race/${chosen}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' 
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      console.log(err);
    }).then(queryList => {
      if (!queryList) return;
      
      let queryDivs;
      if (chosen !== "query11") {
        queryDivs = queryList.map((query_Obj, i) =>
      <Query10Row item_name={query_Obj.item_name} equip_qty={query_Obj.equip_qty.toLocaleString()} equip_cost={"$" + query_Obj.equip_cost.toLocaleString()} cost_per_item={"$" + query_Obj.cost_per_item.toLocaleString()} />
      );
      } else {
        queryDivs = queryList.map((query_Obj, i) =>
         <Query11Row events_per_100K_national={query_Obj.events_per_100K_national} white={query_Obj.white} non_white={query_Obj.non_white} low_poverty={query_Obj.low_poverty} high_poverty={query_Obj.high_poverty} item_cost_per_cap_national={query_Obj.item_cost_per_cap_national}/>
        );
      }
      
      let title = [
        <div className="text-center display-5 font-weight-bold ">Results</div>

      ];
      let header = [
        <div className="query-header">
          <div className="header"><strong>Item Name</strong></div>
          <div className="header"><strong>Total Quantity</strong></div>
          <div className="header"><strong>Total Cost</strong></div>
          <div className="header"><strong>Cost Per Item</strong></div>
        </div>
      ];
      if (chosen === "query11") {
        header = [
        <div className="query-header">
          <div className="header"><strong>Events per 100K</strong></div>
          <div className="header"><strong>White%</strong></div>
          <div className="header"><strong>Non-White%</strong></div>
          <div className="header"><strong>Low Poverty%</strong></div>
          <div className="header"><strong>High Poverty%</strong></div>
          <div className="header"><strong>Item Cost per Capita</strong></div>
        </div>
        ];
      }

      // Set the appropriate state variable to the value returned by the HTTP response from the server.
      this.setState({
        query: queryDivs,
        tableATitle: title,
        tableAHeader: header
      });
    }, err => {
      console.log(err);
    });
  }


  showQueryb() {
    console.log("B");
    var chosen = this.state.selectedQuestionB;
    if (!chosen || chosen === "" ) {
      console.log("No state was chosen");
    }
    fetch(`http://localhost:8081/race/${chosen}`,  //change to appropriate URL based on index.js in server folder
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(chartList => {
      if (!chartList) return;
      let labelb;
      let datab;
      if (chosen === 'query12b') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.white
        );
        datab = chartList.map((query_Obj, i) =>
          query_Obj.events_per_capita
        );
      } else if (chosen === 'query13b') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.white_rounded
        );
        datab = chartList.map((query_Obj, i) =>
          query_Obj.events_per_100K
        );
      } else if (chosen === 'query12d') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.white
        );
        datab = chartList.map((query_Obj, i) =>
          query_Obj.cost_per_capita
        );
      } else if (chosen === 'query13d') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.white_rounded
        );
        datab = chartList.map((query_Obj, i) =>
          query_Obj.cost_per_capita
        );
      }
      

      let chart = [<RaceChart chartData={datab} chartLabel={labelb} />];
      
      this.setState({
        chartData: datab,
        // chartLabel: labelb,
        chartFull: chart
      });
    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  showQueryc() {
    console.log("C");
  }

  render() {    
    return (
      <div className="Race">

        <PageNavbar active="race" />
        

        <div className="container query-container">
            <br></br>
          <div class = "text-center">
            <h3 class="display-4 font-weight-bold text-white outline-this">Does Race Affect What Equipment is Requested?</h3>
          </div>
            <div className= "dropdown-container">
              <select value={this.state.selectedQuestion} onChange={this.handleChange} className="dropdown" id="raceQueryDropdown">
                <option select value> -- Ask a Question -- </option>
                <option value="query10a">What are the 10 most requested items in counties where racial minorities are the majority population?</option>
                <option value="query10b">What are the 10 most requested items in counties where the majority of the population is white?</option>
                <option value="query11">In counties where racial minorities are the majority of the population, what is the average value of requested equpiment?</option>
              </select>
              <button className="submit-btn" id="querySubmitBtn" onClick={this.submitQuestion}>Ask</button>
            </div>
            <div class = "text-center">
              <h3 class="display-4 font-weight-bold text-white outline-this"></h3>
            </div>
          <div className="jumbotron">
            {this.state.tableATitle}
            <div className="container query-container">

            {this.state.tableAHeader}
            <div className="results-container" id="results">
                {this.state.query}
              </div>
            </div>
          </div>

          <br></br>
        </div>
        <div className="container query-container">
            <br></br>
          <div class = "text-center">
            <h3 class="display-4 font-weight-bold text-white outline-this">Do Race Demographics Correlate With the Number of Events on average in a Given County?</h3>
          </div>
          <div className= "dropdown-container">
            <select value={this.state.selectedQuery} onChange={this.handleChange2} className="dropdown" id="raceQueryDropdown">
              <option select value> -- Ask a Question -- </option>
              <option value="query12b">1. In counties with a population greater than 100,000, how many events occurred, per capita?</option>
              <option value="query13b">2. Is there a correlation between the percent of a county's population that is white and the number of events that occurred in the same county?</option>
              <option value="query12d">3. How does the percentage of a large county's population that is white affect the value of requested equipment?</option>
              <option value="query13d">4. How does the percentage of any county's population that is white affect the value of requested equipment?</option>
            </select>
            <button className="submit-btn" id="querySubmitBtn" onClick={this.submitQuestionb}>Double Click to Submit</button>
          </div>
            <div class = "text-center">
              <h3 class="display-4 font-weight-bold text-white double-outline">Results</h3>
            </div>
        </div>
        <div className="container query-container">
          <div className="jumbotron">
            {this.state.chartFull}
          </div>
          <br></br>
          <div className="jumbotron invisible">
            {this.state.tableBTitle}
            <div className="query-container">
              {this.state.tableBHeader}
              <div className="results-container" id="results">
                {this.state.queryb}
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}