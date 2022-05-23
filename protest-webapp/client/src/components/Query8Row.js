import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query8Row extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.county}</div>
				<div className="title">{this.props.state}</div>
				<div className="title">{this.props.num_events}</div>
				<div className="title">{this.props.events_per_100K}</div>
				<div className="title">{this.props.item_qty}</div>
				<div className="title">{this.props.cost_per_item}</div>
				<div className="title">{this.props.cost_per_cap}</div>
			</div>
		);
	}
}
