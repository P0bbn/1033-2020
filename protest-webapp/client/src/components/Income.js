import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';
import Query10Row from './Query10Row';
import RaceChart from './RaceChart';


export default class II extends React.Component{
    constructor(props){
        super(props);

        this.state={
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
    componentDidMount(){

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
    showQuery(){
        var chosen = this.state.selectedQuestion;
        if (!chosen || chosen ===""){
            console.log("No question asked.")
          }
          fetch(`http://localhost:8081/income/${chosen}`,  //change to appropriate URL based on index.js in server folder
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
            if (chosen !== "query10d"){

            
              queryDivs = queryList.map((query_Obj, i) =>
              <Query10Row item_name={query_Obj.item_name} equip_qty={query_Obj.equip_qty.toLocaleString()} equip_cost={"$" + query_Obj.equip_cost.toLocaleString()} cost_per_item={"$" + query_Obj.cost_per_item.toLocaleString()} />
              );
            } else{
              queryDivs = queryList.map((query_Obj, i) =>
              <Query10Row item_name={query_Obj.item_name} equip_qty={query_Obj.equip_qty.toLocaleString()} equip_cost={"$" + query_Obj.equip_cost.toLocaleString()} cost_per_item={"$" + query_Obj.cost_per_item.toLocaleString()} />
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
            ]
            this.setState({
                query: queryDivs,
                tableATitle: title,
                tableAHeader: header
              });
            }, err => {
              console.log(err);
            });
          }

          showQueryb(){
            console.log("B");
    var chosen = this.state.selectedQuestionB;
    if (!chosen || chosen === "" ) {
      console.log("No question was asked");
    }
    fetch(`http://localhost:8081/income/${chosen}`,  //change to appropriate URL based on index.js in server folder
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
      if (chosen === 'query13a') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.poverty
        );
        datab = chartList.map((query_Obj, i) =>
          query_Obj.events_per_100K
        );
      } else if (chosen === 'query12a') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.poverty
        );
        datab = chartList.map((query_Obj, i) =>
          query_Obj.events_per_capita
        );
      } else if (chosen === 'query12c') {
        labelb = chartList.map((query_Obj, i) =>
          query_Obj.poverty
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
      console.log(err);
    });
  }
          render() {    //this can be changed completely to suit your needs
            return (
              <div className="Race">
        
                <PageNavbar active="income-inequality" />
                
        
                <div className="container query-container">
                    <br></br>
                    <div class = "text-center">
                    <h3 class="display-4 font-weight-bold text-white outline-this">Does Poverty Affect What Equipment is Requested?</h3>
                  </div>
                    <div className= "dropdown-container">
                      <select value={this.state.selectedQuery} onChange={this.handleChange} className="dropdown" id="raceQueryDropdown">
                        <option select value> -- Ask a Question -- </option>
                        <option value="query10d">What are the 10 most requested items in counties with poverty rates in the top 10% nationwide?</option>
                        <option value="query10c">What are the 10 most requested items in counties with poverty rates in the bottom 10% nationwide?</option>
                      </select>
                      <button className="submit-btn" id="querySubmitBtn" onClick={this.submitQuestion}>Ask</button>
                      </div>
                      <div class = "text-center">
                      <h3 class="display-4 font-weight-bold text-white outline-this">Results</h3>
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
                    <br></br>
                    </div>
              <div className="container query-container">
                              
                <div class = "text-center">
                      <h3 class="display-4 font-weight-bold text-white outline-this">Does Poverty Affect the Number of Events or the Equipment Requested in a Given County ?</h3>
                </div>
                <div className= "dropdown-container">
                  <select value={this.state.selectedQuery} onChange={this.handleChange2} className="dropdown" id="raceQueryDropdown">
                    <option select value> -- Ask a Question -- </option>
                    <option value="query13a">How does the poverty rate vary with the number of events that occurred in a given county?</option>
                    <option value="query12a">How does the poverty rate vary with the number of events that occurred in large counties?</option>
                    <option value="query12c">How does the average cost of a requested 1033 item vary with the poverty rate in a large county?</option>

                  </select>
                  <button className="submit-btn" id="querySubmitBtn" onClick={this.submitQuestionb}>Ask</button>
                </div>
                <div class = "text-center">
                  <h3 class="display-4 font-weight-bold text-white outline-this">Results</h3>
                </div>
                </div>
                <div className="container query-container">
                <div className="jumbotron">
                  {this.state.chartFull}
                </div>
                <br></br>
              </div>
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
            )
        
    }
}
