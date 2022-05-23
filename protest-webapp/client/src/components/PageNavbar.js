import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['country', 'states', 'counties', 'race', 'income-inequality'];

		let navbarDivs = pageList.map((page, i) => {

			if (this.props.active === page) {

				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page === 'income-inequality' ? 'Income Inequality' : page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page === 'income-inequality' ? 'Income Inequality' : page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top mt-5">
			        <a href="/" class="navbar-brand">1033 & 2020</a>
			        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
			            <span class="navbar-toggler-icon"></span>
			        </button>
			    
			        <div class="collapse navbar-collapse" id="navbarCollapse">
			            <div class="navbar-nav">
			              {this.state.navDivs}
			            </div>
			      </div>
			          <div class = "text-right navbar-nav ml-auto">
			          <a href="/about" class="nav-item nav-link">About</a>
			          <a href="/sources" class="nav-item nav-link">Source</a>
			        </div>
			    </nav>
			</div>
        );
	}
}

/*
	<nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top mt-5">
      <span className="navbar-brand center">1033 & 2020</span>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
        {this.state.navDivs}
        </div>
      </div>
    </nav>
  */