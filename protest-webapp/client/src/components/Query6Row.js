import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query6Row extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.county}</div>
				<div className="title">{this.props.population}</div>
				<div className="title">{this.props.income_per_cap}</div>
				<div className="title">{this.props.unemployment}</div>
				<div className="title">{this.props.events_per_100K}</div>
				<div className="title">{this.props.item_qty}</div>
				<div className="title">{this.props.item_cost}</div>
				<div className="title">{this.props.cost_per_item}</div>
				<div className="title">{this.props.cost_per_cap}</div>
			</div>
		);
	}
}
