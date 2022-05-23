import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query2Row extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.state}</div>
				<div className="title">{this.props.population}</div>
				<div className="title">{this.props.peaceful}</div>
				<div className="title">{this.props.non_peaceful}</div>
				<div className="title">{this.props.peaceful_per_100K}</div>
				<div className="title">{this.props.non_peaceful_per_100K}</div>
			</div>
		);
	}
}
