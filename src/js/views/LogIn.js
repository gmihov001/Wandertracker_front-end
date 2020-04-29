import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { HomePage } from "./HomePage";
import { withRouter } from "react-router-dom";
import wtLogo from "../../img/wanderTrackerLogo.png";
import { Consumer } from "../store/appContext.js";
import firebase from "../firebase";

export class LogIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			loggedIn: false,
			errorMessage: ""
		};
	}

	handleSubmit = e => {
		let registrationInfo = {
			email: this.state.email,
			password: this.state.password
		};
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(registrationInfo.email, registrationInfo.password)
			.then(FBUser => {
				this.setState({ loggedIn: true });
			})
			.catch(error => {
				if (error.message !== null) {
					this.setState({ errorMessage: error.message });
				} else {
					this.setState({ errorMessage: null });
				}
			});
	};

	handleChange = e => {
		const itemName = e.target.name;
		const itemValue = e.target.value;
		this.setState({ [itemName]: itemValue });
	};

	/*
	handleChange = e => {
		let target = e.target;
		let value = target.type === "checkbox" ? target.checked : target.value;
		let name = target.name;

		this.setState({ [name]: value });
    };
    */

	loginHandle = () => {
		this.setState({ loggedIn: true });
	};

	render() {
		if (this.state.loggedIn === true) {
			return <Redirect to="/HomePage" />;
		}

		return (
			<div>
				<Link to="/">
					<img className="logo-navbar navbar-brand mb-0 h1" src={wtLogo} />
				</Link>
				<div className="container main rounded shadow-lg p-5 my-5">
					<form className="form-fields row mb-5" onSubmit={this.handleSubmit}>
						<div className="col-md-8 col-lg-6 col-md-offset-3 form">
							<h2>Login</h2>
							<input
								required
								className="form-control"
								type="email"
								id="email"
								name="email"
								placeholder="Enter your email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<br />
							<input
								required
								className="form-control"
								id="password"
								type="password"
								name="password"
								placeholder="Enter your password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<button type="submit" className="btn btn-default login">
								Login
							</button>
						</div>
					</form>
					<span className="signup-cont w-100 my-5 text-white text-center">
						<h4 className="signup-text">
							Don&lsquo;t have an account?
							<Link to="/SignUp">
								<button className="btn btn-default signup">Signup</button>
							</Link>
						</h4>
					</span>
				</div>
			</div>
		);
	}
}
