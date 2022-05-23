import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query10Row extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.item_name}</div>
				<div className="title">{this.props.equip_qty}</div>
				<div className="title">{this.props.equip_cost}</div>
				<div className="title">{this.props.cost_per_item}</div>
			</div>
		);
	}
}
