import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Home from './Home';
import States from './States';
import Race from './Race';
import II from './Income';
import Counties from './Counties';
import Source from './Source';
import About from './About';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Home />
							)}
						/>
						<Route
							exact
							path="/country"
							render={() => (
								<Home />
							)}
						/>
						<Route
							path="/states"
							render={() => (
								<States />
							)}
						/>
						<Route
							path="/counties"
							render={() => (
								<Counties />
							)}
						/>
						<Route
							path="/race"
							render={() => (
								<Race />
							)}
						/>
						<Route
							path="/income-inequality"
							render={() => (
								<II />
							)}
						/>
						<Route
							path="/about"
							render={() => (
								<About />
							)}
						/>
						<Route
							path="/sources"
							render={() => (
								<Source />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}