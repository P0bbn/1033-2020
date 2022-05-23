import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js'


var data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'All Event Types',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(175,92,92,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class CountryChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
        this.state = {
            labels: props.chartLabel,
            dataPoints: props.chartData
        }
        data.datasets[0].data = this.state.dataPoints;
        data.labels = this.state.labels;
        this.options = {
            legend: {
                display: false,
            },
        };

        // this.componentDidUpdate = this.componentDidUpdate.bind(this);

    }
    // componentDidUpdate(prevProps, nextProps) {
    //     if(prevProps !== this.props){
    //         console.log(nextProps);
    //         this.setState({
    //             labels: this.props.chartLabel,
    //             dataPoints: this.props.chartData
    //         });
    //         data.datasets[0].data = this.state.dataPoints;
    //         data.labels = this.state.labels
    //         // this.update();
    //     }

    // }


    // componentWillReceiveProps(nextProps, nextContext) {
    //     // update chart according to prop change
    //     this.state.chart.data.datasets.forEach((dataset) => {
    //       dataset.data.push(nextProps.chartData);
    //     });
    //     this.update();
    // }

    // function updateChart(newlabel, newData) {
    //     this.setState({
    //         labels: newlabel,
    //         dataPoints: newData
    //     });
    //     data.datasets[0].data = this.state.dataPoints;
    //     data.labels = this.state.labels;

    // }
    render() {
        console.log(this.props.chartData);
    return (
        <div>
        <h2 class="chart-title ">Number of Protests over the Year</h2>
            <Line ref="chart" data={data} options={this.options}/>
        </div>
    );
    }

    // handleChange = event => {
    //     this.setState({ 
    //       labels: this.props.chartLabel,
    //       dataPoints: this.props.chartData, });
    //     data.datasets[0].data = this.state.dataPoints;
    //     data.labels = this.state.labels;
    // };

    componentDidMount() {
        //let theChart = new Chart();
        data.datasets[0].data = this.props.chartData
        const { datasets } = this.refs.chart.chartInstance.data
        console.log(datasets[0].data);
    }
}
