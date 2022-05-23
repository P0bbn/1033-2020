import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query2Row extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.event}</div>
				<div className="title">{this.props.sub_event}</div>
				<div className="title">{this.props.count}</div>
			</div>
		);
	}
}
