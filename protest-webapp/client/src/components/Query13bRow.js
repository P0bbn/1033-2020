import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Query13bRow extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className="query">
				<div className="title">{this.props.white_rounded}</div>
				<div className="title">{this.props.events_per_100k}</div>
				
			</div>
		);
	}
}
