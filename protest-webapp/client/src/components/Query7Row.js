import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query7Row extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.event_date}</div>
				<div className="title">{this.props.event_type}</div>
				<div className="title">{this.props.sub_event_type}</div>
				<div className="title">{this.props.fatalities}</div>
				<div title={this.props.notes} className="title"><button class="btn-light" title={this.props.notes}> hover here </button></div>
			</div>
		);
	}
}
