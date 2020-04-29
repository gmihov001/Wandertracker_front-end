import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Navbar2 } from "../component/Navbar2";
import wtLogo from "../../img/wanderTrackerLogo.png";
import firebase from "../firebase";

export class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			displayName: "",
			email: "",
			password: "",
			errorMessage: "",
			user: null,
			userID: ""
		};
	}

	registerUser = userName => {
		firebase.auth().onAuthStateChanged(FBUser => {
			FBUser.updateProfile({ displayName: userName }).then(() => {
				console.log("Updated FBUser is: ");
				console.log(FBUser);
				console.log("Passed User Name");
				console.log(userName);
				this.setState({
					user: FBUser,
					displayName: FBUser.displayName,
					userID: FBUser.uid
				});
			});
		});
	};

	alertSubmit = () => {
		const { errorMessage } = this.state;
		if (errorMessage !== null) rert(errorMessage);
		else return alert("Account Created Log In!");
	};

	handleSubmit = e => {
		let registrationInfo = {
			displayName: this.state.displayName,
			email: this.state.email,
			password: this.state.password
		};
		e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(registrationInfo.email, registrationInfo.password)
			.then(() => {
				this.registerUser(registrationInfo.displayName);
			})
			.catch(error => {
				if (error.message !== null) this.setState({ errorMessage: error.message });
				else this.setState({ errorMessage: null });
				this.alertSubmit();
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

	render() {
		if (this.state.userID.length > 1) {
			return <Redirect to="/HomePage" />;
		}

		return (
			<div className="wrapper">
				<Link to="/">
					<img className="logo-navbar navbar-brand mb-0 h1" src={wtLogo} />
				</Link>
				<form className="container main rounded shadow-lg p-5 my-5" onSubmit={this.handleSubmit}>
					<div className="text-cont row"></div>
					<div className="input-cont row">
						<div className="input-cont2 col-md-8 col-lg-6 col-md-offset-3 form">
							<h2>Sign Up</h2>
							<input
								className="form-control"
								type="text"
								name="displayName"
								id="displayName"
								placeholder="Enter a user name"
								value={this.state.displayName}
								onChange={this.handleChange}
							/>
							<br />
							<input
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
								className="form-control"
								type="password"
								id="password"
								name="password"
								placeholder="Enter your password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<br />
							<button type="submit" className="btn btn-default shadow login">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
