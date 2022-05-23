import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query11Row extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.events_per_100K_national}</div>
				<div className="title">{this.props.white}</div>
				<div className="title">{this.props.non_white}</div>
				<div className="title">{this.props.low_poverty}</div>
				<div className="title">{this.props.high_poverty}</div>
				<div className="title">{this.props.item_cost_per_cap_national}</div>
			</div>
		);
	}
}
